import { describe, expect, it } from "vitest";
import { toHtml } from "../src/index.js";

describe("inline", () => {
  it("plain text", () => expect(toHtml("hello")).toBe("<p>hello</p>"));
  it("strong", () => expect(toHtml("**bold**")).toBe("<p><strong>bold</strong></p>"));
  it("em with stars", () => expect(toHtml("*it*")).toBe("<p><em>it</em></p>"));
  it("em with underscores", () => expect(toHtml("_it_")).toBe("<p><em>it</em></p>"));
  it("inline code", () => expect(toHtml("use `npm test`")).toBe("<p>use <code>npm test</code></p>"));
  it("escapes html", () => expect(toHtml("a < b & c")).toBe("<p>a &lt; b &amp; c</p>"));
  it("escapes html inside code", () => expect(toHtml("`<div>`")).toBe("<p><code>&lt;div&gt;</code></p>"));
  it("nests em inside strong", () => expect(toHtml("**very _much_**")).toBe("<p><strong>very <em>much</em></strong></p>"));
  it("joins soft line breaks", () => expect(toHtml("one\ntwo")).toBe("<p>one two</p>"));
});
