/* eslint-disable no-void */


import * as React from 'react';

import {
  Button
} from '@fluentui/react-components';

import {
  JSONContent
} from '@tiptap/core';

import {
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

import {
  useQueryParameters
} from '../common/utils/useQueryParameters';

export interface IContentEditorShellProps {

  sp: SPFI;

  libraryServerRelativeUrl: string;

  themeVariant?:
  IReadonlyTheme;
}

const EMPTY_CONTENT: JSONContent = {
  type: 'doc',
  content: []
};

export const ContentEditorShell:
  React.FC<IContentEditorShellProps> = ({
    sp,
    libraryServerRelativeUrl
  }) => {

    const {
      file
    } = useQueryParameters();

    const resolvedFilePath =
      React.useMemo(() => {

        if (!file) {
          return null;
        }

        return decodeURIComponent(
          file
        );

      }, [file]); console.log(
        'Query file',
        file
      );

    console.log(
      'Resolved path',
      resolvedFilePath
    );

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
      EMPTY_CONTENT
    );

    const [
      dirty,
      setDirty
    ] = React.useState(false);

    const [
      loading,
      setLoading
    ] = React.useState(true);


    React.useEffect(() => {

      if (!resolvedFilePath) {

        setLoading(false);

        return;
      }

      const load =
        async (): Promise<void> => {

          try {

            const loadedContent =
              await service.loadContent(
                resolvedFilePath
              );

            console.log(
              'Loaded TipTap JSON',
              loadedContent
            );

            setContent(
              loadedContent
            );

            setDirty(false);

          } catch (error) {

            console.error(
              'Load failed',
              error
            );

          } finally {

            setLoading(false);
          }
        };

      void load();

    }, [
      resolvedFilePath,
      service
    ]);
    const downloadJson =
      (): void => {

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
          document.createElement(
            'a'
          );

        anchor.href =
          url;

        anchor.download =
          file ?? 'content.json';

        anchor.click();

        URL.revokeObjectURL(
          url
        );
      };

    const saveDraft =
      async (): Promise<void> => {

        if (!resolvedFilePath) {

          window.alert(
            'No file specified.'
          );

          return;
        }

        await service.saveContent(
          resolvedFilePath,
          content
        );

        setDirty(false);
      };

    const submitForApproval =
      async (): Promise<void> => {

        console.log(
          'Submit For Approval',
          file
        );

        window.alert(
          'Submit for Approval not implemented yet.'
        );
      };

    if (loading) {

      return (
        <div
          style={{
            padding: '20px'
          }}
        >
          Loading content...
        </div>
      );
    }

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
          resolvedFilePath &&
          (
            <div>
              File:
              {' '}
              {resolvedFilePath}
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
            onClick={saveDraft}
          >
            Save Draft
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
  }