import * as fs from "fs";
import { basename } from "path";
import { workspace } from "vscode";

// This class walks through all the files in the current workspace
// and adds every #tag it finds to a new Set() of #tags
// to be used by the MarkdownCompletionProvider for #tags
//
// In the future, I think this can be combined with ReferenceSearch.
// But I think this class might be *slightly* more faster
// since it does not do any of the work to track the Position (line, column)
// of each tag in the document

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

  static _rxWikiLink = "\\[\\[([^\\]]+)\\]\\]"; // [[wiki-link-regex]]
  static _rxMarkdownWordPattern = "([\\_\\w\\#\\.\\/\\\\]+)"; // had to add [".", "/", "\"] to get relative path completion working and ["#"] to get tag completion working

  static rxWikiLink(): RegExp {
    return new RegExp(this._rxWikiLink, "ig");
  }

  static rxMarkdownWordPattern(): RegExp {
    return new RegExp(this._rxMarkdownWordPattern);
  }

  static rxMarkdownHeading(level: number): RegExp {
    const pattern = `^#{${level}}\\s+(.+)$`;
    return new RegExp(pattern, "im");
  }

  static findTopLevelHeading(md: string): string {
    const regex = WorkspaceFiles.rxMarkdownHeading(1);
    const match = regex.exec(md);
    if (match) {
      return match[1];
    }

    return null;
  }

  static findWikilinksInMarkdown(md: string): string[] {
    const regex = WorkspaceFiles.rxWikiLink();
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
    const filePromises = files
      .filter(
        // TODO: parameterize extensions. Add $ to end?
        (f) => f.scheme === "file" && f.path.match(/\.(md|mdx|markdown)/i)
      )
      .map((f) => {
        const filename = basename(f.fsPath);

        // read file, get all words beginning with #, add to Set

        return fs.promises.readFile(f.fsPath).then((data) => {
          let doc = (data || "").toString();
          const title = WorkspaceFiles.findTopLevelHeading(doc);
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
      });

    await Promise.all(filePromises);

    this.COMPLETED_INIT = true;
    return Promise.resolve(WorkspaceFiles.WORKSPACE_FILES);
  }
}
