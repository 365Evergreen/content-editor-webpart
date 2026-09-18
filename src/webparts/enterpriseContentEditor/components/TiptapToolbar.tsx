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
  editor: Editor | undefined;
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

    <Toolbar aria-label="Editor Toolbar">

      <ToolbarButton
        aria-label="Bold"
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
        aria-label="Italic"
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
        aria-label="Underline"
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
        aria-label="Heading 2"
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
        aria-label="Bullet List"
        appearance={
          editor.isActive('bulletList')
            ? 'primary'
            : 'subtle'
        }
        icon={<TextBulletListLtrRegular />}
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBulletList()
            .run()
        }
      />

      <ToolbarButton
        aria-label="Numbered List"
        appearance={
          editor.isActive('orderedList')
            ? 'primary'
            : 'subtle'
        }
        icon={<TextNumberListLtrRegular />}
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleOrderedList()
            .run()
        }
      />

      <ToolbarButton
        aria-label="Insert Link"
        appearance={
          editor.isActive('link')
            ? 'primary'
            : 'subtle'
        }
        icon={<LinkRegular />}
        onClick={createLink}
      />

      <ToolbarButton
        aria-label="Remove Link"
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
        aria-label="Undo"
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
        aria-label="Redo"
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