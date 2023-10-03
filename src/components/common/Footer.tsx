"use client";

import React, { useEffect, useState } from "react";

// Import Custom Compnents
import ALink from "./ALink";

// Import Types
import { StrapiImage } from "@/types/StrapiImage";
import { StrapiMenu, StrapiMenuItem } from "@/types/StrapiMenu";

// Import Utils
import { getStrapiData } from "@/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface FooterType {
  logo: StrapiImage;
  email: string;
  menu: Array<StrapiMenu>;
  copyright: string;
  footerBottomMenu: Array<StrapiMenuItem>;
}

const Footer = () => {
  const [data, setData] = useState<FooterType>();

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    const urlParamsObject = {
      populate: {
        menu: {
          populate: "*",
        },
        logo: {
          populate: "*",
        },
        footerBottomMenu: {
          populate: "*",
        },
      },
    };

    const FooterData = await getStrapiData("footer", urlParamsObject);
    setData(FooterData?.data?.attributes);
  };

  return (
    <footer className="footer bg-primary">
      <div className="container">
        <div className="footer-middle py-20">
          <div className="grid grid-flex-row grid-cols-12 gap-y-5 lg:gap-y-0 sm:gap-x-8">
            <div className="col-span-12 md:col-span-6 lg:col-span-7">
              <div className="logo relative flex justify-center pt-[37px] w-[300px] lazy-load">
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
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-5">
              <div className="icon flex items-center mb-2">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_185_14605)">
                    <path
                      d="M14.9977 29.9851C23.2213 29.9851 30 23.1983 30 14.9925C30 6.77643 23.2109 0 14.9874 0C6.77877 0 0 6.77643 0 14.9925C0 23.1983 6.78906 29.9851 14.9977 29.9851ZM14.9977 28.0463C7.76348 28.0463 1.9498 22.2243 1.9498 14.9925C1.9498 7.7608 7.75313 1.93418 14.9874 1.93418C22.2216 1.93418 28.0605 7.7608 28.0605 14.9925C28.0605 22.2243 22.2319 28.0463 14.9977 28.0463ZM12.2151 15.0353L6.96809 9.80603C6.8794 9.95445 6.82526 10.3132 6.82526 10.8271V19.144C6.82526 19.6569 6.88406 20.0352 7.02113 20.2228L12.2151 15.0353ZM15.0209 15.896C15.2844 15.896 15.5859 15.7878 15.8562 15.513L22.4233 8.95274C22.2336 8.78008 21.786 8.63631 21.1394 8.63631H8.88166C8.23045 8.63631 7.79319 8.78008 7.60809 8.95274L14.166 15.513C14.4512 15.7981 14.7528 15.896 15.0209 15.896ZM17.7436 15.0353L22.9422 20.2228C23.0747 20.0352 23.1485 19.6569 23.1485 19.144V10.8271C23.1485 10.3132 23.0794 9.95445 22.9907 9.80603L17.7436 15.0353ZM15.0106 16.8823C14.4907 16.8823 14.0582 16.6926 13.5548 16.225L13.0068 15.7174L7.65654 21.0462C7.84991 21.2292 8.25471 21.3245 8.88166 21.3245H21.1291C21.7618 21.3245 22.1609 21.2292 22.345 21.0462L17.0144 15.7174L16.457 16.225C15.9433 16.6926 15.5257 16.8823 15.0106 16.8823Z"
                      fill="white"
                      fillOpacity="0.85"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_185_14605">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <p className="text-base text-white ml-2">{data?.email}</p>
              </div>

              <span className="divider inline-block h-1 w-14 bg-white"></span>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-7">
              <ul className="text-base pl-0 list-none text-white space-y-2">
                {data?.menu[0].menuItem?.map(
                  (item: StrapiMenuItem, index: number) => (
                    <li key={index}>
                      <ALink href={item.link}>{item.title}</ALink>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-5">
              <div className="grid grid-flex-row grid-cols-12 gap-y-8 sm:gap-y-8">
                {data?.menu?.map(
                  (items, index: number) =>
                    index > 0 && (
                      <div className="col-span-12 sm:col-span-4" key={index}>
                        <ul className="text-base pl-0 list-none text-white space-y-2">
                          {items?.menuItem?.map(
                            (item: StrapiMenuItem, index: number) => (
                              <li key={index}>
                                <ALink href={item.link}>{item.title}</ALink>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom bg-[#E8D29A] py-7">
        <div className="container flex items-center md:flex-row flex-col justify-between">
          <div className="footer-left text-white text-center md:text-left">
            <p>{data?.copyright}</p>
          </div>
          <div className="footer-right">
            <ul className="text-base text-white pl-0 flex items-center space-x-5">
              {data?.footerBottomMenu?.map((item, index) => (
                <li key={index}>
                  <ALink href={item.link}>{item.title}</ALink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
