import * as React from 'react';

import {
  Button
} from '@fluentui/react-components';

import type {
  JSONContent
} from '@tiptap/core';

import type {
  SPFI
} from '@pnp/sp';

import {
  IReadonlyTheme
} from '@microsoft/sp-component-base';

import {
  TiptapEditorHost
} from './TiptapEditorHost';

import {
  SharePointDocumentService
} from '../common/services/SharePointDocumentService';

export interface IContentEditorShellProps {

  sp: SPFI;

  filePath: string;

  initialContent: JSONContent;

  themeVariant?:
    IReadonlyTheme;
}

export const ContentEditorShell:
React.FC<IContentEditorShellProps> = ({
  sp,
  filePath,
  initialContent
}) => {

  const service =
    React.useMemo(
      () =>
        new SharePointDocumentService(
          sp
        ),
      [sp]
    );

  const [
    content,
    setContent
  ] = React.useState<JSONContent>(
    initialContent
  );

  const [
    dirty,
    setDirty
  ] = React.useState(false);

  const [
    saving,
    setSaving
  ] = React.useState(false);

  /*
   * Refresh editor content whenever
   * a different blog post is selected.
   */
  React.useEffect(() => {

 setContent(
      initialContent
    );

    setDirty(false);

  }, [initialContent]);

  const downloadJson =
    (): void => {

     const json =
        JSON.stringify(
          content,
          null,
          2
        );

      const blob =
        new Blob([json], {
          type: 'application/json'
        });

      const url =
        URL.createObjectURL(
          blob
        );

      const anchor =
        document.createElement(
          'a'
        );

      anchor.href =
        url;

      anchor.download =
        filePath
          .split('/')
          .pop() ??
        'content.json';

      anchor.click();

      URL.revokeObjectURL(
        url
      );
    };

  const saveDraft =
    async (): Promise<void> => {
     try {

        setSaving(true);

        await service.saveContent(
          filePath,
          content
        );

        setDirty(false);

      } catch (error) {
       console.error(
          'save failed',
          error
      );

        window.alert(
        'Failed to save draft.'
      );

      } finally {

        setSaving(false);
      }
    };

  const submitForApproval =
    async (): Promise<void> => {

      console.log(
        'Submit For Approval',
        filePath
      );

     window.alert(
        'Submit for *pproval not implemented yet.'
     );
    };

  return (

    <div
      style={{
        marginTop: '24px'
      }}
    >

      <div
        style={{
          marginBottom: '12px',
          fontSize: '12px',
          color: '#666'
        }}
      >
        File:
        {': '}
        {filePath}
      </div>

      <div
        style={{
          display: 'flex',
          gap: '8px',
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
          disabled={saving}
          onClick={saveDraft}
        >
          {
            saving
              ? 'Saving...'
              : 'Save Draft'
          }
        </Button>

        <Button
          onClick={submitForApproval}
        >
          Submit For Approval
        </Button>

      </div>

      <div
        style={{
          marginBottom: '12px',
          fontWeight: 600
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