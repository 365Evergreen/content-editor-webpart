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
  listTitle: string;
  libraryTitle: string;
  themeVariant?: IReadonlyTheme;
  siteUrl?: string;
}

export const EnterpriseContentEditor:
React.FC<IEnterpriseContentEditorProps> = ({
  sp,
  siteUrl,
  listTitle,
  libraryTitle,
  themeVariant
}) => {

  return (

    <BlogContentDashboard
      sp={sp}
      siteUrl={siteUrl || ''}
      listTitle={listTitle}
      libraryTitle={
        libraryTitle
      }
      themeVariant={
        themeVariant
      }
   />

  );
};