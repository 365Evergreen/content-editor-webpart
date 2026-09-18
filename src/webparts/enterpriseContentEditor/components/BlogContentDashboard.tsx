/* eslint-disable no-void */

import * as React from 'react';

import {
  SPFI
} from '@pnp/sp';

import {
  JSONContent
} from '@tiptap/core';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow
} from '@fluentui/react-components';

import {
  IReadonlyTheme
} from '@microsoft/sp-component-base';

import {
  BlogPostsService
} from '../common/services/BlogPostsService';

import {
  SharePointDocumentService
} from '../common/services/SharePointDocumentService';

import {
  IBlogPost
} from '../common/models/IBlogPost';

import {
  ContentEditorShell
} from './ContentEditorShell';

export interface IBlogContentDashboardProps {

  sp: SPFI;

  listTitle?: string;
siteUrl?: string;
  libraryTitle: string;
filePath?: string;
  themeVariant?:
    IReadonlyTheme;
}

export const BlogContentDashboard:
React.FC<IBlogContentDashboardProps> = ({
  sp,
  filePath,
  listTitle,
  libraryTitle,
  themeVariant
}) => {

  const blogPostsService =
    React.useMemo(
      () =>
        new BlogPostsService(
          sp,
          libraryTitle
        ),
      [
        sp,
        listTitle
      ]
    );

  const documentService =
    React.useMemo(
      () =>
        new SharePointDocumentService(
          sp
        ),
      [sp]
    );

  const [
    posts,
    setPosts
  ] = React.useState<
    IBlogPost[]
  >([]);

  const [
    selectedPost,
    setSelectedPost
  ] = React.useState<
    IBlogPost | null
  >(null);

  const [
    loadedContent,
    setLoadedContent
  ] = React.useState<
    JSONContent | null
  >(null);

  const [
    loadingPosts,
    setLoadingPosts
  ] = React.useState(true);

  const [
    loadingContent,
    setLoadingContent
  ] = React.useState(false);

  React.useEffect(() => {

    const loadPosts =
      async (): Promise<void> => {

        try {

          const result =
            await blogPostsService
              .getBlogPosts();

          setPosts(
            result
          );

        } catch (error) {

          console.error(
            'Failed to load posts',
            error
          );

        } finally {

          setLoadingPosts(
            false
          );
        }
      };

    void loadPosts();

  }, [blogPostsService]);

  const openPost =
    async (
      post: IBlogPost
    ): Promise<void> => {

      if (
        !post.contentFile
      ) {

        window.alert(
          'This post does not have a content file configured.'
        );

        return;
      }

      try {

        setLoadingContent(
          true
        );

        setSelectedPost(
          post
        );

        const content =
          await documentService
            .loadContent(
              post.contentFile
            );

        setLoadedContent(
          content
        );

      } catch (error) {

        console.error(
          'Failed to load content',
          error
        );

        window.alert(
          'Failed to load content file.'
        );

      } finally {

        setLoadingContent(
          false
        );
      }
    };

  if (loadingPosts) {

    return (
      <div>
        Loading draft posts...
      </div>
    );
  }

  return (

    <div
      style={{
        padding: '20px'
      }}
    >

      <h1>
        Website Content Builder
      </h1>

      <h2>
        Draft Posts
      </h2>

      <Table>

        <TableHeader>

          <TableRow>

            <TableHeaderCell>
              Post ID
            </TableHeaderCell>

            <TableHeaderCell>
              Title
            </TableHeaderCell>

            <TableHeaderCell>
              Status
            </TableHeaderCell>

            <TableHeaderCell>
              Action
            </TableHeaderCell>

          </TableRow>

        </TableHeader>

        <TableBody>

          {
            posts.map(post => (

              <TableRow
                key={post.id}
              >

                <TableCell>
                  {post.postId}
                </TableCell>

                <TableCell>
                  {post.title}
                </TableCell>

                <TableCell>
                  {post.status}
                </TableCell>

                <TableCell>

                  <Button
                    appearance="primary"
                    onClick={() =>
                      void openPost(
                        post
                      )
                    }
                  >
                    Open
                  </Button>

                </TableCell>

              </TableRow>

            ))
          }

        </TableBody>

      </Table>

      {
        selectedPost &&
        (
          <div
            style={{
              marginTop: '24px'
            }}
          >

            <h2>
              Selected Post
            </h2>

            <div>
              Post ID:
              {' '}
              {selectedPost.postId}
            </div>

            <div>
              Title:
              {' '}
              {selectedPost.title}
            </div>

            <div>
              Slug:
              {' '}
              {selectedPost.slug}
            </div>

            <div>
              Status:
              {' '}
              {selectedPost.status}
            </div>

          </div>
        )
      }

      {
        loadingContent &&
        (
          <div
            style={{
              marginTop: '24px'
            }}
          >
            Loading content...
          </div>
        )
      }

      {
        selectedPost &&
        loadedContent &&
        (
          <div
            style={{
              marginTop: '24px'
            }}
          >

            <ContentEditorShell
              sp={sp}
              filePath={
                selectedPost.contentFile
              }
              initialContent={
                loadedContent
              }
              themeVariant={
                themeVariant
              }
            />

          </div>
        )
      }

    </div>

  );
};