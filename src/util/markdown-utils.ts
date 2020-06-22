/**
 * Adapted from vscode-markdown/src/util.ts
 * https://github.com/yzhang-gh/vscode-markdown/blob/master/src/util.ts
 */
"use strict";

import { TextEditor } from "vscode";

export const REGEX_FENCED_CODE_BLOCK = /^( {0,3}|\t)```[^`\r\n]*$[\w\W]+?^( {0,3}|\t)``` *$/gm;

export function markdownHeadingToPlainText(text: string) {
  // Remove Markdown syntax (bold, italic, links etc.) in a heading
  // For example: `_italic_` -> `italic`
  text = text.replace(/\[([^\]]*)\]\[[^\]]*\]/, (_, g1) => g1);

  return text;
}

export function rxWikiLink(): RegExp {
  const pattern = "\\[\\[([^\\]]+)\\]\\]"; // [[wiki-link-regex]]
  return new RegExp(pattern, "ig");
}

export function rxMarkdownHeading(level: number): RegExp {
  const pattern = `^#{${level}}\\s+(.+)$`;
  return new RegExp(pattern, "im");
}

export const mdDocSelector = [
  { language: "markdown", scheme: "file" },
  { language: "markdown", scheme: "untitled" },
];

export function isMdEditor(editor: TextEditor) {
  return editor && editor.document && editor.document.languageId === "markdown";
}

export function findTopLevelHeading(md: string): string {
  const regex = rxMarkdownHeading(1);
  const match = regex.exec(md);
  if (match) {
    return markdownHeadingToPlainText(match[1]);
  }

  return null;
}
