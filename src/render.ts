import type { Block, Document, Inline } from "./ast.js";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function inline(nodes: Inline[]): string {
  return nodes
    .map((n) => {
      switch (n.type) {
        case "text": return escape(n.value);
        case "code": return `<code>${escape(n.value)}</code>`;
        case "strong": return `<strong>${inline(n.children)}</strong>`;
        case "em": return `<em>${inline(n.children)}</em>`;
      }
    })
    .join("");
}

function block(b: Block): string {
  switch (b.type) {
    case "heading": return `<h${b.depth}>${inline(b.children)}</h${b.depth}>`;
    case "paragraph": return `<p>${inline(b.children)}</p>`;
    case "list": {
      const tag = b.ordered ? "ol" : "ul";
      return `<${tag}>${b.items.map((i) => `<li>${inline(i)}</li>`).join("")}</${tag}>`;
    }
  }
}

export function render(doc: Document): string {
  return doc.children.map(block).join("\n");
}
