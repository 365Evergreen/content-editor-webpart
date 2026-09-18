import type { JSONContent } from '@tiptap/core';

export interface IContentDocument {

  id: string;
  title: string;
  route: string;
  schemaVersion: string;
  content: JSONContent;
}