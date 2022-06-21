export interface IAuthor {
  _id?: string
  name: string
  slug: string
  bio: string
  avatar: string
  website?: string
  githubUrl?: string
  twitterUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
  createdAt?: string
  updatedAt?: string
}

export interface ICategory {
  name: string
  slug: string
}

export interface IPost {
  _id?: string
  author: IAuthor | string
  slug: string
  title: string
  excerpt: string
  featuredImage: string
  content: any
  categories: ICategory[] | string[]
  createdAt?: string
  updatedAt?: string
}
