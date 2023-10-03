import { StrapiSocialIcons } from "./StrapiSocialIcons";

export interface StrapiUser {
  id: number;
  slug: string;
  background: {
    url: string;
  };
  avatar: {
    url: string;
  };
  username: string;
  userRole: string;
  email: string;
  address: string;
  contactInfo: Array<{ id: number; title: string; link: string }>;
  brand: {
    url: string;
  };
  categories: Array<{
    title: string;
    slug: string;
    users_permissions_users: Array<usersPermissions>;
  }>;
  companyName: string;
  desc: string;
  socialInfo: StrapiSocialIcons;
}

interface usersPermissions {
  id: number | string;
}
