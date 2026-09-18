import * as React from 'react';

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
  IBlogPost
} from '../common/models/IBlogPost';

export interface IDraftPostsListProps {

  posts: IBlogPost[];

  onOpen(
    post: IBlogPost
  ): void;
}

export const DraftPostsList:
React.FC<IDraftPostsListProps> = ({
  posts,
  onOpen
}) => {

  return (

    <Table>

      <TableHeader>

        <TableRow>

          <TableHeaderCell>
            Post Id
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
                    onOpen(post)
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

  );
};