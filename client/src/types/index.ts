export interface IAuthor {
  bio: string
  name: string
  id: string
  twitterUsername: string
  linkedinUsername: string
  instagramUsername: string
  githubUsername: string
  portfolioUrl?: string
  photo: {
    url: string
  }
}

export interface ICategory {
  name: string
  slug: string
}

export interface IPost {
  author: IAuthor
  createdAt: string
  slug: string
  title: string
  excerpt: string
  featuredImage: string
  content: any
  categories: ICategory[]
}
