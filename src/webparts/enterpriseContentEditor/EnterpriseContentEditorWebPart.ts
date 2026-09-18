/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  Version
} from '@microsoft/sp-core-library';

import {
  BaseClientSideWebPart,
  
} from '@microsoft/sp-webpart-base';

import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import {
  EnterpriseContentEditor,
  IEnterpriseContentEditorProps
} from './components/EnterpriseContentEditor';

export interface IEnterpriseContentEditorWebPartProps {

  libraryServerRelativeUrl: string;
}

export default class EnterpriseContentEditorWebPart
  extends BaseClientSideWebPart<IEnterpriseContentEditorWebPartProps> {

  public render(): void {

    const element =
      React.createElement<
        IEnterpriseContentEditorProps
      >(
        EnterpriseContentEditor,
        {
          libraryServerRelativeUrl:
            this.properties
              .libraryServerRelativeUrl || '',
          // provide the SharePoint context (or SP object expected by the component)
          // cast to any to satisfy the prop type if exact type is not available here
          sp: (this.context as any)
        }
      );

    ReactDom.render(
      element,
      this.domElement
    );
  }

  protected onDispose(): void {

    ReactDom.unmountComponentAtNode(
      this.domElement
    );
  }

  protected get dataVersion(): Version {

    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration():
    IPropertyPaneConfiguration {

    return {

      pages: [
        {
          header: {
            description:
              'Enterprise Content Editor'
          },

          groups: [
            {
              groupName:
                'Content Repository',

              groupFields: [

                PropertyPaneTextField(
                  'libraryServerRelativeUrl',
                  {
                    label:
                      'Library Server Relative URL'
                  }
                )

              ]
            }
          ]
        }
      ]
    };
  }
}