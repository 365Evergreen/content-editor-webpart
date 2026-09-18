/* eslint-disable no-void */

import * as React from 'react';
import {
  SPFI
} from '@pnp/sp';
import {
  IReadonlyTheme
} from '@microsoft/sp-component-base';

import {
  BlogPostsService
} from '../common/services/BlogPostsService'

import {
  IBlogPost
} from '../common/models/IBlogPost';

import {  ContentEditorShell} from './ContentEditorShell';

import {
  DraftPostsList
} from './DraftPostsList'

export interface IBlogContentDashboardProps {

  sp: SPFI;
  siteUrl: string;
  listTitle: string;
  libraryTitle: string;
  themeVariant?: IReadonlyTheme;
}

export const BlogContentDashboard: React.FC<IBlogContentDashboardProps> = ({
  sp,
  listTitle,
  libraryTitle,
  themeVariant
}: IBlogContentDashboardProps) => {
  const service = React.useMemo(
    () => new BlogPostsService(sp, listTitle),
    [sp, listTitle]
  );

  const [posts, setPosts] = React.useState<IBlogPost[]>([]);
  const [selectedPost, setSelectedPost] = React.useState<IBlogPost | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async (): Promise<void> => {
      try {
        const result = await service.getBlogPosts();
        setPosts(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [service]);

  if (loading) {
    return <div>Loading draft posts...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Website Content Builder</h1>

      <DraftPostsList
        posts={posts}
        onOpen={setSelectedPost}
      />

      {selectedPost && (
        <div style={{ marginTop: '24px' }}>
          <h2>{selectedPost.title}</h2>

          <div>
            Post Id: {selectedPost.postId}
          </div>

          <div>
            Slug: {selectedPost.slug}
          </div>

          <div>
            Status: {selectedPost.status}
          </div>

          <ContentEditorShell
            sp={sp}
            filePath={selectedPost.contentFile}
            themeVariant={themeVariant}
          />
        </div>
      )}
    </div>
  );
};