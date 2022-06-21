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
