export interface DocumentChunk {
  id: string;
  page: number;
  section: string;
  text: string;
  tokenCount: number;
  charCount: number;
  score?: number;
}

export interface DocumentMetadata {
  id: string;
  title: string;
  subtitle: string;
  fileType: 'pdf' | 'docx' | 'txt' | 'contract';
  totalPages: number;
  totalChunks: number;
  totalWords: number;
  uploadedAt: string;
  isSample?: boolean;
  category: 'Legal' | 'Real Estate' | 'Clinical & Healthcare' | 'Custom';
  rawText: string;
  chunks: DocumentChunk[];
  extraction?: ExtractedIntelligence;
}

export interface Watchout {
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  section: string;
  page: number;
}

export interface KeyDate {
  event: string;
  date: string;
  type: 'deadline' | 'renewal' | 'effective' | 'audit';
  description: string;
  section: string;
  page: number;
  isCritical: boolean;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  assigneeRole: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  dueDateSuggestion: string;
  section: string;
  page: number;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface KeyMetric {
  metric: string;
  value: string;
  category: 'financial' | 'sla' | 'compliance' | 'liability';
  notes: string;
  section: string;
  page: number;
}

export interface SuggestedQuery {
  query: string;
  category: 'grounded' | 'hallucination_test' | 'risk' | 'commercial';
  rationale: string;
}

export interface ExtractedIntelligence {
  summary: string;
  documentType: string;
  scope: string;
  watchouts: Watchout[];
  keyDates: KeyDate[];
  actionItems: ActionItem[];
  keyMetrics: KeyMetric[];
  suggestedQueries: SuggestedQuery[];
}

export interface Citation {
  page: number;
  section: string;
  chunkId: string;
  snippet?: string;
  score?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: Citation[];
  retrievedChunks?: DocumentChunk[];
  isGroundedFallback?: boolean;
  groundingScore?: number;
  similarityCutoffUsed?: number;
  processingMs?: number;
}

export type ViewTab = 'dashboard' | 'chat' | 'viewer' | 'rag-inspector' | 'actions';
