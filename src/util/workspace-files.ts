/**
 * Adapted from vscode-markdown-notes/src/WorkspaceTagList.ts
 * https://github.com/kortina/vscode-markdown-notes/blob/master/src/WorkspaceTagList.ts
 */
import * as fs from "fs";
import { basename } from "path";
import { workspace } from "vscode";
import { findTopLevelHeading, rxWikiLink } from "./markdown-utils";

type FileIndex = {
  [id in string]: {
    id: string;
    ext: string;
    name: string;
    filename: string;
    title: string;
  };
};

export class WorkspaceFiles {
  static WORKSPACE_FILES: FileIndex = {};
  static STARTED_INIT = false;
  static COMPLETED_INIT = false;

  static findWikilinksInMarkdown(md: string): string[] {
    const regex = rxWikiLink();
    const unique = new Set();

    let match;
    while ((match = regex.exec(md))) {
      // can be file-name or file.name.ext
      const [, name] = match;
      if (name) {
        unique.add(name);
      }
    }

    return [...unique] as string[];
  }

  static async getFileIndex() {
    // @todo how to invalidate cache?
    if (this.COMPLETED_INIT) {
      return Promise.resolve(WorkspaceFiles.WORKSPACE_FILES);
    }

    const files = await workspace.findFiles("**/*");

    await Promise.all(
      files
        .filter(
          (f) => f.scheme === "file" && f.path.match(/\.(md|mdx|markdown)/i)
        )
        .map((f) => {
          const filename = basename(f.fsPath);
          return fs.promises.readFile(f.fsPath).then((data) => {
            let doc = (data || "").toString();
            const title = findTopLevelHeading(doc);
            if (title) {
              const [name, ext] = filename.split(".");
              const id = name.toLowerCase();
              return (WorkspaceFiles.WORKSPACE_FILES[id] = {
                id,
                ext,
                name,
                filename,
                title,
              });
            }
          });
        })
    );

    this.COMPLETED_INIT = true;
    return Promise.resolve(WorkspaceFiles.WORKSPACE_FILES);
  }
}
