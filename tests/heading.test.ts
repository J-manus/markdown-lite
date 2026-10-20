import { describe, expect, it } from "vitest";
import { toHtml, parse } from "../src/index.js";

describe("heading", () => {
  it("renders h1 to h6", () => {
    for (let d = 1; d <= 6; d++) expect(toHtml(`${"#".repeat(d)} Title`)).toBe(`<h${d}>Title</h${d}>`);
  });
  it("treats seven hashes as a paragraph", () => expect(toHtml("####### nope")).toBe("<p>####### nope</p>"));
  it("requires a space after the hashes", () => expect(toHtml("#hashtag")).toBe("<p>#hashtag</p>"));
  it("strips closing hashes", () => expect(toHtml("## Title ##")).toBe("<h2>Title</h2>"));
  it("trims surrounding spaces", () => expect(toHtml("#   Spaced   ")).toBe("<h1>Spaced</h1>"));
  it("parses inline markup inside headings", () => expect(toHtml("# Hello **world**")).toBe("<h1>Hello <strong>world</strong></h1>"));
  it("records the depth", () => expect(parse("### x").children[0]).toMatchObject({ type: "heading", depth: 3 }));
  it("ends the previous paragraph", () => expect(toHtml("text\n# Title")).toBe("<p>text</p>\n<h1>Title</h1>"));
  it("renders an empty heading instead of throwing", () => expect(toHtml("#")).toBe("<h1></h1>"));
});
