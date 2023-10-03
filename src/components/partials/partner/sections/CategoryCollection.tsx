"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { StrapiMenuItem } from "@/types/StrapiMenu";
import { StrapiUser } from "@/types/StrapiUser";

import { getStrapiData } from "@/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "@/components/common/Button";
import ALink from "@/components/common/ALink";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategoryCollectionProps {
  fields: {
    title: string;
    desc: string;
    menu: Array<StrapiMenuItem>;
  };
}

const StyledHeading = styled("div")`
  max-width: 653px;

  h1 {
    strong {
      color: #d4ba77;
    }
  }
`;

const CategoryCollection = ({ fields }: CategoryCollectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [data, setData] = useState<Array<StrapiUser>>([]);
  const [categories, setCategories] = useState<Array<any>>([]);

  useEffect(() => {
    fetchData();
    getUserCategories();
  }, []);

  const getUserCategories = async () => {
    try {
      const categoriesResp = await getStrapiData(
        `categories?populate=*`,
        false
      );
      setCategories(categoriesResp?.data);
    } catch {
      console.error(Error);
    }
  };

  const fetchData = async () => {
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

    const users = await getStrapiData("users", urlParamsObject);

    setData(users);
  };

  const handleFilter = (item: string) => {
    const current = new URLSearchParams(searchParams);

    if (search) {
      let temp = search;

      if (search?.split(",").find((value) => value == item)) {
        temp = search
          ?.split(",")
          .filter((value) => value !== item)
          .toString();

        if (search?.split(",").length == 1) {
          current.delete("search");
        } else {
          current.set("search", temp);
        }
      } else {
        temp = search + "," + item;
        current.set("search", temp);
      }
    } else {
      current.set("search", item);
    }

    router.push(pathname + "?" + current);
  };

  return (
    <section className="relative md:-mt-32">
      <div className="heading bg-grey-100 py-10">
        <div className="container">
          <StyledHeading className="mb-10">
            <h1 className={`title text-3xl font-bold leading-tight mb-2`}>
              <ReactMarkdown>{fields?.title}</ReactMarkdown>
            </h1>

            <p className="text-lg">{fields?.desc}</p>
          </StyledHeading>

          <ul className="pl-0 flex flex-wrap">
            <li className="mb-4 mr-4">
              <button
                type="button"
                className={`flex items-center justify-center h-10 px-5 border border-grey-200 rounded-lg hover:bg-primary hover:text-white transition-all ${
                  !search ? "bg-primary text-white" : "bg-white"
                }`}
                onClick={() => {
                  router.push(pathname);
                }}
              >
                Alle
              </button>
            </li>

            {categories.length > 0
              ? categories?.map((item, index) => (
                  <li className="mb-4 mr-4" key={index}>
                    <button
                      type="button"
                      className={`flex items-center justify-center h-10 px-5 border border-grey-200 rounded-lg hover:bg-primary hover:text-white transition-all ${
                        search
                          ?.split(",")
                          .find(
                            (value) =>
                              value ==
                                item?.attributes?.slug.replace(" ", "") ||
                              item?.attributes?.slug
                                ?.replace(" ", "")
                                .indexOf(value) > -1
                          )
                          ? "bg-primary text-white"
                          : "bg-white"
                      }`}
                      onClick={() => {
                        handleFilter(item?.attributes?.slug?.replace(" ", ""));
                      }}
                    >
                      {item?.attributes?.title}
                    </button>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>

      <div className="container">
        {data.length > 0 ? (
          <div className="grid grid-flex-row grid-cols-12 sm:gap-x-5 gap-y-5 py-10 min-w-[250px] overflow-hideen">
            {(!search
              ? data
              : data?.filter((item) =>
                  search
                    ?.split(",")
                    ?.find((filterItem) =>
                      filterItem.split("&").length > 1
                        ? item?.categories?.find(
                            (cat) => cat.slug == filterItem.split("&")[0]
                          ) &&
                          item?.categories?.find(
                            (cat) => cat.slug == filterItem.split("&")[1]
                          )
                        : item?.categories?.find(
                            (cat) => cat.slug == filterItem
                          )
                    )
                )
            )?.map((user, index) => (
              <div
                className={`hover:z-20 col-span-6 lg:col-span-4 xl:col-span-3`}
                key={index}
              >
                <div className="group user relative">
                  <button
                    type="button"
                    className="w-full relative pt-[150px] lazy-load"
                  >
                    <LazyLoadImage
                      wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
                      className="object-contain h-full"
                      src={`${user?.brand?.url}`}
                      effect="black-and-white"
                      width="100%"
                      height="100%"
                      alt="home"
                    />

                    <div className="bg-overlay absolute top-0 left-0 w-full h-full rounded-md"></div>
                  </button>

                  <div
                    className={`p-7 lg:right-auto lg:left-0 lg:top-0 2xl:-left-7 2xl:-top-7 bg-white rounded-xl z-10 user-details absolute w-[300px] lg:w-full 2xl:w-[400px] shadow-2xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all ${
                      index % 2 == 0
                        ? "top-0 -left-[99999px] group-hover:left-0 group-hover:2xl:-left-7"
                        : "group-hover:right-0 -right-[99999px] top-0"
                    }`}
                  >
                    <div className="max-w-[325px] w-full relative pt-[150px] lazy-load mb-4">
                      <LazyLoadImage
                        wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
                        className="object-contain h-full"
                        src={`${user?.brand?.url}`}
                        effect="black-and-white"
                        width="100%"
                        height="100%"
                        alt="home"
                      />

                      <div className="bg-overlay absolute top-0 left-0 w-full h-full rounded-md"></div>
                    </div>

                    <h4 className="inline-block relative subtitle text-3xl font-bold pb-1">
                      {user?.companyName}
                      <span className="absolute left-0 md:right-auto mr-auto right-0 top-full divider inline-block h-1 w-16 bg-black rounded-md"></span>
                    </h4>

                    <div className="my-5">
                      <ReactMarkdown>{user?.address}</ReactMarkdown>
                    </div>

                    <ul className="pl-0 space-y-2">
                      <li>
                        <a
                          href={`mailto:${user?.email}`}
                          className="flex items-center space-x-3"
                        >
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.9977 29.9851C23.2213 29.9851 30 23.1983 30 14.9925C30 6.77643 23.2109 0 14.9874 0C6.77877 0 0 6.77643 0 14.9925C0 23.1983 6.78906 29.9851 14.9977 29.9851ZM14.9977 28.0463C7.76348 28.0463 1.9498 22.2243 1.9498 14.9925C1.9498 7.7608 7.75313 1.93418 14.9874 1.93418C22.2216 1.93418 28.0605 7.7608 28.0605 14.9925C28.0605 22.2243 22.2319 28.0463 14.9977 28.0463ZM12.2151 15.0353L6.96809 9.80603C6.8794 9.95445 6.82526 10.3132 6.82526 10.8271V19.144C6.82526 19.6569 6.88406 20.0352 7.02113 20.2228L12.2151 15.0353ZM15.0209 15.896C15.2844 15.896 15.5859 15.7878 15.8562 15.513L22.4233 8.95274C22.2336 8.78008 21.786 8.63631 21.1394 8.63631H8.88166C8.23045 8.63631 7.79319 8.78008 7.60809 8.95274L14.166 15.513C14.4512 15.7981 14.7528 15.896 15.0209 15.896ZM17.7436 15.0353L22.9422 20.2228C23.0747 20.0352 23.1485 19.6569 23.1485 19.144V10.8271C23.1485 10.3132 23.0794 9.95445 22.9907 9.80603L17.7436 15.0353ZM15.0106 16.8823C14.4907 16.8823 14.0582 16.6926 13.5548 16.225L13.0068 15.7174L7.65654 21.0462C7.84991 21.2292 8.25471 21.3245 8.88166 21.3245H21.1291C21.7618 21.3245 22.1609 21.2292 22.345 21.0462L17.0144 15.7174L16.457 16.225C15.9433 16.6926 15.5257 16.8823 15.0106 16.8823Z"
                              fill="black"
                              fillOpacity="0.85"
                            />
                          </svg>
                          <span>{user?.email}</span>
                        </a>
                      </li>

                      {user?.contactInfo?.map((item, index) => (
                        <li key={index}>
                          {item?.title == "phone" ? (
                            <a
                              href={`tel:${item.link}`}
                              className="flex items-center space-x-3"
                            >
                              <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.9977 29.9851C23.2213 29.9851 30 23.1983 30 14.9925C30 6.77643 23.2109 0 14.9874 0C6.77877 0 0 6.77643 0 14.9925C0 23.1983 6.78906 29.9851 14.9977 29.9851ZM14.9977 28.0462C7.76348 28.0462 1.9498 22.2243 1.9498 14.9925C1.9498 7.7608 7.75313 1.93418 14.9874 1.93418C22.2216 1.93418 28.0605 7.7608 28.0605 14.9925C28.0605 22.2243 22.2319 28.0462 14.9977 28.0462ZM11.1729 18.5739C14.6107 22.0208 19.191 24.3212 21.883 21.6404C21.9692 21.5496 22.0208 21.4831 22.0817 21.4016C22.8762 20.5605 23.0232 19.6146 22.2578 18.9558C21.7507 18.5737 21.1617 18.171 19.457 16.9992C18.6778 16.4512 18.0678 16.5219 17.3439 17.2317L16.7226 17.8378C16.5534 18.0069 16.2729 18.0012 16.0693 17.877C15.5448 17.5723 14.6265 16.8836 13.7428 16.0002C12.8693 15.127 12.1552 14.1771 11.87 13.6838C11.7607 13.4962 11.7287 13.2549 11.9092 13.0652L12.5156 12.4049C13.2209 11.6514 13.287 11.0623 12.7285 10.2776L10.8336 7.58857C10.1731 6.65562 9.21455 7.06206 8.31001 7.688C8.23057 7.74776 8.17079 7.81217 8.11095 7.87199C5.41783 10.5539 7.72116 15.1233 11.1729 18.5739Z"
                                  fill="black"
                                  fillOpacity="0.85"
                                />
                              </svg>

                              <span>{item.link}</span>
                            </a>
                          ) : (
                            <a
                              href={`${item.link}`}
                              className="flex items-center space-x-3"
                              target="_blank"
                            >
                              {item?.title == "website" && (
                                <svg
                                  className="mx-[2px]"
                                  width="25"
                                  height="25"
                                  viewBox="0 0 25 25"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12.4981 24.4946C15.8078 24.4946 18.6635 19.5524 18.6635 12.5187C18.6635 5.46303 15.8164 0.520827 12.4981 0.520827C9.1836 0.520827 6.33257 5.46303 6.33257 12.5187C6.33257 19.5524 9.19223 24.4946 12.4981 24.4946ZM12.4981 1.68831C15.0641 1.68831 17.3337 6.59291 17.3337 12.5187C17.3337 18.2753 15.0641 23.3186 12.4981 23.3186C9.9359 23.3186 7.66246 18.2753 7.66246 12.5187C7.66246 6.59291 9.9359 1.68831 12.4981 1.68831ZM11.8581 0.702952V24.2541H13.1506V0.702952H11.8581ZM12.4981 17.4749C8.71795 17.4749 5.41255 18.4454 3.66026 19.9558L4.65231 20.7734C6.33972 19.4886 9.04206 18.7708 12.4981 18.7708C15.9541 18.7708 18.6603 19.4886 20.3438 20.7734L21.3398 19.9558C19.5875 18.4454 16.2821 17.4749 12.4981 17.4749ZM24.081 11.8415H0.919024V13.1374H24.081V11.8415ZM12.4981 7.57098C16.2821 7.57098 19.5875 6.60449 21.3398 5.09405L20.3438 4.27637C18.6603 5.55258 15.9541 6.27896 12.4981 6.27896C9.04206 6.27896 6.33972 5.55258 4.65231 4.27637L3.66026 5.09405C5.41255 6.60449 8.71795 7.57098 12.4981 7.57098ZM12.4981 24.9875C19.3511 24.9875 25 19.3319 25 12.4938C25 5.64702 19.3425 0 12.4895 0C5.64897 0 0 5.64702 0 12.4938C0 19.3319 5.65755 24.9875 12.4981 24.9875ZM12.4981 23.6525C6.37882 23.6525 1.33548 18.6109 1.33548 12.4938C1.33548 6.37662 6.37024 1.33502 12.4895 1.33502C18.6087 1.33502 23.6645 6.37662 23.6645 12.4938C23.6645 18.6109 18.6174 23.6525 12.4981 23.6525Z"
                                    fill="black"
                                    fillOpacity="0.85"
                                  />
                                </svg>
                              )}

                              <span>{item.link}</span>
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>

                    <ul className="flex items-center flex-wrap mt-6 space-x-2">
                      {user?.socialInfo?.instagram && (
                        <li>
                          <a
                            href={user?.socialInfo?.instagram?.link}
                            target="_blank"
                          >
                            <img
                              src={`${
                                user?.socialInfo?.instagram?.image
                                  ? user?.socialInfo?.instagram?.image?.url
                                  : "/assets/images/icons/instagram.png"
                              }`}
                              width={30}
                              height={30}
                              alt="social icon"
                            />
                          </a>
                        </li>
                      )}

                      {user?.socialInfo?.facebook && (
                        <li>
                          <a
                            href={user?.socialInfo?.facebook?.link}
                            target="_blank"
                          >
                            <img
                              src={`${
                                user?.socialInfo?.facebook?.image
                                  ? user?.socialInfo?.facebook?.image?.url
                                  : "/assets/images/icons/facebook.png"
                              }`}
                              width={30}
                              height={30}
                              alt="social icon"
                            />
                          </a>
                        </li>
                      )}

                      {user?.socialInfo?.twitter && (
                        <li>
                          <a
                            href={user?.socialInfo?.twitter?.link}
                            target="_blank"
                          >
                            <img
                              src={`${
                                user?.socialInfo?.twitter?.image
                                  ? user?.socialInfo?.twitter?.image?.url
                                  : "/assets/images/icons/twitter.png"
                              }`}
                              width={30}
                              height={30}
                              alt="social icon"
                            />
                          </a>
                        </li>
                      )}

                      {user?.socialInfo?.linkedin && (
                        <li>
                          <a
                            href={user?.socialInfo?.linkedin?.link}
                            target="_blank"
                          >
                            <img
                              src={`${
                                user?.socialInfo?.linkedin?.image
                                  ? user?.socialInfo?.linkedin?.image?.url
                                  : "/assets/images/icons/linkedin.png"
                              }`}
                              width={30}
                              height={30}
                              alt="social icon"
                            />
                          </a>
                        </li>
                      )}

                      {user?.socialInfo?.youtube && (
                        <li>
                          <a
                            href={user?.socialInfo?.youtube?.link}
                            target="_blank"
                          >
                            <img
                              src={`${
                                user?.socialInfo?.youtube?.image
                                  ? user?.socialInfo?.youtube?.image?.url
                                  : "/assets/images/icons/youtube.png"
                              }`}
                              width={30}
                              height={30}
                              alt="social icon"
                            />
                          </a>
                        </li>
                      )}

                      {user?.socialInfo?.tiktok && (
                        <li>
                          <a
                            href={user?.socialInfo?.tiktok?.link}
                            target="_blank"
                          >
                            <img
                              src={`${
                                user?.socialInfo?.tiktok?.image
                                  ? user?.socialInfo?.tiktok?.image?.url
                                  : "/assets/images/icons/tiktok.png"
                              }`}
                              width={30}
                              height={30}
                              alt="social icon"
                            />
                          </a>
                        </li>
                      )}
                    </ul>

                    <div className="flex items-center space-x-2 text-primary mt-4">
                      <ALink
                        href={`/partners/${user.slug}${
                          search ? `?search=${search}` : ""
                        }`}
                        className="inline-block text-base leading-loose font-bold text-center py-4 after:content-[''] after:block after:w-[70%] after:h-[2px] after:bg-primary"
                      >
                        Mehr anzeigen
                      </ALink>
                      <svg
                        width="25"
                        height="27"
                        viewBox="0 0 25 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.32 22.794C15.1235 22.9945 14.8604 23.1055 14.5873 23.103C14.3142 23.1005 14.0529 22.9847 13.8598 22.7806C13.6666 22.5765 13.5571 22.3004 13.5547 22.0118C13.5523 21.7232 13.6573 21.4451 13.8471 21.2375L20.4023 14.3102L2.08354 14.3102C1.80727 14.3102 1.54232 14.1942 1.34697 13.9878C1.15162 13.7814 1.04187 13.5014 1.04187 13.2094C1.04187 12.9175 1.15162 12.6375 1.34697 12.431C1.54232 12.2246 1.80727 12.1086 2.08354 12.1086L20.4023 12.1086L13.8471 5.18135C13.6573 4.97374 13.5523 4.69568 13.5547 4.40705C13.5571 4.11843 13.6666 3.84234 13.8598 3.63824C14.0529 3.43414 14.3142 3.31838 14.5873 3.31587C14.8604 3.31336 15.1235 3.42431 15.32 3.62483L23.6533 12.4312C23.7498 12.5336 23.8263 12.6552 23.8783 12.7889C23.9313 12.9221 23.9585 13.065 23.9585 13.2094C23.9585 13.3538 23.9313 13.4968 23.8783 13.6299C23.8263 13.7636 23.7498 13.8852 23.6533 13.9877L15.32 22.794Z"
                          fill="#D4BA77"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[400px] rouned-md flex items-center justify-center">
            <div
              className="inline-block h-12 w-12 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryCollection;
