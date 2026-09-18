import type { JSONContent } from '@tiptap/core';

import { IContentDocument } from '../models/IContentDocument';

export function createEmptyDocument(): IContentDocument {

  const content: JSONContent = {
    type: 'doc',
    content: []
  };

  return {
    id: crypto.randomUUID(),
    title: 'New Content',
    route: '/',
    schemaVersion: '1.0',
    content
  };
}