/**
 * Minimal regex highlighter — deliberately tiny (no runtime dependency).
 * It colors the 80% that matters: comments, strings, keywords, tags,
 * numbers and JSX attributes. Unknown constructs fall back to plain text.
 */

export type HighlightLang = 'tsx' | 'css' | 'bash';

export interface Token {
  type: 'comment' | 'string' | 'keyword' | 'number' | 'tag' | 'attr' | 'plain';
  text: string;
}

const TSX_RE =
  /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\[\s\S])*`)|(<\/?[A-Za-z][\w.]*|\/>|>)|\b(import|from|export|default|const|let|var|function|return|if|else|for|of|in|as|type|interface|extends|new|typeof|null|undefined|true|false|async|await)\b|(\b\d[\d_]*(?:\.\d+)?\b)|([A-Za-z_$][\w$-]*(?=\s*=))/gm;

const CSS_RE =
  /(\/\*[\s\S]*?\*\/)|('[^'\n]*'|"[^"\n]*")|([a-z0-9-]+(?=\s*:))|(@[a-z-]+)|(\b\d[\d.]*(?:px|rem|em|%|ms|s|fr|vh|vw|deg)?\b)/gim;

const BASH_RE = /(#[^\n]*)|('[^'\n]*'|"[^"\n]*")|\b(npm|npx|git|cd|node|run|install|clone|build|dev|preview)\b/gm;

const RE: Record<HighlightLang, RegExp> = { tsx: TSX_RE, css: CSS_RE, bash: BASH_RE };

export function tokenize(code: string, lang: HighlightLang): Token[] {
  const re = new RegExp(RE[lang].source, RE[lang].flags);
  const tokens: Token[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  const typeOf = (match: RegExpExecArray): Token['type'] => {
    // First non-undefined capture group decides the class.
    for (let g = 1; g < match.length; g++) {
      if (match[g] === undefined) continue;
      const v = match[g];
      if (lang === 'tsx') {
        if (g === 1 || g === 2) return 'comment';
        if (g === 3) return 'string';
        if (g === 4) return 'tag';
        if (g === 5) return 'keyword';
        if (g === 6) return 'number';
        if (g === 7) return 'attr';
      } else if (lang === 'css') {
        if (g === 1) return 'comment';
        if (g === 2) return 'string';
        if (g === 3) return 'attr';
        if (g === 4) return 'keyword';
        if (g === 5) return 'number';
      } else {
        if (g === 1) return 'comment';
        if (g === 2) return 'string';
        if (g === 3) return 'keyword';
      }
      void v;
    }
    return 'plain';
  };

  while ((m = re.exec(code)) !== null) {
    if (m.index > last) tokens.push({ type: 'plain', text: code.slice(last, m.index) });
    tokens.push({ type: typeOf(m), text: m[0] });
    last = m.index + m[0].length;
    if (m[0].length === 0) re.lastIndex++; // safety against empty matches
  }
  if (last < code.length) tokens.push({ type: 'plain', text: code.slice(last) });
  return tokens;
}
