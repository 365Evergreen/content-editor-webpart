/* eslint-disable @rushstack/no-new-null */
import * as React from 'react';

import type { Editor } from '@tiptap/core';

import {
  Toolbar,
  ToolbarButton
} from '@fluentui/react-components';

import {
  TextBoldRegular,
  TextItalicRegular,
  TextUnderlineRegular,
  TextHeader2Regular,
  TextBulletListLtrRegular,
  TextNumberListLtrRegular,
  LinkRegular,
  LinkDismissRegular,
  ArrowUndoRegular,
  ArrowRedoRegular
} from '@fluentui/react-icons';

export interface ITiptapToolbarProps {
  editor: Editor | null;
}

export const TiptapToolbar:
React.FC<ITiptapToolbarProps> = ({
  editor
}) => {

  if (!editor) {
    return null;
  }

  const createLink = (): void => {

    const url =
      window.prompt(
        'Enter URL'
      );

    if (!url) {
      return;
    }

    editor
      .chain()
      .focus()
      .setLink({
        href: url
      })
      .run();
  };

  return (

    <Toolbar
      aria-label="Editor Toolbar"
    >

      <ToolbarButton
        appearance={
          editor.isActive('bold')
            ? 'primary'
            : 'subtle'
        }
        icon={<TextBoldRegular />}
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
      />

      <ToolbarButton
        appearance={
          editor.isActive('italic')
            ? 'primary'
            : 'subtle'
        }
        icon={<TextItalicRegular />}
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
      />

      <ToolbarButton
        appearance={
          editor.isActive('underline')
            ? 'primary'
            : 'subtle'
        }
        icon={<TextUnderlineRegular />}
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleUnderline()
            .run()
        }
      />

      <ToolbarButton
        appearance={
          editor.isActive(
            'heading',
            { level: 2 }
          )
            ? 'primary'
            : 'subtle'
        }
        icon={<TextHeader2Regular />}
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 2
            })
            .run()
        }
      />

      <ToolbarButton
        appearance={
          editor.isActive('bulletList')
            ? 'primary'
            : 'subtle'
        }
        icon={
          <TextBulletListLtrRegular />
        }
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBulletList()
            .run()
        }
      />

      <ToolbarButton
        appearance={
          editor.isActive('orderedList')
            ? 'primary'
            : 'subtle'
        }
        icon={
          <TextNumberListLtrRegular />
        }
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleOrderedList()
            .run()
        }
      />

      <ToolbarButton
        appearance={
          editor.isActive('link')
            ? 'primary'
            : 'subtle'
        }
        icon={<LinkRegular />}
        onClick={createLink}
      />

      <ToolbarButton
        icon={<LinkDismissRegular />}
        onClick={() =>
          editor
            .chain()
            .focus()
            .unsetLink()
            .run()
        }
      />

      <ToolbarButton
        icon={<ArrowUndoRegular />}
        onClick={() =>
          editor
            .chain()
            .focus()
            .undo()
            .run()
        }
      />

      <ToolbarButton
        icon={<ArrowRedoRegular />}
        onClick={() =>
          editor
            .chain()
            .focus()
            .redo()
            .run()
        }
      />

    </Toolbar>

  );
};