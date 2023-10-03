import qs from "qs";
import { BEARER } from "@/constant";
import { signIn } from "@/services/Auth";
import { toast } from "react-toastify";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const { user, jwt }: any = await signIn({
            email: credentials.email,
            password: credentials.password,
          });

          return { ...user, jwt };
        } catch (error) {
          toast(`Invalid User`);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }: any) => {
      if (!token?.sign_out) {
        const urlParamsObject = {
          populate: {
            contactInfo: {
              populate: "*",
            },
            socialInfo: {
              populate: {
                instagram: {
                  populate: "*",
                },
                twitter: {
                  populate: "*",
                },
                facebook: {
                  populate: "*",
                },
                linkedin: {
                  populate: "*",
                },
                youtube: {
                  populate: "*",
                },
                tiktok: {
                  populate: "*",
                },
              },
            },
            background: {
              populate: "*",
            },
            avatar: {
              populate: "*",
            },
            brand: {
              populate: "*",
            },
            categories: {
              populate: "*",
            },
          },
        };

        const queryString = qs.stringify(urlParamsObject);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/me?${queryString}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `${BEARER} ${token?.jwt}`,
            },
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (data) {
          return {
            ...session,
            user: {
              ...data,
              token: token?.jwt,
            },
          };
        }
      } else return {};
    },
    jwt: async ({ token, trigger, session, user, account }: any) => {
      const isSignIn = user ? true : false;

      if (isSignIn) {
        token.jwt = user?.jwt;
        token.sign_out = false;
      }

      if (trigger === "update") {
        if (session?.sign_out) {
          token.sign_out = true;
        } else {
          token.sign_out = false;
        }
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
