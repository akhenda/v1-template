import { allPosts } from 'content-collections';

export const blog = {
  postsQuery: null,
  latestPostQuery: null,
  postQuery: (_slug: string) => null,
  getPosts: async () => allPosts,
  getLatestPost: async () =>
    allPosts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).at(0),
  getPost: async (slug: string) => allPosts.find(({ _meta }) => _meta.path === slug),
};
