import { SPFI } from '@pnp/sp';

import '@pnp/sp/webs';
import '@pnp/sp/files';

import type {
  JSONContent
} from '@tiptap/core';

export class SharePointDocumentService {

  constructor(
    private readonly sp: SPFI
  ) {}

  public async loadContent(
    fileUrl: string
  ): Promise<JSONContent> {

    const json =
      await this.sp.web
        .getFileByServerRelativePath(
          fileUrl
        )
        .getText();

    return JSON.parse(
      json
    ) as JSONContent;
  }

  public async saveContent(
    fileUrl: string,
    content: JSONContent
  ): Promise<void> {

    await this.sp.web
      .getFileByServerRelativePath(
        fileUrl
      )
      .setContent(
        JSON.stringify(
          content,
          null,
          2
        )
      );
  }
}