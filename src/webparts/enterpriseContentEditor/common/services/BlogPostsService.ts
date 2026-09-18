 
import { SPFI } from '@pnp/sp';

import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

import {
  IBlogPost
} from '../models/IBlogPost';

export class BlogPostsService {

  constructor(
    private readonly sp: SPFI,
    private readonly listTitle: string
  ) {}

  public async getBlogPosts():
    Promise<IBlogPost[]> {

    const items =
      await this.sp.web.lists
        .getByTitle(
          this.listTitle
        )
        .items
        .select(
          'Id',
          'Title',
          'Created',
          'Modified',

          'e365_BlogPostId',
          'e365_BlogPostSlug',
          'e365_BlogPostStatus',
          'e365_BlogPostContent',

          'e365_ContentAuthor/Title',
          'e365_ContentApprover/Title'
        )
        .expand(
          'e365_ContentAuthor',
          'e365_ContentApprover'
        )();

    return items.map(item => ({
      id: item.Id,
      title: item.Title ?? '',
      postId: item.e365_BlogPostId ?? '',
      slug: item.e365_BlogPostSlug ?? '',
      status: item.e365_BlogPostStatus ?? '',
      contentFile:
        item.e365_BlogPostContent ?? '',
      created: item.Created,
      modified: item.Modified,
      author:
        item.e365_ContentAuthor?.Title,
      approver:
        item.e365_ContentApprover?.Title
    }));
  }
}