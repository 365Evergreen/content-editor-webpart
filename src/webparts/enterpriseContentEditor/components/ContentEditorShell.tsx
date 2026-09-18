import * as React from 'react';

import {
  Button
} from '@fluentui/react-components';

import {
  JSONContent
} from '@tiptap/core';

import {
  IReadonlyTheme
} from '@microsoft/sp-component-base';

import {
  TiptapEditorHost
} from './TiptapEditorHost';

import {
  useQueryParameters
} from '../common/utils/useQueryParameters';

export interface IContentEditorShellProps {

  libraryServerRelativeUrl: string;

  themeVariant?:
    IReadonlyTheme;
}

const INITIAL_CONTENT: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello TipTap'
        }
      ]
    }
  ]
};

export const ContentEditorShell:
React.FC<IContentEditorShellProps> = ({
  libraryServerRelativeUrl
}) => {

  const {
    file
  } = useQueryParameters();

  const [
    currentFile,
    setCurrentFile
  ] = React.useState<string | null>(
    null
  );

  const [
    content,
    setContent
  ] = React.useState<JSONContent>(
    INITIAL_CONTENT
  );

  const [
    dirty,
    setDirty
  ] = React.useState(false);

  React.useEffect(() => {

    if (!file) {
      return;
    }

    setCurrentFile(
      decodeURIComponent(
        file
      )
    );

  }, [file]);

  const downloadJson = (): void => {

    const json =
      JSON.stringify(
        content,
        null,
        2
      );

    const blob =
      new Blob(
        [json],
        {
          type:
            'application/json'
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const anchor =
      document.createElement('a');

    anchor.href = url;

    anchor.download =
      currentFile
        ? currentFile
            .split('/')
            .pop() ?? 'content.json'
        : 'content.json';

    anchor.click();

    URL.revokeObjectURL(
      url
    );
  };

  return (

    <div
      style={{
        padding: '20px'
      }}
    >

      <h1>
        Website Content Builder
      </h1>

      <div>
        Library:
        {' '}
        {libraryServerRelativeUrl}
      </div>

      {
        currentFile &&
        (
          <div>
            File:
            {' '}
            {currentFile}
          </div>
        )
      }

      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '20px',
          marginBottom: '20px'
        }}
      >

        <Button
          onClick={downloadJson}
        >
          Download JSON
        </Button>

        <Button
          appearance="primary"
        >
          Save Draft
        </Button>

        <Button>
          Submit For Approval
        </Button>

      </div>

      <div
        style={{
          marginBottom: '12px'
        }}
      >

        {
          dirty
            ? 'Unsaved Changes'
            : 'Saved'
        }

      </div>

      <TiptapEditorHost

        content={content}

        onContentChange={(
          updatedContent
        ) => {

          setContent(
            updatedContent
          );

          setDirty(true);
        }}
      />

    </div>

  );
};