export interface StrapiImage {
  data: StrapiImageAttribute;
}

interface StrapiImageAttribute {
  attributes: Image;
}

interface Image {
  width: string;
  height: string;
  url: string;
}
