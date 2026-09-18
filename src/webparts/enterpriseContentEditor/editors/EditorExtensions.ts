import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import ImageResize from 'tiptap-extension-resize-image';

export const EditorExtensions = [
  StarterKit,

  Link.configure({
    openOnClick: false
  }),
      ImageResize.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "resizable-image",
        },
      }),

  Underline,
];