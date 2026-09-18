import * as React from 'react';

import type { Editor } from '@tiptap/core';

import {
  Toolbar,
  ToolbarButton
} from '@fluentui/react-components';

export interface ITiptapToolbarProps {
  // eslint-disable-next-line @rushstack/no-new-null
  editor: Editor | null;
}

export const TiptapToolbar:
React.FC<ITiptapToolbarProps> = ({
  editor
}) => {

  if (!editor) {
    return null;
  }

  return (

    <Toolbar
      aria-label="Editor Toolbar"
    >

      <ToolbarButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
      >
        Bold
      </ToolbarButton>

      <ToolbarButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
      >
        Italic
      </ToolbarButton>

      <ToolbarButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 2
            })
            .run()
        }
      >
        H2
      </ToolbarButton>

    </Toolbar>

  );
};