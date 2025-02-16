export interface CardProps {
  alt_description: string;
  blur_hash: string;
  breadcrumbs: [];
  color: string;
  created_at: string;
  current_user_collections: [];
  description: string;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  promoted_at?: string;
  slug: string;
  sponsorship?: string;
  updated_at: string;
  width: number;
}

export interface PageProps {
  params: Promise<{ page: string }>;
}
