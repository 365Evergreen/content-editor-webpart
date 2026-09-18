export interface IBlogPost {

  id: number;

  title: string;

  postId: string;

  slug: string;

  status: string;

  contentFile: string;

  created: string;

  modified: string;

  author?: string;

  approver?: string;
}