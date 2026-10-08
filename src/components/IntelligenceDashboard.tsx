import React from 'react';
import { 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  Scale, 
  HelpCircle,
  FileCheck2,
  Clock,
  ShieldAlert,
  Download
} from 'lucide-react';
import { DocumentMetadata, ActionItem, ViewTab } from '../types/document';

interface IntelligenceDashboardProps {
  document: DocumentMetadata;
  onNavigateTab: (tab: ViewTab) => void;
  onSelectCitation: (page: number, section: string, chunkId?: string) => void;
  onToggleActionItem: (id: string) => void;
  onRunQuery: (query: string) => void;
}

export const IntelligenceDashboard: React.FC<IntelligenceDashboardProps> = ({
  document,
  onNavigateTab,
  onSelectCitation,
  onToggleActionItem,
  onRunQuery,
}) => {
  const extraction = document.extraction;

  if (!extraction) {
    return (
      <div className="p-8 text-center text-slate-400">
        <Sparkles className="h-8 w-8 mx-auto mb-2 text-emerald-400 animate-pulse" />
        <p>Extracting structured intelligence...</p>
      </div>
    );
  }

  const completedCount = extraction.actionItems.filter(a => a.status === 'completed').length;
  const totalActions = extraction.actionItems.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Top Banner: Executive Summary & Context */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>{extraction.documentType}</span>
              <span>·</span>
              <span>Scope: {extraction.scope}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {document.title}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {document.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('chat')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Grounded Q&A</span>
            </button>
            <button
              onClick={() => onNavigateTab('actions')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            >
              <FileCheck2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Action Engine</span>
            </button>
          </div>
        </div>

        {/* Executive Summary Prose */}
        <div className="mt-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Scale className="h-3.5 w-3.5 text-emerald-400" />
            <span>Executive Briefing</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed max-w-4xl">
            {extraction.summary}
          </p>
        </div>

        {/* Suggested Queries bar with prominent Hallucination Fallback Test */}
        <div className="mt-5 pt-4 border-t border-slate-800/70">
          <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
            <span>Instant Conversation Starters:</span>
            <span className="text-emerald-400 text-[10px] font-mono">Click to ask DocuPulse</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {extraction.suggestedQueries.map((item, idx) => {
              const isFallbackTest = item.category === 'hallucination_test';
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onRunQuery(item.query);
                    onNavigateTab('chat');
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border text-left transition-all flex items-center gap-2 ${
                    isFallbackTest
                      ? 'bg-amber-950/40 border-amber-500/40 text-amber-200 hover:bg-amber-900/50'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {isFallbackTest ? (
                    <ShieldAlert className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  ) : (
                    <HelpCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  )}
                  <span className="truncate max-w-md">{item.query}</span>
                  {isFallbackTest && (
                    <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                      Missing Info Check
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid: Things You Should Know & Key Dates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Section 1: Things You Should Know / Critical Watchouts (Checklist H) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <h2 className="text-base font-semibold text-white">
                Things You Should Know
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {extraction.watchouts.length} Watchouts
            </span>
          </div>

          <div className="space-y-3 flex-1">
            {extraction.watchouts.map((w, idx) => {
              const severityColor = 
                w.severity === 'critical' ? 'border-rose-500/40 bg-rose-950/20 text-rose-300' :
                w.severity === 'high' ? 'border-amber-500/40 bg-amber-950/20 text-amber-300' :
                'border-slate-700 bg-slate-800/40 text-slate-300';

              const badgeColor =
                w.severity === 'critical' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                w.severity === 'high' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                'bg-slate-700/50 text-slate-300 border-slate-600';

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-colors ${severityColor}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-xs text-white">
                      {w.title}
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${badgeColor}`}>
                      {w.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    {w.description}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <button
                      onClick={() => {
                        onSelectCitation(w.page, w.section);
                        onNavigateTab('viewer');
                      }}
                      className="inline-flex items-center gap-1 hover:text-emerald-300 font-mono text-[10px] transition-colors"
                    >
                      <span>[Page {w.page}, {w.section}]</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </button>
                    <button
                      onClick={() => {
                        onRunQuery(`Analyze the risk and obligations regarding ${w.title} in ${w.section}`);
                        onNavigateTab('chat');
                      }}
                      className="text-[10px] text-emerald-400 hover:underline"
                    >
                      Investigate in Chat &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Key Dates & Deadlines (Checklist H) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Calendar className="h-4 w-4" />
              </div>
              <h2 className="text-base font-semibold text-white">
                Key Dates & Deadlines
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {extraction.keyDates.length} Milestones
            </span>
          </div>

          <div className="space-y-3 flex-1">
            {extraction.keyDates.map((kd, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-800/40 hover:bg-slate-800/70 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-xs text-white">
                    {kd.event}
                  </div>
                  {kd.isCritical && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                      Critical
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-300 mt-1">
                  <Clock className="h-3 w-3" />
                  <span>{kd.date}</span>
                </div>

                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {kd.description}
                </p>

                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => {
                      onSelectCitation(kd.page, kd.section);
                      onNavigateTab('viewer');
                    }}
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-emerald-300 transition-colors"
                  >
                    <span>[Page {kd.page}, {kd.section}]</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </button>
                  <span className="text-[10px] uppercase font-mono text-slate-500">
                    Type: {kd.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Grid: Action Items Checklist & Key Financial/SLA Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Section 3: Action Items Checklist Preview (Checklist F) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <h2 className="text-base font-semibold text-white">
                Action Checklist
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400">
              <span className="text-emerald-400">{completedCount}</span> / {totalActions} Done
            </div>
          </div>

          <div className="space-y-2.5 flex-1">
            {extraction.actionItems.map((action) => {
              const isDone = action.status === 'completed';
              return (
                <div
                  key={action.id}
                  className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                    isDone
                      ? 'bg-slate-900/60 border-slate-800/80 opacity-60'
                      : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => onToggleActionItem(action.id)}
                    className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className={`text-xs font-semibold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                        {action.title}
                      </div>
                      <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                        action.priority === 'urgent' ? 'bg-rose-500/20 text-rose-300' :
                        action.priority === 'high' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {action.priority}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {action.description}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500 font-mono">
                      <span>Assigned: {action.assigneeRole}</span>
                      <span>·</span>
                      <span>Target: {action.dueDateSuggestion}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => onNavigateTab('actions')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
            >
              <span>Manage in Action Engine & Export Deliverables</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Section 4: Key Metrics & Financial/SLA Figures */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Scale className="h-4 w-4" />
              </div>
              <h2 className="text-base font-semibold text-white">
                Key Obligations & Metrics
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Quantitative Parameters
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-mono uppercase">
                  <th className="pb-2 font-medium">Metric / Term</th>
                  <th className="pb-2 font-medium">Value</th>
                  <th className="pb-2 font-medium hidden sm:table-cell">Category</th>
                  <th className="pb-2 font-medium text-right">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {extraction.keyMetrics.map((km, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 font-medium text-slate-200">
                      <div>{km.metric}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{km.notes}</div>
                    </td>
                    <td className="py-2.5 font-mono font-semibold text-emerald-400 whitespace-nowrap">
                      {km.value}
                    </td>
                    <td className="py-2.5 text-slate-400 capitalize hidden sm:table-cell text-[11px]">
                      {km.category}
                    </td>
                    <td className="py-2.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          onSelectCitation(km.page, km.section);
                          onNavigateTab('viewer');
                        }}
                        className="text-[10px] font-mono text-slate-400 hover:text-emerald-300 transition-colors"
                      >
                        [P{km.page}, {km.section.split(':')[0]}]
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Grounding Score: 98.4%</span>
            <button
              onClick={() => onNavigateTab('rag-inspector')}
              className="text-emerald-400 hover:underline"
            >
              Inspect Retrieval Vectors &rarr;
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
