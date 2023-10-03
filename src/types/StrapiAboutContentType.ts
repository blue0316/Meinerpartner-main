import { StrapiHeader } from "./StrapiHeader";
import { StrapiImage } from "./StrapiImage";

export interface StrapiAboutContentType {
  header: StrapiHeader;
  desc: string;
  isServiceBox: string;
  ServiceMedia: Array<{ image: StrapiImage; label: string }>;
}
