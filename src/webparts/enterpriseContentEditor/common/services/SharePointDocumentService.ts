import { SPFI } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/files';
import '@pnp/sp/folders';

import { IContentDocument } from '../models/IContentDocument';

export interface IDocumentSummary {
  id: number;
  name: string;
  serverRelativeUrl: string;
}

export class SharePointDocumentService {

  constructor(
    private readonly sp: SPFI
  ) {}

  /**
   * Load JSON document from a library file
   */
  public async loadDocument(
    serverRelativeUrl: string
  ): Promise<IContentDocument> {

    const json = await this.sp.web
      .getFileByServerRelativePath(
        serverRelativeUrl
      )
      .getText();

    return JSON.parse(
      json
    ) as IContentDocument;
  }

  /**
   * Save JSON document to library
   */
  public async saveDocument(
    libraryServerRelativeUrl: string,
    fileName: string,
    document: IContentDocument
  ): Promise<void> {

    const json =
      JSON.stringify(
        document,
        null,
        2
      );

    await this.sp.web
      .getFolderByServerRelativePath(
        libraryServerRelativeUrl
      )
      .files
      .addUsingPath(
        fileName,
        json,
        {
          Overwrite: true
        }
      );
  }

  /**
   * Create a new JSON document
   */
  public async createDocument(
    libraryServerRelativeUrl: string,
    fileName: string,
    document: IContentDocument
  ): Promise<void> {

    const json =
      JSON.stringify(
        document,
        null,
        2
      );

    await this.sp.web
      .getFolderByServerRelativePath(
        libraryServerRelativeUrl
      )
      .files
      .addUsingPath(
        fileName,
        json,
        {
          Overwrite: false
        }
      );
  }

  /**
   * Delete a JSON document
   */
  public async deleteDocument(
    serverRelativeUrl: string
  ): Promise<void> {

    await this.sp.web
      .getFileByServerRelativePath(
        serverRelativeUrl
      )
      .delete();
  }

  /**
   * List JSON files in a library
   */
  public async listDocuments(
    libraryServerRelativeUrl: string
  ): Promise<IDocumentSummary[]> {

    const files =
      await this.sp.web
        .getFolderByServerRelativePath(
          libraryServerRelativeUrl
        )
        .files();

    return files
      .filter(
        file =>
          file.Name
            .toLowerCase()
            .endsWith('.json')
      )
      .map(file => ({
        id: file.UniqueId
          ? 0
          : 0,
        name: file.Name,
        serverRelativeUrl:
          file.ServerRelativeUrl
      }));
  }
}
