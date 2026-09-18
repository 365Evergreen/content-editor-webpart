import * as React from 'react';

import { SPFI } from '@pnp/sp';

import {
  IReadonlyTheme
} from '@microsoft/sp-component-base';

import {
  BlogContentDashboard
} from './BlogContentDashboard';

export interface IEnterpriseContentEditorProps {

  sp: SPFI;
  themeVariant?: IReadonlyTheme | undefined;
  siteUrl?: string;
  libraryTitle: string;
  listTitle?: string;
  filePath: string,
}

export const EnterpriseContentEditor:
React.FC<IEnterpriseContentEditorProps> = ({
  sp,
  siteUrl,
  libraryTitle,
  listTitle,
  themeVariant,
  filePath
}) => {

  return (

    <BlogContentDashboard
      sp={sp}
      siteUrl={siteUrl || ''}
      themeVariant={themeVariant}
      libraryTitle={libraryTitle}
      listTitle={listTitle}
      filePath={filePath}
      />

  );
};