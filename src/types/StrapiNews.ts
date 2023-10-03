import { StrapiImage } from "./StrapiImage";

export interface StrapiNews {
  id: number;
  attributes: {
    title: string;
    desc: string;
    image: StrapiImage;
    date: string;
    topic: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    videoLink: string;
  };
}
