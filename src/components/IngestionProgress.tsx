import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, Database, FileSearch, ShieldCheck } from 'lucide-react';

interface IngestionProgressProps {
  documentTitle: string;
  totalChunks: number;
  totalPages: number;
  onComplete: () => void;
}

export const IngestionProgress: React.FC<IngestionProgressProps> = ({
  documentTitle,
  totalChunks,
  totalPages,
  onComplete,
}) => {
  const [step, setStep] = useState<number>(1);
  const [percent, setPercent] = useState<number>(15);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep(2);
      setPercent(45);
    }, 400);

    const t2 = setTimeout(() => {
      setStep(3);
      setPercent(75);
    }, 850);

    const t3 = setTimeout(() => {
      setStep(4);
      setPercent(100);
    }, 1300);

    const t4 = setTimeout(() => {
      onComplete();
    }, 1750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const steps = [
    {
      id: 1,
      title: 'Ingestion & Normalization',
      desc: `Parsed ${totalPages} pages · OCR & text tokenization`,
      icon: FileSearch,
    },
    {
      id: 2,
      title: 'Contextual Chunking & Metadata',
      desc: `Generated ${totalChunks} passage chunks with page/section tagging`,
      icon: Database,
    },
    {
      id: 3,
      title: 'Vector Embedding & Fallback Index',
      desc: 'Normalized semantic embeddings & BM25 inverted index',
      icon: ShieldCheck,
    },
    {
      id: 4,
      title: 'Actionable Intelligence Extraction',
      desc: 'Extracted Executive Summary, Watchouts, Key Dates & Action items',
      icon: Sparkles,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/95 p-6 shadow-2xl backdrop-blur max-w-2xl mx-auto my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
            Real-Time Document Ingestion Pipeline
          </span>
          <h3 className="text-lg font-semibold text-white truncate max-w-md">
            Processing: {documentTitle}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-2xl font-mono font-bold text-emerald-400">
            {percent}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="bg-emerald-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Stepper items */}
      <div className="space-y-3">
        {steps.map((s) => {
          const isDone = step > s.id;
          const isCurrent = step === s.id;
          const Icon = s.icon;

          return (
            <div
              key={s.id}
              className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                isCurrent
                  ? 'bg-emerald-950/40 border border-emerald-500/30 text-white'
                  : isDone
                  ? 'bg-slate-800/40 text-slate-300'
                  : 'opacity-40 text-slate-500'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-emerald-400 animate-spin" />
                ) : (
                  <Icon className="h-4 w-4 text-slate-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold flex items-center justify-between">
                  <span>{s.title}</span>
                  {isDone && <span className="text-[10px] text-emerald-400 font-mono">Completed</span>}
                  {isCurrent && <span className="text-[10px] text-emerald-300 font-mono">Running...</span>}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{s.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
