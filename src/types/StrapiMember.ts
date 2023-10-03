import { StrapiImage } from "./StrapiImage";

export interface StrapiMember {
  slug: string;
  avatar: StrapiImage;
  title: string;
  email: string;
}
