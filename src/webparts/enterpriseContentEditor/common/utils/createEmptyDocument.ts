import { IContentDocument } from '../models/IContentDocument';
import { JSONContent } from '@tiptap/core';

export function createEmptyDocument(): IContentDocument {
  const emptyContent: JSONContent = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: []
      }
    ]
  };

  return {
    postId: crypto.randomUUID(),
    title: 'New Content',
    slug: '/',
    editorContent: emptyContent
  };
}