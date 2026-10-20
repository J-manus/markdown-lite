import { parse } from "./parser.js";
import { render } from "./render.js";

export { parse, render };
export type { Block, Document, Inline } from "./ast.js";

/** 一步到位：Markdown 字符串 → HTML 字符串 */
export const toHtml = (markdown: string) => render(parse(markdown));
