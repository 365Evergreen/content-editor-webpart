import { SPFI } from '@pnp/sp';

import {
  IReadonlyTheme
} from '@microsoft/sp-component-base';

export interface IEnterpriseContentEditorProps {

  /**
   * PnPjs instance configured by the web part.
   */
  sp: SPFI;

  /**
   * Example:
   * /sites/intranet/Content Repository
   */
  libraryServerRelativeUrl: string;

  /**
   * Current SharePoint theme.
   */
  themeVariant?: IReadonlyTheme;
}