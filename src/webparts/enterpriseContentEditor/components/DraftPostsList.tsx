import {IBlogPost} from '../common/models/IBlogPost'
export interface IDraftListProps {

  posts: IBlogPost[];

  selectedPostId?: string;

  onSelect(
    post: IBlogPost
  ): void;
}