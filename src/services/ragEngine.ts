import { DocumentChunk } from '../types/document';

// Stopwords for clean tokenization
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will',
  'with', 'this', 'these', 'those', 'such', 'shall', 'may', 'or', 'if', 'any'
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s§.-]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2 && !STOPWORDS.has(token));
}

/**
 * BM25 / Cosine similarity hybrid scoring for grounded RAG chunk retrieval
 */
export function retrieveChunks(
  query: string,
  chunks: DocumentChunk[],
  options: {
    topK?: number;
    threshold?: number;
  } = {}
): { retrieved: DocumentChunk[]; allScored: DocumentChunk[]; maxScore: number } {
  const topK = options.topK ?? 4;
  const threshold = options.threshold ?? 0.22;

  const queryTokens = tokenize(query);
  if (queryTokens.length === 0 || chunks.length === 0) {
    return { retrieved: [], allScored: chunks.map(c => ({ ...c, score: 0 })), maxScore: 0 };
  }

  // Document frequencies for IDF calculation
  const df: Record<string, number> = {};
  chunks.forEach(chunk => {
    const chunkTokens = new Set(tokenize(chunk.text + ' ' + chunk.section));
    queryTokens.forEach(term => {
      if (chunkTokens.has(term)) {
        df[term] = (df[term] || 0) + 1;
      }
    });
  });

  const N = chunks.length;
  const avgDocLength = chunks.reduce((acc, c) => acc + c.tokenCount, 0) / (N || 1);
  const k1 = 1.5;
  const b = 0.75;

  const scoredChunks: DocumentChunk[] = chunks.map(chunk => {
    const fullText = (chunk.section + ' ' + chunk.section + ' ' + chunk.text).toLowerCase();
    const chunkTokens = tokenize(fullText);
    const tokenCounts: Record<string, number> = {};
    chunkTokens.forEach(t => {
      tokenCounts[t] = (tokenCounts[t] || 0) + 1;
    });

    let score = 0;
    queryTokens.forEach(term => {
      const tf = tokenCounts[term] || 0;
      if (tf > 0) {
        const docFreq = df[term] || 1;
        const idf = Math.log(1 + (N - docFreq + 0.5) / (docFreq + 0.5));
        const docLen = chunkTokens.length;
        const bm25Term = (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (docLen / avgDocLength)));
        score += idf * bm25Term;
      }
    });

    // Exact phrase booster (e.g. "liability cap", "service credits", "refund")
    const cleanQuery = query.toLowerCase().trim();
    if (cleanQuery.length > 5 && fullText.includes(cleanQuery)) {
      score += 2.5;
    }

    // Normalized score roughly 0.0 - 1.0 scale
    const normalizedScore = Math.min(1.0, score / (queryTokens.length * 3.5 || 1));

    return {
      ...chunk,
      score: Math.round(normalizedScore * 100) / 100,
    };
  });

  // Sort descending by score
  scoredChunks.sort((a, b) => (b.score || 0) - (a.score || 0));

  const maxScore = scoredChunks[0]?.score || 0;
  // Apply similarity threshold cutoff (Checklist C7 & I5)
  const filtered = scoredChunks.filter(c => (c.score || 0) >= threshold);
  const retrieved = filtered.slice(0, topK);

  return {
    retrieved,
    allScored: scoredChunks,
    maxScore,
  };
}

/**
 * Intelligent Document Chunker with Page and Section recognition
 */
export function chunkRawDocument(
  rawText: string,
  targetChunkWords: number = 220
): { chunks: DocumentChunk[]; totalWords: number; estimatedPages: number } {
  const lines = rawText.split(/\r?\n/);
  const totalWords = rawText.trim().split(/\s+/).length;

  let currentPage = 1;
  let currentSection = 'General Terms';
  const chunks: DocumentChunk[] = [];

  let currentChunkLines: string[] = [];
  let currentChunkWords = 0;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Detect Page notation e.g. [Page 2, ...] or Page 2
    const pageMatch = trimmed.match(/\[?Page\s*(\d+)/i);
    if (pageMatch) {
      const detectedPage = parseInt(pageMatch[1], 10);
      if (!isNaN(detectedPage) && detectedPage > 0) {
        currentPage = detectedPage;
      }
    }

    // Detect Section header e.g. Section 3: ... or §3 ...
    const sectionMatch = trimmed.match(/\[?Page\s*\d+,?\s*(Section\s*[^\]:]+|§[^\]:]+)/i) ||
                         trimmed.match(/^(Section\s*\d+[^:.]*|§\s*\d+[^:.]*)/i);
    if (sectionMatch) {
      currentSection = sectionMatch[1].replace(/[\[\]]/g, '').trim();
    }

    const lineWords = trimmed.split(/\s+/).length;
    currentChunkLines.push(trimmed);
    currentChunkWords += lineWords;

    if (currentChunkWords >= targetChunkWords) {
      const text = currentChunkLines.join(' ');
      chunks.push({
        id: `chunk-${chunks.length + 1}`,
        page: currentPage,
        section: currentSection,
        text,
        tokenCount: Math.round(currentChunkWords * 1.3),
        charCount: text.length,
      });

      // Maintain slight overlap
      currentChunkLines = currentChunkLines.slice(-2);
      currentChunkWords = currentChunkLines.join(' ').split(/\s+/).length;
    }
  });

  // Flush remaining lines
  if (currentChunkLines.length > 0) {
    const text = currentChunkLines.join(' ');
    if (text.length > 30) {
      chunks.push({
        id: `chunk-${chunks.length + 1}`,
        page: currentPage,
        section: currentSection,
        text,
        tokenCount: Math.round(currentChunkWords * 1.3),
        charCount: text.length,
      });
    }
  }

  const estimatedPages = Math.max(currentPage, Math.ceil(totalWords / 450));

  return {
    chunks,
    totalWords,
    estimatedPages,
  };
}
