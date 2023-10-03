import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: {
    id: 1,
    slug: "",
    background: {
      url: "",
    },
    avatar: {
      url: "",
    },
    username: "",
    userRole: "",
    email: "",
    address: "",
    contactInfo: [
      {
        id: 0,
        title: "",
        link: "",
      },
    ],
    brand: {
      url: "",
    },
    categories: [
      {
        title: "",
        slug: "",
        users_permissions_users: [
          {
            id: "",
          },
        ],
      },
    ],
    companyName: "",
    desc: "",
    socialInfo: {
      instagram: {
        image: {
          url: "",
        },
        link: "",
      },
      twitter: {
        image: {
          url: "",
        },
        link: "",
      },
      facebook: {
        image: {
          url: "",
        },
        link: "",
      },
      linkedin: {
        image: {
          url: "",
        },
        link: "",
      },
      youtube: {
        image: {
          url: "",
        },
        link: "",
      },
      tiktok: {
        image: {
          url: "",
        },
        link: "",
      },
    },
  },
  isLoading: false,
  setUser: (value: any) => {},
});

export const useAuthContext = () => useContext(AuthContext);
