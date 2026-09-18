import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  Version
} from '@microsoft/sp-core-library';

import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';

import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';

import {
  IReadonlyTheme
} from '@microsoft/sp-component-base';

import {
  spfi,
  SPFI
} from '@pnp/sp';

import {
  SPFx
} from '@pnp/sp/presets/all';

import '@pnp/sp/webs';
import '@pnp/sp/lists';

import {
  EnterpriseContentEditor
} from './components/EnterpriseContentEditor';

import {
  IEnterpriseContentEditorWebPartProps
} from './components/IEnterpriseContentEditorProps';

export default class EnterpriseContentEditorWebPart
  extends BaseClientSideWebPart<IEnterpriseContentEditorWebPartProps> {

  private _sp!: SPFI;

  private _themeVariant:
    IReadonlyTheme | undefined;

  private _listOptions:
    IPropertyPaneDropdownOption[] = [];

  private _libraryOptions:
    IPropertyPaneDropdownOption[] = [];

  protected async onInit():
    Promise<void> {

    await super.onInit();

    this._sp =
      spfi().using(
        SPFx(this.context)
      );

    await this._loadConfigurationData();
  }

  private async _loadConfigurationData():
    Promise<void> {

    try {

      const lists =
        await this._sp.web.lists
          .select(
            'Title',
            'BaseTemplate',
            'Hidden'
          )();

      this._listOptions =
        lists
          .filter(
            list =>
              list.BaseTemplate !== 101 &&
              !list.Hidden
          )
          .map(
            list => ({
              key: list.Title,
              text: list.Title
            })
          );

      this._libraryOptions =
        lists
          .filter(
            list =>
              list.BaseTemplate === 101 &&
              !list.Hidden
          )
          .map(
            list => ({
              key: list.Title,
              text: list.Title
            })
          );

    } catch (error) {

      console.error(
        'Failed to load lists',
        error
      );
    }
  }

  protected onThemeChanged(
    currentTheme:
      IReadonlyTheme | undefined
  ): void {

    this._themeVariant =
      currentTheme;

    this.render();
  }

  public render(): void {

    const element =
      React.createElement(
        EnterpriseContentEditor,
        {
          sp: this._sp,

          listTitle:
            this.properties.listTitle,

          libraryTitle:
            this.properties.libraryTitle,

          filePath:
            this.properties.filePath,

          themeVariant:
            this._themeVariant
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

  protected get dataVersion():
    Version {

    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration():
    IPropertyPaneConfiguration {

    return {

      pages: [
        {
          header: {
            description:
              'Website content builder'
          },

          groups: [
            {
              groupName:
                'Content sources',

              groupFields: [

                PropertyPaneDropdown(
                  'listTitle',
                  {
                    label:
                      'Blog posts list',

                    options:
                      this._listOptions
                  }
                ),

                PropertyPaneDropdown(
                  'libraryTitle',
                  {
                    label:
                      'Content library',

                    options:
                      this._libraryOptions
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