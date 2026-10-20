import { describe, expect, it } from "vitest";
import { toHtml } from "../src/index.js";

describe("list", () => {
  it("bullet list", () => expect(toHtml("- a\n- b")).toBe("<ul><li>a</li><li>b</li></ul>"));
  it("ordered list", () => expect(toHtml("1. a\n2. b")).toBe("<ol><li>a</li><li>b</li></ol>"));
  it("switching list type starts a new list", () => expect(toHtml("- a\n1. b")).toBe("<ul><li>a</li></ul>\n<ol><li>b</li></ol>"));
  it("blank line ends the list", () => expect(toHtml("- a\n\ntext")).toBe("<ul><li>a</li></ul>\n<p>text</p>"));
  it("inline markup in items", () => expect(toHtml("- **a**")).toBe("<ul><li><strong>a</strong></li></ul>"));
});
