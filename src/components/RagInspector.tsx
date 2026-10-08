import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  SlidersHorizontal, 
  ShieldCheck, 
  ShieldAlert, 
  Info, 
  CheckCircle2, 
  XCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DocumentMetadata, ViewTab } from '../types/document';
import { retrieveChunks } from '../services/ragEngine';

interface RagInspectorProps {
  document: DocumentMetadata;
  similarityThreshold: number;
  onThresholdChange: (threshold: number) => void;
  onNavigateTab: (tab: ViewTab) => void;
  onRunQuery: (query: string) => void;
}

export const RagInspector: React.FC<RagInspectorProps> = ({
  document,
  similarityThreshold,
  onThresholdChange,
  onNavigateTab,
  onRunQuery,
}) => {
  const [testQuery, setTestQuery] = useState('What are the liability caps and exclusions?');

  // Compute retrieval breakdown
  const { retrieved, allScored, maxScore } = retrieveChunks(testQuery, document.chunks, {
    topK: 6,
    threshold: similarityThreshold,
  });

  const willTriggerFallback = retrieved.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

      {/* Top Banner: Diagnostics & Principles */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>RAG Fallback Precision Architecture (Checklist C7 & I5)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Vector Retrieval & Grounding Inspector
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Analyze how text chunks are tokenized, scored, and gated by the similarity cutoff threshold before being passed to Gemini.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onRunQuery(testQuery);
                onNavigateTab('chat');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
            >
              <span>Test Query in Chat</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Live Query Sandbox & Cutoff Slider */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
          
          {/* Query input */}
          <div className="lg:col-span-2 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Interactive Test Query</span>
              <span className="text-[11px] font-mono text-emerald-400">Live Scored</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
                placeholder="Type query to simulate retrieval score..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
              <button
                onClick={() => setTestQuery('What is the liability cap under Section 8?')}
                className="text-slate-400 hover:text-emerald-300 underline"
              >
                Liability Cap Query
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => setTestQuery('What is the refund policy for unused fees?')}
                className="text-amber-400 hover:text-amber-300 underline font-mono"
              >
                [Fallback Test] Refund Policy
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => setTestQuery('What are the 24-hour incident notification rules?')}
                className="text-slate-400 hover:text-emerald-300 underline"
              >
                Incident Notice Query
              </button>
            </div>
          </div>

          {/* Similarity Slider */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-white">
              <span>Similarity Cutoff Threshold</span>
              <span className="font-mono text-emerald-400">{(similarityThreshold * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.10"
              max="0.60"
              step="0.02"
              value={similarityThreshold}
              onChange={(e) => onThresholdChange(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>10% Permissive</span>
              <span>22% Balanced</span>
              <span>60% Strict</span>
            </div>
          </div>

        </div>

        {/* Fallback Status Callout */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          {willTriggerFallback ? (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/50 flex items-start gap-3 text-xs text-amber-200">
              <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-amber-300">
                  Strict Zero-Hallucination Fallback Triggered (Checklist C7 & I5)
                </div>
                <div className="text-[11px] text-amber-200/90 mt-0.5">
                  Top chunk score was {(maxScore * 100).toFixed(0)}%, which is below the {(similarityThreshold * 100).toFixed(0)}% cutoff threshold. The engine will explicitly reply:
                  <span className="font-mono block mt-1 font-bold text-amber-300">
                    "I cannot find that information in the document."
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex items-start gap-3 text-xs text-emerald-200">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-emerald-300">
                  {retrieved.length} Chunks Pass Threshold Cutoff (Top Score: {(maxScore * 100).toFixed(0)}%)
                </div>
                <div className="text-[11px] text-emerald-200/90 mt-0.5">
                  Chunks meet the strict semantic relevance threshold. Context will be injected into Gemini prompt with explicit citation metadata [Page X, Section Y].
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scored Chunks Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-emerald-400" />
            <span>Chunk Rank & Retrieval Gating ({allScored.length} Total Chunks)</span>
          </div>
          <div className="font-mono text-slate-500 text-[11px]">
            Green: Passed Cutoff · Red: Rejected
          </div>
        </div>

        <div className="space-y-3">
          {allScored.map((chunk, idx) => {
            const isPassed = (chunk.score || 0) >= similarityThreshold;
            const scorePct = Math.round((chunk.score || 0) * 100);

            return (
              <div
                key={chunk.id}
                className={`p-4 rounded-xl border transition-all ${
                  isPassed
                    ? 'bg-slate-900 border-emerald-500/60 ring-1 ring-emerald-500/20'
                    : 'bg-slate-900/60 border-slate-800/80 opacity-70'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {chunk.section}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Page {chunk.page} · {chunk.tokenCount} Tokens
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-xs font-mono font-bold">
                      Score: <span className={isPassed ? 'text-emerald-400' : 'text-slate-500'}>{scorePct}%</span>
                    </div>
                    {isPassed ? (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Retrieved (Pass)
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-500 border border-slate-700">
                        Rejected (Below Cutoff)
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {chunk.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
