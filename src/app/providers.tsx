"use client";

import { getSession } from "@/utils";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [session, setSession] = useState();

  useEffect(() => {
    isAuthenticatedHandler();
  }, []);

  const isAuthenticatedHandler = async () => {
    const data: any = await getSession();
    setSession(data?.session?.user);
  };

  useEffect(() => {
    const temp: any = session;
    // check if the error has occurred
    if (temp?.error === "invalid-version") {
      // Sign out here
      signOut({ redirect: false }).then(() => {
        router.push("/signin");
      });
    }
  }, [session, router]);

  return <SessionProvider>{children}</SessionProvider>;
};
