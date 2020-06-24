declare module "foam-workspace-manager" {
  // @todo figure out how to consume ts sources, as
  // foam-workspace-manager is written in typescript
  //
  // this isn't the full api
  export class WorkspaceManager {
    constructor(rootPath: string);
    addNoteFromMarkdown(filename: string, markdown: string): any;
    getNoteWithLinks(id: string): any;
  }
}
