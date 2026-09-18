import { JSONContent }
  from '@tiptap/core';

export interface IContentDocument {

  postId: string;
  title: string;
  slug: string;
  category?: string;
  featuredImage?: string;
  editorContent: JSONContent;
}