import React from 'react';
import { 
  FileText, 
  Sparkles, 
  Search, 
  CheckSquare, 
  Upload, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronDown,
  Layers
} from 'lucide-react';
import { DocumentMetadata, ViewTab } from '../types/document';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';

interface HeaderProps {
  currentDoc: DocumentMetadata;
  activeTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  onSelectDoc: (doc: DocumentMetadata) => void;
  onOpenUpload: () => void;
  similarityThreshold: number;
  onThresholdChange: (val: number) => void;
  isProcessing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentDoc,
  activeTab,
  onTabChange,
  onSelectDoc,
  onOpenUpload,
  similarityThreshold,
  onThresholdChange,
  isProcessing,
}) => {
  const [docDropdownOpen, setDocDropdownOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base tracking-tight text-white">DocuPulse</span>
                <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  RAG Core v2.4
                </span>
              </div>
              <div className="text-xs text-slate-400 hidden sm:block">
                Grounded Document Intelligence & Action Engine
              </div>
            </div>
          </div>

          {/* Document Selector & Switcher */}
          <div className="relative">
            <button
              onClick={() => setDocDropdownOpen(!docDropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-sm text-slate-200 transition-colors max-w-xs md:max-w-sm truncate"
            >
              <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
              <div className="text-left truncate">
                <div className="font-medium truncate text-xs sm:text-sm">{currentDoc.title}</div>
                <div className="text-[11px] text-slate-400 truncate hidden md:block">{currentDoc.totalPages} Pages · {currentDoc.totalChunks} Chunks</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0 ml-1" />
            </button>

            {docDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-20" 
                  onClick={() => setDocDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-30">
                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800 flex justify-between items-center">
                    <span>Select Enterprise Document</span>
                    <span>{SAMPLE_DOCUMENTS.length} Available</span>
                  </div>
                  <div className="py-1 space-y-1 max-h-72 overflow-y-auto">
                    {SAMPLE_DOCUMENTS.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          onSelectDoc(doc);
                          setDocDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-start gap-3 ${
                          currentDoc.id === doc.id
                            ? 'bg-emerald-950/60 border border-emerald-600/40 text-emerald-200'
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <FileText className={`h-4 w-4 mt-0.5 shrink-0 ${currentDoc.id === doc.id ? 'text-emerald-400' : 'text-slate-500'}`} />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-xs sm:text-sm truncate">{doc.title}</div>
                          <div className="text-[11px] text-slate-400 truncate">{doc.subtitle}</div>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                            <span>{doc.category}</span>
                            <span>·</span>
                            <span>{doc.totalPages} Pages</span>
                            <span>·</span>
                            <span>{doc.totalChunks} Chunks</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 mt-1">
                    <button
                      onClick={() => {
                        setDocDropdownOpen(false);
                        onOpenUpload();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      Upload Custom Document (PDF / DOCX / TXT)
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick Upload Button & RAG Threshold Settings */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenUpload}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            >
              <Upload className="h-3.5 w-3.5 text-emerald-400" />
              <span>Upload Doc</span>
            </button>

            {/* Threshold Quick Adjuster */}
            <div className="relative">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                title="RAG Threshold & Cutoff Controls"
                className={`p-2 rounded-lg border text-xs transition-colors flex items-center gap-1.5 ${
                  settingsOpen 
                    ? 'bg-slate-800 border-emerald-500 text-emerald-300' 
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden xl:inline text-[11px] font-mono text-emerald-400">
                  Cutoff: {(similarityThreshold * 100).toFixed(0)}%
                </span>
              </button>

              {settingsOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setSettingsOpen(false)} />
                  <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-4 z-30 text-xs text-slate-300">
                    <div className="font-semibold text-white mb-1 flex items-center justify-between">
                      <span>RAG Fallback Precision Cutoff</span>
                      <span className="font-mono text-emerald-400">{(similarityThreshold * 100).toFixed(0)}%</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-3">
                      Chunks scoring below this semantic similarity threshold are rejected. If no chunks pass, strict fallback refusal triggers (Checklist C7 & I5).
                    </p>
                    <input
                      type="range"
                      min="0.10"
                      max="0.60"
                      step="0.02"
                      value={similarityThreshold}
                      onChange={(e) => onThresholdChange(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800 cursor-pointer mb-2"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>10% (Permissive)</span>
                      <span>22% (Standard)</span>
                      <span>60% (Strict)</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* View Navigation Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-2 border-t border-slate-800/80 py-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Executive Intelligence</span>
          </button>

          <button
            onClick={() => onTabChange('chat')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'chat'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            <span>Grounded Q&A</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Citations
            </span>
          </button>

          <button
            onClick={() => onTabChange('actions')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'actions'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <CheckSquare className="h-3.5 w-3.5" />
            <span>Action Engine</span>
            {currentDoc.extraction?.actionItems && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                {currentDoc.extraction.actionItems.length}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('viewer')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'viewer'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Document Viewer</span>
          </button>

          <button
            onClick={() => onTabChange('rag-inspector')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'rag-inspector'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>RAG Inspector & Vectors</span>
          </button>
        </div>

      </div>
    </header>
  );
};
