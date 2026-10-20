import type { Inline } from "./ast.js";

const TOKEN = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/;

/** 把一行文字拆成行内节点：`code`、**strong**、*em* / _em_ */
export function parseInline(src: string): Inline[] {
  const out: Inline[] = [];
  for (const part of src.split(TOKEN)) {
    if (!part) continue;
    if (part.startsWith("`")) out.push({ type: "code", value: part.slice(1, -1) });
    else if (part.startsWith("**")) out.push({ type: "strong", children: parseInline(part.slice(2, -2)) });
    else if ((part.startsWith("*") || part.startsWith("_")) && part.length > 2)
      out.push({ type: "em", children: parseInline(part.slice(1, -1)) });
    else out.push({ type: "text", value: part });
  }
  return out;
}
