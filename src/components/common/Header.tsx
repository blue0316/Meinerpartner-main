"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Import Custom Compnents
import ALink from "./ALink";
import MobileMenu from "./MobileMenu";

// Import Utils
import { getStrapiData } from "@/utils";

// Import Types
import { StrapiImage } from "@/types/StrapiImage";
import { StrapiButton } from "@/types/StrapiButton";
import { useAuthContext } from "../context/AuthContext";
import { signOut, useSession } from "next-auth/react";

interface HeaderType {
  logo: StrapiImage;
  mainMenu: Array<{
    title: string;
    link: string;
  }>;
  button: StrapiButton;
}

const Header = () => {
  const pathname = usePathname();
  const { update: sessionUpdate } = useSession();
  const [data, setData] = useState<HeaderType>();
  const [isTransparent, setIsTransparent] = useState<boolean>(false);
  const PageUrlsWithSingleHeader = ["/partner", "/news", "/dashboard"];
  const router = useRouter();
  const { user, isLoading, setUser } = useAuthContext();

  const handleLogout = async () => {
    sessionUpdate({ info: "sign" });

    await signOut({ redirect: false }).then(() => {
      router.push("/signin");
    });

    await handleUpdate();
    setUser(undefined);
  };

  const handleUpdate = async () => {
    sessionUpdate({ sign_out: true });
  };

  useEffect(() => {
    fetchHeaderData();
  }, []);

  useEffect(() => {
    if (PageUrlsWithSingleHeader.find((url) => pathname.indexOf(url) > -1)) {
      setIsTransparent(true);
    } else {
      setIsTransparent(false);
    }
  }, [pathname]);

  const fetchHeaderData = async () => {
    const urlParamsObject = {
      populate: "*",
    };

    const HeaderData = await getStrapiData("header", urlParamsObject);
    setData(HeaderData?.data.attributes);
  };

  const openMobileSidebar = () => {
    if (document.querySelector("body.open-mobile-menu")) {
      document.querySelector("body")?.classList.remove("open-mobile-menu");
    } else {
      document.querySelector("body")?.classList.add("open-mobile-menu");
    }
  };

  return (
    <>
      <header className="relative z-40">
        <div
          className={`header-middle absolute top-0 w-full py-7 lg:py-10  ${
            isTransparent ? "bg-transparent" : "bg-white"
          }`}
        >
          <div className="container flex items-center justify-between">
            <div className="header-left">
              {isTransparent ? (
                <ALink href="/">
                  <img
                    src="/assets/images/logo-white.svg"
                    width={280}
                    height={52}
                    alt="logo"
                  />
                </ALink>
              ) : (
                <ALink
                  href="/"
                  className="logo relative flex justify-center pt-[41px] xl:pt-[51px] w-[220px] sm:w-[240px] xl:w-[300px] lazy-load"
                >
                  <LazyLoadImage
                    wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
                    className="object-contain"
                    src={data?.logo?.data?.attributes?.url}
                    effect="black-and-white"
                    width="100%"
                    height="100%"
                    alt="home"
                  />

                  <div className="bg-overlay absolute top-0 left-0 w-full h-full rounded-md z-10"></div>
                </ALink>
              )}
            </div>

            <div className="header-right flex items-center space-x-5 xl:space-x-7">
              <ul className="hidden lg:flex items-center space-x-7 list-none pl-0 m-0 font-semibold text-base xl:text-lg">
                {data?.mainMenu?.map((item: any, index: number) => (
                  <li
                    key={index}
                    className={`${
                      pathname?.indexOf(item.link) > -1 ? "text-primary" : ""
                    } hover:text-primary ${
                      isTransparent
                        ? pathname?.indexOf(item.link) > -1
                          ? "text-primary"
                          : "text-white"
                        : ""
                    }`}
                  >
                    <ALink href={`${item.link}`}>{item.title}</ALink>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="flex lg:hidden items-center space-x-3"
                onClick={() => openMobileSidebar()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  width="30px"
                  height="30px"
                  fill={isTransparent ? "#fff" : "#000"}
                >
                  <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z" />
                </svg>
              </button>

              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                  }}
                  className="border-2 border-primary hover:bg-primary hover:text-white lg:px-5 xl:px-7 lg:py-2 xl:py-3 rounded-[45px] font-semibold text-base xl:text-lg transition-all w-[45px] h-[45px] lg:w-auto lg:h-auto flex items-center justify-center"
                >
                  <span
                    className={`hidden lg:block ${
                      isTransparent ? "text-white" : ""
                    }`}
                  >
                    Sign Out
                  </span>
                  <svg
                    className="scale-[.3] lg:hidden absolute"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    id="user"
                    fill={isTransparent ? "#fff" : "#000"}
                  >
                    <path d="M59.3 52.2C65.8 48.2 70 40.3 70 33c0-10.4-8.5-22-20-22S30 22.6 30 33c0 7.3 4.2 15.2 10.7 19.2C25.3 56.3 14 70.4 14 87c0 1.1.9 2 2 2h68c1.1 0 2-.9 2-2 0-16.6-11.3-30.7-26.7-34.8zM34 33c0-10.3 8.5-18 16-18s16 7.7 16 18-8.5 18-16 18-16-7.7-16-18zM18.1 85c1-16.7 15-30 31.9-30s30.9 13.3 31.9 30H18.1z" />
                  </svg>
                </button>
              ) : (
                <ALink
                  href="/signin"
                  className="border-2 border-primary hover:bg-primary hover:text-white lg:px-5 xl:px-7 lg:py-2 xl:py-3 rounded-[45px] font-semibold text-base xl:text-lg transition-all w-[45px] h-[45px] lg:w-auto lg:h-auto flex items-center justify-center"
                >
                  <span
                    className={`hidden lg:block ${
                      isTransparent ? "text-white" : ""
                    }`}
                  >
                    Partner Login
                  </span>
                  <svg
                    className="scale-[.3] lg:hidden absolute"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    id="user"
                  >
                    <path d="M59.3 52.2C65.8 48.2 70 40.3 70 33c0-10.4-8.5-22-20-22S30 22.6 30 33c0 7.3 4.2 15.2 10.7 19.2C25.3 56.3 14 70.4 14 87c0 1.1.9 2 2 2h68c1.1 0 2-.9 2-2 0-16.6-11.3-30.7-26.7-34.8zM34 33c0-10.3 8.5-18 16-18s16 7.7 16 18-8.5 18-16 18-16-7.7-16-18zM18.1 85c1-16.7 15-30 31.9-30s30.9 13.3 31.9 30H18.1z" />
                  </svg>
                </ALink>
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileMenu menu={data?.mainMenu ? data?.mainMenu : []} />
    </>
  );
};

export default React.memo(Header);
