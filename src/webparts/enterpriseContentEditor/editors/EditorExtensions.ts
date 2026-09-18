import StarterKit from '@tiptap/starter-kit';

import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';

export const EditorExtensions = [

  StarterKit,

  Underline,

  Link.configure({
    openOnClick: false,
    autolink: true,
    linkOnPaste: true
  })

];