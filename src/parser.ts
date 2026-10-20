import type { Block, Document } from "./ast.js";
import { parseInline } from "./inline.js";

const HEADING = /^(#{1,6})(?:\s+(.*?))?\s*#*\s*$/;
const BULLET = /^\s*[-*+]\s+(.*)$/;
const ORDERED = /^\s*\d+[.)]\s+(.*)$/;

function parseHeading(line: string): Block | null {
  const m = HEADING.exec(line);
  if (!m) return null;
  const text = m[2] ?? "";
  return { type: "heading", depth: m[1].length, children: parseInline(text.trim()) };
}

export function parse(markdown: string): Document {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const children: Block[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flush = () => {
    if (para.length) children.push({ type: "paragraph", children: parseInline(para.join(" ")) });
    if (list) children.push({ type: "list", ordered: list.ordered, items: list.items.map(parseInline) });
    para = [];
    list = null;
  };

  for (const line of lines) {
    if (!line.trim()) {
      flush();
      continue;
    }
    const heading = line.startsWith("#") ? parseHeading(line) : null;
    if (heading) {
      flush();
      children.push(heading);
      continue;
    }
    const bullet = BULLET.exec(line);
    const ordered = bullet ? null : ORDERED.exec(line);
    if (bullet || ordered) {
      const isOrdered = !!ordered;
      if (para.length || (list && list.ordered !== isOrdered)) flush();
      list ??= { ordered: isOrdered, items: [] };
      list.items.push((bullet ?? ordered)![1]);
      continue;
    }
    if (list) flush();
    para.push(line.trim());
  }
  flush();
  return { type: "root", children };
}
