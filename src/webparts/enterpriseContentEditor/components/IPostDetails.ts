import { JSONContent }
  from '@tiptap/core';

export interface IPostDocument {

  postId: string;

  title: string;

  slug: string;

  category?: string;

  featuredImage?: string;

  editorContent: JSONContent;
}