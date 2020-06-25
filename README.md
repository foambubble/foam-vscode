# foam-vscode

**foam-vscode** is the VS Code extension for [Foam](https://foambubble.github.io/foam). 

> ℹ️ foam-vscode doesn't do much on it's own. To learn how to use it, read [Foam documentation](https://foambubble.github.io/foam) and the [Getting started](https://foambubble.github.io/foam/#getting-started) guide.

> ⚠️ foam-vscode is extremely early stage software. Use at your own peril.

> 👀 See [foam-vscode/issues](https://github.com/foambubble/foam-vscode/issues) for known issues.

## Features

- Create markdown references for `[[wiki-links]]`
  - Lauched automatically for workspaces that have a `.vscode/foam.json` file
  - Run "Foam: Update Markdown Reference List" to use in a non-foam workspace

## Requirements

High tolerance for alpha-grade software.

## Known Issues

Unused aren't removed from reference lists until you restart VS Code. This will be fixed in future versions.

## Release Notes

### 0.1.2

Update extension name.

### 0.1.1

Fix markdown link format (`link.md` to just `link`).

### 0.1.0

Initial version.
