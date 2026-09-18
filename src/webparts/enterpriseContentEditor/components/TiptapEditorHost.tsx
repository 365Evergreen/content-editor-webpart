import * as React from 'react';

import {
  EditorContent,
  useEditor
} from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';

export const TiptapEditorHost:
React.FC = () => {

  const editor = useEditor({

    extensions: [
      StarterKit
    ],

    content:
      '<p>Hello TipTap</p>',

    immediatelyRender: false
  });

  if (!editor) {

    return (
      <div>
        Initialising editor...
      </div>
    );
  }

  return (

    <div
      style={{
        border: '1px solid #d1d1d1',
        borderRadius: '4px',
        backgroundColor: '#ffffff',
        minHeight: '500px',
        padding: '16px'
      }}
    >

      <EditorContent
        editor={editor}
      />

    </div>

  );
};