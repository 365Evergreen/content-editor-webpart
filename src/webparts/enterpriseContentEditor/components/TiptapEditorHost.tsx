import * as React from 'react';

import {
  EditorContent,
  useEditor
} from '@tiptap/react';

import {
  JSONContent
} from '@tiptap/core';

import {
  EditorExtensions
} from '../editors/EditorExtensions';

import {
  TiptapToolbar
} from './TiptapToolbar';

export interface ITiptapEditorHostProps {

  content: JSONContent;

  onContentChange(
    content: JSONContent
  ): void;
}

export const TiptapEditorHost:
React.FC<ITiptapEditorHostProps> = ({
  content,
  onContentChange
}) => {

  const editor = useEditor({

    extensions: EditorExtensions,

    content,

    immediatelyRender: false,

    onUpdate({ editor }) {

      onContentChange(
        editor.getJSON()
      );
    }
  });

  /**
   * Keep TipTap synchronised with
   * asynchronously loaded content.
   */
  React.useEffect(() => {

    if (!editor) {
      return;
    }

    const current =
      editor.getJSON();

    const next =
      JSON.stringify(content);

    const existing =
      JSON.stringify(current);

    if (existing === next) {
      return;
    }

    editor.commands.setContent(
      content
    );

  }, [
    editor,
    content
  ]);

  if (!editor) {

    return (
      <div>
        Initialising editor...
      </div>
    );
  }

  return (

    <div>

      <TiptapToolbar
        editor={editor}
      />

      <div
        style={{
          border: '1px solid #d1d1d1',
          borderTop: 'none',
          minHeight: '500px',
          padding: '16px',
          backgroundColor: '#ffffff'
        }}
      >

        <EditorContent
          editor={editor}
        />

      </div>

    </div>

  );
};