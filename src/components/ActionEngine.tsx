import React, { useState } from 'react';
import { 
  CheckSquare, 
  Sparkles, 
  Download, 
  FileText, 
  Calendar, 
  Send, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock, 
  User, 
  Tag, 
  Copy,
  Printer,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { DocumentMetadata, ActionItem } from '../types/document';

interface ActionEngineProps {
  document: DocumentMetadata;
  actionItems: ActionItem[];
  onToggleActionItem: (id: string) => void;
  onAddActionItem: (item: Omit<ActionItem, 'id'>) => void;
}

export const ActionEngine: React.FC<ActionEngineProps> = ({
  document,
  actionItems,
  onToggleActionItem,
  onAddActionItem,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDeliverable, setGeneratedDeliverable] = useState<{
    type: string;
    title: string;
    content: string;
  } | null>(null);

  // New action modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newAssignee, setNewAssignee] = useState('Legal & Risk Ops');
  const [newPriority, setNewPriority] = useState<'urgent' | 'high' | 'medium' | 'low'>('high');
  const [newDue, setNewDue] = useState('Within 14 Days');

  const filteredItems = actionItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.status === activeFilter;
  });

  // Generator handler
  const handleGenerateBrief = async (type: 'executive_memo' | 'amendment_letter' | 'compliance_roadmap') => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          documentTitle: document.title,
          summary: document.extraction?.summary,
          keyWatchouts: document.extraction?.watchouts,
          actionItems: actionItems,
        }),
      });
      const data = await res.json();
      setGeneratedDeliverable({
        type,
        title: type === 'executive_memo'
          ? `Executive Briefing: ${document.title}`
          : type === 'amendment_letter'
          ? `Formal Amendment Letter: ${document.title}`
          : `Operational Execution Roadmap`,
        content: data.content,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Real .ics Calendar File Exporter
  const handleExportICS = () => {
    const dates = document.extraction?.keyDates || [];
    if (dates.length === 0) return;

    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//DocuPulse RAG//Action Engine//EN\n";

    dates.forEach((d, idx) => {
      const now = new Date();
      const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const dtstart = new Date(now.getTime() + (idx + 1) * 7 * 86400000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

      icsContent += `BEGIN:VEVENT\nUID:docupulse-${Date.now()}-${idx}@docupulse.ai\nDTSTAMP:${dtstamp}\nDTSTART:${dtstart}\nSUMMARY:${d.event} (${document.title})\nDESCRIPTION:${d.description} - Ref: ${d.section} (Page ${d.page})\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });

    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = window.document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${document.id}-contract-deadlines.ics`);
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  // Export JSON Audit brief
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(document, null, 2));
    const downloadAnchor = window.document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${document.id}-audit-brief.json`);
    window.document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleAddNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddActionItem({
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom operational task identified from contract review.',
      assigneeRole: newAssignee,
      priority: newPriority,
      dueDateSuggestion: newDue,
      section: 'Contract Execution',
      page: 1,
      status: 'pending',
    });
    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Header & Pitch Proposition */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Proactive Execution Engine (Demo Phase: 2:00-3:00)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Action Engine & Workflow Deliverables
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Shifts contract intelligence from passive Q&A to proactive operational execution, stakeholder delegation, and audit readiness.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportICS}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
              title="Download .ics Calendar Reminders"
            >
              <Calendar className="h-3.5 w-3.5 text-emerald-400" />
              <span>Export .ICS Calendar</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
              title="Export structured JSON Audit Package"
            >
              <Download className="h-3.5 w-3.5 text-purple-400" />
              <span>Export JSON Brief</span>
            </button>
          </div>
        </div>

        {/* Workflow Quick-Trigger Generators */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleGenerateBrief('executive_memo')}
            disabled={isGenerating}
            className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all hover:border-emerald-500/50 group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs text-white group-hover:text-emerald-300">
                Generate C-Suite Memo
              </span>
              <FileText className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Synthesize business exposure, liabilities, and executive sign-off checklist.
            </p>
          </button>

          <button
            onClick={() => handleGenerateBrief('amendment_letter')}
            disabled={isGenerating}
            className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all hover:border-emerald-500/50 group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs text-white group-hover:text-emerald-300">
                Draft Amendment Letter
              </span>
              <Sparkles className="h-4 w-4 text-amber-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Draft formal counterparty revisions to mitigate identified critical watchouts.
            </p>
          </button>

          <button
            onClick={() => handleGenerateBrief('compliance_roadmap')}
            disabled={isGenerating}
            className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all hover:border-emerald-500/50 group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs text-white group-hover:text-emerald-300">
                Operational Roadmap
              </span>
              <CheckSquare className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Step-by-step verification milestones for engineering, legal, and finance leads.
            </p>
          </button>
        </div>

        {isGenerating && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
            <Sparkles className="h-4 w-4 animate-spin text-emerald-400" />
            <span>AI Action Engine is generating high-fidelity document deliverable...</span>
          </div>
        )}
      </div>

      {/* Generated Deliverable Display Box (if generated) */}
      {generatedDeliverable && (
        <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl p-6 shadow-2xl relative">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                AI Generated Contract Deliverable
              </span>
              <h2 className="text-base font-bold text-white">
                {generatedDeliverable.title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedDeliverable.content);
                  alert('Copied deliverable to clipboard!');
                }}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
                title="Copy to Clipboard"
              >
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </button>
              <button
                onClick={() => window.print()}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
                title="Print Memo"
              >
                <Printer className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans bg-slate-950/60 p-5 rounded-xl border border-slate-800 max-h-96 overflow-y-auto">
            {generatedDeliverable.content}
          </div>
        </div>
      )}

      {/* Action Items Task Board */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              Interactive Execution Board
            </h2>
            <span className="text-xs font-mono text-slate-400">
              ({actionItems.length} Total)
            </span>
          </div>

          {/* Segmented Filter Controls */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
            {(['all', 'pending', 'in_progress', 'completed'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors capitalize ${
                  activeFilter === filter
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter.replace('_', ' ')}
              </button>
            ))}
            <button
              onClick={() => setShowAddModal(true)}
              className="ml-2 px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-emerald-300 text-xs font-medium flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Task Cards List */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isCompleted = item.status === 'completed';
            const isInProgress = item.status === 'in_progress';

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                  isCompleted
                    ? 'bg-slate-950/60 border-slate-800/80 opacity-60'
                    : isInProgress
                    ? 'bg-slate-800/80 border-blue-500/40 shadow-sm'
                    : 'bg-slate-800/40 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <button
                  onClick={() => onToggleActionItem(item.id)}
                  className="mt-1 text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className={`text-sm font-semibold ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        item.priority === 'urgent' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        item.priority === 'high' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-slate-700 text-slate-300'
                      }`}>
                        {item.priority}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-slate-500" />
                      <span>{item.assigneeRole}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      <span>{item.dueDateSuggestion}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5 text-slate-500" />
                      <span>Page {item.page} · {item.section}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-3">Add Custom Action Task</h3>
            <form onSubmit={handleAddNewSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400">Task Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Schedule SOC2 Type II Audit Review"
                  required
                  className="w-full mt-1 p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  placeholder="Task context, instructions, or dependencies..."
                  className="w-full mt-1 p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Assignee Role</label>
                  <input
                    type="text"
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e: any) => setNewPriority(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
