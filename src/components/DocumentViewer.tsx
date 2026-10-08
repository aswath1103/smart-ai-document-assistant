import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  ExternalLink,
  Sparkles,
  FileText
} from 'lucide-react';
import { DocumentMetadata, ViewTab } from '../types/document';

interface DocumentViewerProps {
  document: DocumentMetadata;
  selectedPage: number;
  onPageChange: (page: number) => void;
  selectedChunkId?: string;
  onNavigateTab: (tab: ViewTab) => void;
  onRunQuery: (query: string) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  selectedPage,
  onPageChange,
  selectedChunkId,
  onNavigateTab,
  onRunQuery,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Chunks on current page
  const pageChunks = document.chunks.filter(c => c.page === selectedPage);

  // Filtered chunks if search term exists
  const matchingChunks = searchTerm.trim()
    ? document.chunks.filter(c => c.text.toLowerCase().includes(searchTerm.toLowerCase()) || c.section.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-140px)] flex flex-col">

      {/* Top Controls Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        
        {/* Page Nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, selectedPage - 1))}
            disabled={selectedPage <= 1}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <div className="text-xs font-mono text-slate-300 px-2 py-1 bg-slate-800 rounded-lg">
            Page <span className="font-bold text-emerald-400">{selectedPage}</span> of {document.totalPages}
          </div>

          <button
            onClick={() => onPageChange(Math.min(document.totalPages, selectedPage + 1))}
            disabled={selectedPage >= document.totalPages}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <span className="text-slate-500 text-xs hidden sm:inline">|</span>

          {/* Quick page jump chips */}
          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: document.totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`w-6 h-6 rounded text-xs font-mono transition-colors ${
                    selectedPage === p
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* In-Document Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clauses or phrases..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

      </div>

      {/* Main Dual-Pane: Outline + Page Document Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 overflow-hidden">
        
        {/* Left: Section Outline & Search Results */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 overflow-y-auto hidden lg:flex flex-col">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Bookmark className="h-3.5 w-3.5 text-emerald-400" />
            <span>Document Outline</span>
          </div>

          {searchTerm.trim() ? (
            <div className="space-y-2">
              <div className="text-[11px] text-emerald-400 font-mono mb-1">
                {matchingChunks.length} Search Matches:
              </div>
              {matchingChunks.map((chunk) => (
                <button
                  key={chunk.id}
                  onClick={() => onPageChange(chunk.page)}
                  className="w-full text-left p-2 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-xs transition-colors"
                >
                  <div className="text-emerald-300 font-mono text-[10px]">Page {chunk.page} · {chunk.section}</div>
                  <p className="line-clamp-2 text-slate-400 text-[11px] mt-0.5">{chunk.text}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {document.chunks.map((chunk) => {
                const isActive = chunk.page === selectedPage;
                const isTarget = chunk.id === selectedChunkId;
                return (
                  <button
                    key={chunk.id}
                    onClick={() => onPageChange(chunk.page)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-start gap-2 ${
                      isTarget
                        ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-200'
                        : isActive
                        ? 'bg-slate-800 text-slate-200'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-slate-500 shrink-0 mt-0.5">P{chunk.page}</span>
                    <span className="truncate">{chunk.section}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Full Document Content Canvas (Styled as an authentic printed contract page) */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-y-auto flex flex-col shadow-inner">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-400" />
              <span className="font-medium text-white">{document.title}</span>
              <span>— Page {selectedPage}</span>
            </div>
            <div className="font-mono text-[11px] text-slate-500">
              {pageChunks.length} Indexed Passages
            </div>
          </div>

          {/* Page Chunks */}
          <div className="space-y-5">
            {pageChunks.map((chunk) => {
              const isTargetChunk = chunk.id === selectedChunkId;

              return (
                <div
                  key={chunk.id}
                  id={chunk.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isTargetChunk
                      ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/40 shadow-xl'
                      : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-semibold text-emerald-400">
                      {chunk.section}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500">
                        {chunk.tokenCount} Tokens
                      </span>
                      <button
                        onClick={() => {
                          onRunQuery(`Explain the key requirements and liability exposure in ${chunk.section}`);
                          onNavigateTab('chat');
                        }}
                        className="text-[10px] text-slate-400 hover:text-emerald-300 font-mono flex items-center gap-1 transition-colors"
                        title="Query this clause in Grounded Chat"
                      >
                        <Sparkles className="h-2.5 w-2.5 text-emerald-400" />
                        <span>Query Clause</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans select-text">
                    {chunk.text}
                  </p>

                  {isTargetChunk && (
                    <div className="mt-3 pt-2 border-t border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300 font-mono">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Cited Source Passage Active</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
