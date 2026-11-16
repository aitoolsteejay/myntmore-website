import { describe, expect, it } from "vitest";
import { prefersMarkdown } from "./negotiate";

describe("prefersMarkdown", () => {
  it.each([
    [null, false],
    ["text/html", false],
    ["*/*", false],
    ["application/json", false],
    ["text/markdown", true],
    ["TEXT/MARKDOWN", true],
    ["text/markdown, text/html", false],
    ["text/markdown;q=0.8, text/html;q=0.6", true],
    ["text/markdown;q=0.6, text/html;q=0.8", false],
    ["text/markdown;q=0, text/html;q=0", false],
    ["text/markdown;q=invalid", false],
    ["text/markdown;q=0.8, text/*", false],
    ["text/markdown;q=0.8, text/html;q=0, */*", true],
    ['text/html; note="x;y,z";q=0.1, text/markdown;q=0.8', true],
  ] as const)("handles %s", (accept, result) => {
    expect(prefersMarkdown(accept)).toBe(result);
  });
});
