import { StrapiImage } from "./StrapiImage";

export interface StrapiService {
  id: number;
  title: string;
  desc: string;
  image: StrapiImage;
}
