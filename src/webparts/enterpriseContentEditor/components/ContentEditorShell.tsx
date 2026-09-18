import * as React from 'react';

import {
  Button,
  makeStyles
} from '@fluentui/react-components';

import {
  IReadonlyTheme
} from '@microsoft/sp-component-base';
import {TiptapEditorHost} from './TiptapEditorHost'

const useStyles = makeStyles({

  root: {
    padding: '20px'
  },

  title: {
    marginBottom: '20px'
  },

  commandBar: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px'
  },

  editorSurface: {
    border: '1px solid #d1d1d1',
    borderRadius: '4px',
    minHeight: '500px',
    padding: '20px'
  }
});

export interface IContentEditorShellProps {

  libraryServerRelativeUrl: string;

  themeVariant?:
    IReadonlyTheme;
}

export const ContentEditorShell:
React.FC<IContentEditorShellProps> = ({
  libraryServerRelativeUrl
}) => {

  const styles = useStyles();

  return (

    <div className={styles.root}>

      <h1 className={styles.title}>
        Website Content Builder
      </h1>

      <div>
        Library:
        {' '}
        {libraryServerRelativeUrl}
      </div>

      <div className={styles.commandBar}>

        <Button>
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

      

       <TiptapEditorHost />

      </div>

  

  );
};