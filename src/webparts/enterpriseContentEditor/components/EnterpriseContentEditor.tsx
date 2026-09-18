import * as React from 'react';

import {
  IReadonlyTheme
} from '@microsoft/sp-component-base';

import {
  ContentEditorShell
} from './ContentEditorShell';

export interface IEnterpriseContentEditorProps {

  libraryServerRelativeUrl: string;

  themeVariant?:
    IReadonlyTheme;
}

export const EnterpriseContentEditor:
React.FC<IEnterpriseContentEditorProps> = ({
  libraryServerRelativeUrl,
  themeVariant
}) => {

  return (

    <ContentEditorShell
      libraryServerRelativeUrl={
        libraryServerRelativeUrl
      }
      themeVariant={
        themeVariant
      }
    />

  );
};