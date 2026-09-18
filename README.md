# Enterprise Content Editor (SPFx + TipFX)

## Overview

Enterprise Content Editor is a SharePoint Framework (SPFx) solution that provides a modern JSON-first content authoring experience using TipTap.

The solution is intentionally simple:

Author -> TipTap Editor -> JSON Document -> SharePoint Document Library

Version 1 does not include validation pipelines, publishing workflows, Azure Functions, HTML generation, Azure Blob Storage, or Power Automate integration.

## Technology Stack

- SPFx 1.23.2
- Heft build toolchain
- npm package manager
- React 17
- TipTap 3
- Fluent UI v9
- PnPjs v4
- SharePoint Document Library storage

## Project Structure

```text
src/
├── common/
│   ├── models/
│   │   └── IContentDocument.ts
│   ├── services/
│   │   └── SharePointDocumentService.ts
│   └── utils/
│       └── createEmptyDocument.ts
├── extensions/
│   └── contentLibraryCommands/
└── webparts/
    └── enterpriseContentEditor/
        ├── components/
        ├── hooks/
        ├── editors/
        ├── EnterpriseContentEditor.tsx
        └── EnterpriseContentEditorWebPart.ts
```

## Create the SPFx Solution

```bash
yo @microsoft/sharepoint
```

Recommended options:

```text
Target Environment: SharePoint Online only
Component Type: Web Part
Framework: React
Web Part Name: EnterpriseContentEditor
```

## Install Dependencies

### TipTap

```bash
npm install --save-exact @tiptap/core@3.11.0 @tiptap/react@3.11.0 @tiptap/starter-kit@3.11.0 @tiptap/extension-link@3.11.0 @tiptap/extension-underline@3.11.0
```

### PnPjs

```bash
npm install --save @pnp/sp@4.17.0
```

### Fluent UI

```bash
npm install --save @fluentui/react-components@9.74.7 @fluentui/react-icons@2.0.341
```

## Development

Start local workbench:

```bash
npm start
```

This runs the SPFx Heft start pipeline.

## Production Build

```bash
npm run build
```

## Package for Deployment

Use the SPFx package solution command defined by the generated project:

```bash
npx heft package-solution --production
```

or the package script generated in package.json.

## Content Model

```ts
export interface IContentDocument {
  id: string;
  title: string;
  route: string;
  schemaVersion: string;
  content: unknown;
}
```

## SharePoint Storage

Create a document library named:

```text
Content Repository
```

Store files such as:

```text
home.json
about-us.json
services.json
```

Enable major versioning.

## Command Set

Create a ListView Command Set named:

```text
Edit Content
```

The command opens a dedicated editor page and passes the selected item identifier.

## Phase 1 Success Criteria

- TipTap editor loads
- JSON content can be edited
- Existing JSON documents can be loaded
- Documents can be saved back to SharePoint
- Command set launches the editor page
- Future custom TipTap extensions can be added

## Guiding Principle

TipTap is the authoring engine.

SharePoint is the source of truth.

JSON is the content contract.
