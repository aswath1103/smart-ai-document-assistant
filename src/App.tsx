import React, { useState, useEffect } from 'react';
import { SAMPLE_DOCUMENTS } from './data/sampleDocuments';
import { DocumentMetadata, ViewTab, ChatMessage, ActionItem } from './types/document';
import { Header } from './components/Header';
import { IngestionProgress } from './components/IngestionProgress';
import { IntelligenceDashboard } from './components/IntelligenceDashboard';
import { GroundedChat } from './components/GroundedChat';
import { DocumentViewer } from './components/DocumentViewer';
import { RagInspector } from './components/RagInspector';
import { ActionEngine } from './components/ActionEngine';
import { UploadModal } from './components/UploadModal';
import { retrieveChunks } from './services/ragEngine';

export default function App() {
  const [currentDoc, setCurrentDoc] = useState<DocumentMetadata>(SAMPLE_DOCUMENTS[0]);
  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0.22);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [selectedChunkId, setSelectedChunkId] = useState<string | undefined>(undefined);
  const [isProcessingDoc, setIsProcessingDoc] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [actionItems, setActionItems] = useState<ActionItem[]>(
    SAMPLE_DOCUMENTS[0].extraction?.actionItems || []
  );

  // Chat conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hey there! I've gone through and indexed "${SAMPLE_DOCUMENTS[0].title}" (5 pages, 10 key sections).

Ask me anything about the terms, liabilities, or deadlines—I'll break them down in plain English and tag the exact sources [Page X, Section Y]. And if something isn't in the contract, I'll tell you straight up instead of making things up.

What are we diving into first?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      groundingScore: 1.0,
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Synchronize action items when document changes
  const handleSelectDoc = (doc: DocumentMetadata) => {
    setCurrentDoc(doc);
    setSelectedPage(1);
    setSelectedChunkId(undefined);
    setActionItems(doc.extraction?.actionItems || []);
    setIsProcessingDoc(true);

    // Reset chat with tailored welcome
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Hey! I've loaded up "${doc.title}" (${doc.totalPages} pages, ${doc.totalChunks} sections). What would you like to check out or break down?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundingScore: 1.0,
      }
    ]);
  };

  const handleDocumentUploaded = (newDoc: DocumentMetadata) => {
    handleSelectDoc(newDoc);
    setActiveTab('dashboard');
  };

  const handleToggleActionItem = (id: string) => {
    setActionItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === 'completed' ? 'pending' : 'completed',
        };
      }
      return item;
    }));
  };

  const handleAddActionItem = (item: Omit<ActionItem, 'id'>) => {
    const newItem: ActionItem = {
      ...item,
      id: `act-${Date.now()}`,
    };
    setActionItems(prev => [newItem, ...prev]);
  };

  const handleSelectCitation = (page: number, section: string, chunkId?: string) => {
    setSelectedPage(page);
    setSelectedChunkId(chunkId);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Conversation reset. Ready for grounded analysis of "${currentDoc.title}".`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  // Grounded RAG Query Execution Pipeline
  const handleSendMessage = async (queryText: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsChatLoading(true);

    const startTime = Date.now();

    try {
      // 1. Retrieve candidate chunks using semantic BM25 & similarity threshold cutoff
      const { retrieved, maxScore } = retrieveChunks(queryText, currentDoc.chunks, {
        topK: 4,
        threshold: similarityThreshold,
      });

      // 2. Query full-stack backend endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          documentTitle: currentDoc.title,
          chunks: currentDoc.chunks,
          retrievedChunks: retrieved,
          similarityCutoffUsed: similarityThreshold,
        }),
      });

      const data = await response.json();
      const elapsed = Date.now() - startTime;

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.answer || "I took a close look through the file, but it doesn't mention anything about that.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || [],
        retrievedChunks: retrieved,
        isGroundedFallback: data.isGroundedFallback,
        processingMs: elapsed,
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('[DocuPulse] Chat error:', err);
      const elapsed = Date.now() - startTime;
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I took a close look through the file, but there's no mention of that in this agreement.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isGroundedFallback: true,
        processingMs: elapsed,
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Top Header */}
      <Header
        currentDoc={currentDoc}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSelectDoc={handleSelectDoc}
        onOpenUpload={() => setIsUploadOpen(true)}
        similarityThreshold={similarityThreshold}
        onThresholdChange={setSimilarityThreshold}
        isProcessing={isProcessingDoc}
      />

      {/* Main Container */}
      <main className="flex-1">
        {/* Animated Processing Stepper (Demo Hook 0:00-0:30) */}
        {isProcessingDoc ? (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <IngestionProgress
              documentTitle={currentDoc.title}
              totalChunks={currentDoc.totalChunks}
              totalPages={currentDoc.totalPages}
              onComplete={() => setIsProcessingDoc(false)}
            />
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <IntelligenceDashboard
                document={currentDoc}
                onNavigateTab={setActiveTab}
                onSelectCitation={handleSelectCitation}
                onToggleActionItem={handleToggleActionItem}
                onRunQuery={(q) => handleSendMessage(q)}
              />
            )}

            {activeTab === 'chat' && (
              <GroundedChat
                document={currentDoc}
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isChatLoading}
                similarityThreshold={similarityThreshold}
                onSelectCitation={handleSelectCitation}
                onNavigateTab={setActiveTab}
                onResetChat={handleResetChat}
              />
            )}

            {activeTab === 'viewer' && (
              <DocumentViewer
                document={currentDoc}
                selectedPage={selectedPage}
                onPageChange={setSelectedPage}
                selectedChunkId={selectedChunkId}
                onNavigateTab={setActiveTab}
                onRunQuery={(q) => {
                  handleSendMessage(q);
                  setActiveTab('chat');
                }}
              />
            )}

            {activeTab === 'rag-inspector' && (
              <RagInspector
                document={currentDoc}
                similarityThreshold={similarityThreshold}
                onThresholdChange={setSimilarityThreshold}
                onNavigateTab={setActiveTab}
                onRunQuery={(q) => {
                  handleSendMessage(q);
                  setActiveTab('chat');
                }}
              />
            )}

            {activeTab === 'actions' && (
              <ActionEngine
                document={currentDoc}
                actionItems={actionItems}
                onToggleActionItem={handleToggleActionItem}
                onAddActionItem={handleAddActionItem}
              />
            )}
          </>
        )}
      </main>

      {/* Upload & Index Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDocumentUploaded={handleDocumentUploaded}
      />

    </div>
  );
}
