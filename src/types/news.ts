export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  featuredImage: string;
  content: unknown;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
