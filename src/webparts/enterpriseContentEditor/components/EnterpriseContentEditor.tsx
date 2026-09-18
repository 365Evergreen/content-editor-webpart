import * as React from 'react';

import {
  IReadonlyTheme
} from '@microsoft/sp-component-base';
import { SPFI } from '@pnp/sp';

import {
  ContentEditorShell
} from './ContentEditorShell';

export interface IEnterpriseContentEditorProps {

  libraryServerRelativeUrl: string;

  themeVariant?:
    IReadonlyTheme;

  sp: SPFI;
}

export const EnterpriseContentEditor:
React.FC<IEnterpriseContentEditorProps> = ({
  libraryServerRelativeUrl,
  themeVariant,
  sp
}) => {

  return (

    <ContentEditorShell
      libraryServerRelativeUrl={
        libraryServerRelativeUrl
      }
      themeVariant={
        themeVariant
      }
      sp={
        sp
      }
    />

  );
};