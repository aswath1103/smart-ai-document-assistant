import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  ShieldAlert, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  RotateCcw,
  Mic,
  MicOff
} from 'lucide-react';
import { ChatMessage, DocumentMetadata, DocumentChunk, ViewTab } from '../types/document';
import { retrieveChunks } from '../services/ragEngine';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface GroundedChatProps {
  document: DocumentMetadata;
  messages: ChatMessage[];
  onSendMessage: (query: string) => void;
  isLoading: boolean;
  similarityThreshold: number;
  onSelectCitation: (page: number, section: string, chunkId?: string) => void;
  onNavigateTab: (tab: ViewTab) => void;
  onResetChat: () => void;
}

export const GroundedChat: React.FC<GroundedChatProps> = ({
  document,
  messages,
  onSendMessage,
  isLoading,
  similarityThreshold,
  onSelectCitation,
  onNavigateTab,
  onResetChat,
}) => {
  const [input, setInput] = useState('');
  const [activeCitationPreview, setActiveCitationPreview] = useState<{
    page: number;
    section: string;
    text: string;
  } | null>(null);
  const [inspectingChunksMsgId, setInspectingChunksMsgId] = useState<string | null>(null);

  // Speech Recognition hook updating input in real time
  const { isListening, isSupported, toggleListening } = useSpeechRecognition((transcript) => {
    setInput(transcript);
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  // Helper to render text with clickable citation chips
  const renderMessageContent = (content: string, msg: ChatMessage) => {
    // Look for [Page X, Section Y] or [Page X]
    const citationRegex = /\[Page\s*(\d+)(?:,\s*(?:Section|§)?\s*([^\]]+))?\]/gi;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = citationRegex.exec(content)) !== null) {
      const matchStart = match.index;
      const matchEnd = citationRegex.lastIndex;

      // Text before citation
      if (matchStart > lastIndex) {
        parts.push(content.substring(lastIndex, matchStart));
      }

      const pageNum = parseInt(match[1], 10);
      const sectionName = match[2] ? match[2].trim() : `Section`;

      // Find matching chunk from document
      const matchingChunk = document.chunks.find(
        c => c.page === pageNum && (!sectionName || c.section.toLowerCase().includes(sectionName.toLowerCase()))
      ) || document.chunks.find(c => c.page === pageNum);

      parts.push(
        <button
          key={`cite-${matchStart}`}
          onClick={() => {
            onSelectCitation(pageNum, sectionName, matchingChunk?.id);
            onNavigateTab('viewer');
          }}
          onMouseEnter={() => {
            if (matchingChunk) {
              setActiveCitationPreview({
                page: pageNum,
                section: sectionName,
                text: matchingChunk.text,
              });
            }
          }}
          onMouseLeave={() => setActiveCitationPreview(null)}
          className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 rounded-md bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono transition-colors align-middle shadow-xs"
          title={`Click to inspect source in Document Viewer`}
        >
          <span>[P{pageNum}, {sectionName.replace(/^Section\s*/i, '§')}]</span>
          <ExternalLink className="h-2.5 w-2.5 opacity-70" />
        </button>
      );

      lastIndex = matchEnd;
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return (
      <div className="whitespace-pre-line leading-relaxed text-sm">
        {parts}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col h-[calc(100vh-140px)]">

      {/* Top Protocol Status Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 mb-4 flex items-center justify-between shadow-sm text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="font-semibold text-white">DocuPulse AI Teammate</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">Grounded & Conversational</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <span>Cutoff:</span>
            <span className="text-emerald-400">{(similarityThreshold * 100).toFixed(0)}%</span>
          </div>
          <button
            onClick={onResetChat}
            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Hover Citation Preview Floating Bar */}
      {activeCitationPreview && (
        <div className="bg-slate-800 border border-emerald-500/50 rounded-xl p-3 mb-3 shadow-xl animate-in fade-in slide-in-from-top-1 text-xs text-slate-200">
          <div className="flex items-center justify-between text-emerald-400 font-mono text-[10px] mb-1">
            <span>SOURCE EXCERPT: Page {activeCitationPreview.page} · {activeCitationPreview.section}</span>
            <span>Click badge to view full page</span>
          </div>
          <p className="line-clamp-2 text-slate-300 italic">
            "{activeCitationPreview.text}"
          </p>
        </div>
      )}

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isInspecting = inspectingChunksMsgId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-3xl rounded-2xl p-4 shadow-md ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-br-xs'
                    : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-bl-xs'
                }`}
              >
                {/* Fallback Banner if Hallucination Guardrail Triggered */}
                {!isUser && msg.isGroundedFallback && (
                  <div className="mb-3 p-2.5 rounded-lg bg-amber-950/60 border border-amber-500/50 text-amber-200 text-xs flex items-start gap-2">
                    <ShieldAlert className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-amber-300">
                        Zero-Hallucination Guardrail: Verified Missing Term
                      </div>
                      <div className="text-[11px] text-amber-200/90 mt-0.5">
                        This item isn't in the document. Rather than guessing or fabricating terms, DocuPulse told you straight up.
                      </div>
                    </div>
                  </div>
                )}

                {/* Message text with clickable citations */}
                {isUser ? (
                  <div className="text-sm whitespace-pre-line">{msg.content}</div>
                ) : (
                  renderMessageContent(msg.content, msg)
                )}

                {/* Footer metadata for assistant response */}
                {!isUser && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px]">
                        {msg.processingMs ? `${msg.processingMs}ms` : 'Instant'}
                      </span>
                      <span>·</span>
                      <span className="text-emerald-400">
                        {msg.isGroundedFallback ? 'Zero-Hallucination Verified' : 'Grounded in Excerpts'}
                      </span>
                    </div>

                    {msg.retrievedChunks && msg.retrievedChunks.length > 0 && (
                      <button
                        onClick={() => setInspectingChunksMsgId(isInspecting ? null : msg.id)}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-300 transition-colors"
                      >
                        <Layers className="h-3 w-3" />
                        <span>{isInspecting ? 'Hide Chunks' : `Inspect Chunks (${msg.retrievedChunks.length})`}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Collapsible Retrieved Chunks Inspector Drawer */}
              {!isUser && isInspecting && msg.retrievedChunks && (
                <div className="max-w-3xl w-full mt-2 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono border-b border-slate-800 pb-1">
                    <span>Retrieved Context Excerpts Passed to LLM</span>
                    <span>Cutoff: {(similarityThreshold * 100).toFixed(0)}%</span>
                  </div>
                  {msg.retrievedChunks.map((chunk, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-1">
                        <span>Chunk #{chunk.id} · Page {chunk.page} · {chunk.section}</span>
                        {chunk.score !== undefined && (
                          <span className="text-slate-400">Score: {(chunk.score * 100).toFixed(0)}%</span>
                        )}
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {chunk.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl max-w-md">
            <div className="h-6 w-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-spin">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="text-xs text-slate-300">
              <span className="font-medium text-white">Reviewing clauses & putting together the rundown...</span>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">Grounding in document text</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Queries Bar */}
      <div className="mt-3 pt-3 border-t border-slate-800">
        <div className="text-[11px] text-slate-400 mb-2 flex items-center justify-between">
          <span>Quick Topics:</span>
          <span className="text-slate-500 text-[10px]">Click to ask immediately</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {document.extraction?.suggestedQueries.map((q, idx) => {
            const isFallback = q.category === 'hallucination_test';
            return (
              <button
                key={idx}
                onClick={() => onSendMessage(q.query)}
                disabled={isLoading}
                className={`text-xs px-2.5 py-1 rounded-lg border text-left transition-colors flex items-center gap-1.5 ${
                  isFallback
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-200 hover:bg-amber-900/60'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {isFallback ? (
                  <ShieldAlert className="h-3 w-3 text-amber-400 shrink-0" />
                ) : (
                  <HelpCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                )}
                <span className="truncate max-w-xs">{q.query}</span>
                {isFallback && (
                  <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 px-1 rounded">
                    Check Missing Info
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Speech Recognition Feedback Indicator */}
      {isListening && (
        <div className="mt-2 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center justify-between animate-in fade-in slide-in-from-bottom-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-medium text-red-300">Listening to your voice...</span>
            <span className="text-[11px] text-red-200/80 hidden sm:inline">
              Speak your document query now (e.g., "What is the liability cap?")
            </span>
          </div>
          <button
            type="button"
            onClick={toggleListening}
            className="text-[10px] font-mono text-red-300 hover:text-white underline ml-2"
          >
            Stop
          </button>
        </div>
      )}

      {/* Chat Input Bar */}
      <form onSubmit={handleSubmit} className="mt-3 relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isListening 
              ? "Listening... Speak into your mic" 
              : "Ask a question, say hey, or ask me to explain a tricky clause in plain English..."
          }
          disabled={isLoading}
          className={`w-full pl-4 pr-24 py-3 rounded-xl bg-slate-900 border text-white placeholder-slate-500 text-sm focus:outline-none transition-all shadow-lg ${
            isListening 
              ? 'border-red-500/80 ring-2 ring-red-500/30' 
              : 'border-slate-700 focus:border-emerald-500'
          }`}
        />

        <div className="absolute right-2 top-2 flex items-center gap-1.5">
          {/* Audio-to-Text Microphone Toggle Button */}
          {isSupported && (
            <button
              type="button"
              onClick={toggleListening}
              title={isListening ? "Stop Listening" : "Speak to Type"}
              className={`p-2 rounded-lg transition-all ${
                isListening 
                  ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/50 animate-pulse' 
                  : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white transition-colors"
            title="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

    </div>
  );
};
