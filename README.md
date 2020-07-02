# foam-vscode

**foam-vscode** is the VS Code extension for [Foam](https://foambubble.github.io/foam).

> ℹ️ foam-vscode doesn't do much on it's own. To learn how to use it, read [Foam documentation](https://foambubble.github.io/foam) and the [Getting started](https://foambubble.github.io/foam/#getting-started) guide.

> ⚠️ foam-vscode is extremely early stage software. Use at your own peril.

> 👀 See [foam-vscode/issues](https://github.com/foambubble/foam-vscode/issues) for known issues.

## Quick getting started

You really, _really_, **really** should read [Foam documentation](https://foambubble.github.io/foam), but if you can't be bothered, this is how to get started:

1. [Create a GitHub repository from foam-template](https://github.com/foambubble/foam-template/generate). If you want to keep your thoughts to yourself, remember to set the repository private.
2. Clone the repository and open it in VS Code.
3. When prompted to install recommended extensions, click **Install all** (or **Show Recommendations** if you want to review and install them one by one).

This will also install `foam-vscode`, but if you already have it installed, that's ok, just make sure you're up to date on the latest version.

## Features

- Create markdown references for `[[wiki-links]]`
  - Lauched automatically for workspaces that have a `.vscode/foam.json` file
  - Run "Foam: Update Markdown Reference List" to use in a non-foam workspace

## Requirements

High tolerance for alpha-grade software.

## Known Issues

Unused aren't removed from reference lists until you restart VS Code. This will be fixed in future versions.

## Release Notes

### 0.1.5

Fix multiple issues related to excess/disappearing newlines:

- https://github.com/foambubble/foam-vscode/issues/3
- https://github.com/foambubble/foam-vscode/issues/5
- https://github.com/foambubble/foam-vscode/issues/10

### 0.1.4

Fix flaky reference block replacement logic that would occasionally leave
trailing fragments in the end of the document ([#3](https://github.com/foambubble/foam-vscode/issues/3))

### 0.1.3

Include Getting Started instructions

### 0.1.2

Update extension name.

### 0.1.1

Fix markdown link format (`link.md` to just `link`).

### 0.1.0

Initial version.
