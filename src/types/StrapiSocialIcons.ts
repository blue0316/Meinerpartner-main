export interface StrapiSocialIcons {
  instagram: Icon;
  twitter: Icon;
  facebook: Icon;
  linkedin: Icon;
  youtube: Icon;
  tiktok: Icon;
}

interface Icon {
  image: {
    url: string;
  };
  link: string;
}
