import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  FileCode, 
  Sparkles, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { DocumentMetadata } from '../types/document';
import { chunkRawDocument } from '../services/ragEngine';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentUploaded: (newDoc: DocumentMetadata) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onDocumentUploaded,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('paste');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Legal' | 'Real Estate' | 'Clinical & Healthcare' | 'Custom'>('Legal');
  const [rawText, setRawText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTitle(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setRawText(content);
      setActiveTab('paste');
    };
    reader.readAsText(file);
  };

  const handleProcessDocument = async () => {
    if (!title.trim() || !rawText.trim()) {
      setError('Document title and text are required.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Chunk document
      const { chunks, totalWords, estimatedPages } = chunkRawDocument(rawText);

      // Call extraction endpoint
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          text: rawText,
          chunks,
        }),
      });

      const data = await response.json();
      const extraction = data.extracted;

      const newDoc: DocumentMetadata = {
        id: `custom-${Date.now()}`,
        title,
        subtitle: `User Upload · ${chunks.length} Chunks · ${estimatedPages} Pages`,
        fileType: 'pdf',
        category,
        totalPages: estimatedPages,
        totalChunks: chunks.length,
        totalWords,
        uploadedAt: new Date().toISOString().split('T')[0],
        isSample: false,
        rawText,
        chunks,
        extraction,
      };

      onDocumentUploaded(newDoc);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to process document');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
            Document Intelligence Ingestion
          </span>
          <h2 className="text-lg font-bold text-white">
            Upload & Index Document
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ingests text, constructs chunk metadata, and extracts structured intelligence.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex gap-2 p-1 bg-slate-800 rounded-xl mb-4">
          <button
            onClick={() => setActiveTab('paste')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'paste'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="h-3.5 w-3.5" />
            <span>Paste Contract Text</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'upload'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload File (PDF/TXT/MD)</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {activeTab === 'upload' ? (
          <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-8 text-center transition-colors">
            <Upload className="h-10 w-10 mx-auto text-emerald-400 mb-2 opacity-80" />
            <div className="text-sm font-semibold text-white mb-1">
              Select contract or compliance file
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Supports .txt, .md, .json, or plain text export of PDFs
            </p>
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer border border-slate-600">
              <span>Choose File</span>
              <input
                type="file"
                accept=".txt,.md,.json,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium">Document Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Master Services Agreement 2026"
                  className="w-full mt-1 p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="Legal">Legal & Contracts</option>
                  <option value="Real Estate">Real Estate & Leases</option>
                  <option value="Clinical & Healthcare">Clinical & Regulatory</option>
                  <option value="Custom">General Enterprise</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-slate-300 font-medium">Document Full Text</label>
                <span className="text-[10px] text-slate-500 font-mono">
                  {rawText.length > 0 ? `${rawText.split(/\s+/).length} Words` : 'Supports [Page X, Section Y] tags'}
                </span>
              </div>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={8}
                placeholder="Paste the document text here. Sections tagged with [Page 1, Section 1] will automatically preserve page citations..."
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 rounded-lg text-slate-400 hover:text-white text-xs transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleProcessDocument}
            disabled={isProcessing || !rawText.trim() || !title.trim()}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-semibold shadow-md transition-all"
          >
            {isProcessing ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>Extracting Intelligence...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Ingest & Process Document</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
