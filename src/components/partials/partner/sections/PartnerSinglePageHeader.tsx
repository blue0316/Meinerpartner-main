"use client";

import ReactMarkdown from "react-markdown";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Import Utils
import { StrapiUser } from "@/types/StrapiUser";
import ALink from "@/components/common/ALink";
import styled from "styled-components";
import { usePathname, useSearchParams } from "next/navigation";

interface PageHeaderProps {
  user: StrapiUser;
}

const StyledDesc = styled("div")`
  p {
    margin-bottom: 1rem;
  }
`;

const PartnerSinglePageHeader = ({ user }: PageHeaderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  return (
    <section className="relative  overflow-y-hidden bg-grey-100">
      <div className="flex items-center">
        <div className="relative bg-grey-100 w-full pt-[27%] min-h-[510px] lazy-load">
          <LazyLoadImage
            wrapperClassName="absolute top-0 left-0 z-10 overflow-hidden"
            className="object-cover h-full"
            src={`${
              user?.background
                ? user?.background?.url
                : pathname.indexOf("partners/") > -1
                ? "/assets/images/single-user-header.png"
                : "/assets/images/single-page-header.png"
            }`}
            effect="black-and-white"
            width="100%"
            height="100%"
            alt="home"
          />

          <img
            className="absolute top-6 w-full z-20"
            src="/assets/images/bottom.svg"
            width="100%"
            height="50"
            alt="bottom"
          />

          <div className="bg-overlay bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full z-10"></div>
        </div>

        <div className="absolute top-60 w-full left-0  z-20 ml-auto">
          <div className="w-full md:w-auto md:max-w-[1000px] mx-auto px-5">
            <div className="p-10 shadow-2xl bg-white rounded-lg lg:max-w-[411px] ml-auto">
              <div className="max-w-[198px] mx-auto rounded-full overflow-hidden mb-4">
                <div className="w-full relative pt-[100%] lazy-load">
                  <LazyLoadImage
                    wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
                    className="object-cover h-full"
                    src={`${user?.avatar?.url}`}
                    effect="black-and-white"
                    width="100%"
                    height="100%"
                    alt="home"
                  />

                  <div className="bg-overlay absolute top-0 left-0 w-full h-full rounded-md"></div>
                </div>
              </div>

              <p>{user?.userRole}</p>

              <h4 className="inline-block relative subtitle text-3xl font-bold pb-1">
                {user?.username}
                <span className="absolute left-0 md:right-auto mr-auto right-0 top-full divider inline-block h-1 w-[70%] bg-black rounded-md"></span>
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
                    <a href={user?.socialInfo?.instagram?.link} target="_blank">
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
                    <a href={user?.socialInfo?.facebook?.link} target="_blank">
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
                    <a href={user?.socialInfo?.twitter?.link} target="_blank">
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
                    <a href={user?.socialInfo?.linkedin?.link} target="_blank">
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
                    <a href={user?.socialInfo?.youtube?.link} target="_blank">
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
                    <a href={user?.socialInfo?.tiktok?.link} target="_blank">
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

              <div className="flex items-center flex-wrap mt-7">
                {user?.categories?.map((item, index) => (
                  <span
                    className="px-5 py-2 mr-2 mb-2 bg-grey-200 rounded-2xl transition-all"
                    key={index}
                  >
                    {item?.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-56 lg:pt-20 pb-20 mt-60 lg:mt-0">
        <div className="grid grid-flex-row grid-cols-12 relative">
          <div className="col-span-12 sm:col-span-6 z-20">
            <div className="lg:max-w-[325px] w-full relative pt-[150px] lazy-load mb-10">
              <LazyLoadImage
                wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
                className="object-cover h-full brightness-[0.98]"
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

            <StyledDesc className="my-5">
              <ReactMarkdown>{user?.desc}</ReactMarkdown>
            </StyledDesc>

            <div className="flex items-center space-x-2 text-primary">
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.96975 16.393C7.1112 16.5372 7.30065 16.617 7.4973 16.6152C7.69395 16.6134 7.88206 16.5301 8.02111 16.3834C8.16017 16.2366 8.23905 16.038 8.24076 15.8304C8.24246 15.6229 8.16687 15.4229 8.03025 15.2736L3.3105 10.2916H16.5C16.6989 10.2916 16.8897 10.2082 17.0303 10.0598C17.171 9.91129 17.25 9.70992 17.25 9.49996C17.25 9.29 17.171 9.08863 17.0303 8.94017C16.8897 8.7917 16.6989 8.70829 16.5 8.70829H3.3105L8.03025 3.72634C8.16687 3.57703 8.24246 3.37705 8.24076 3.16948C8.23905 2.9619 8.16017 2.76334 8.02111 2.61656C7.88206 2.46978 7.69395 2.38652 7.4973 2.38472C7.30065 2.38291 7.1112 2.46271 6.96975 2.60692L0.969749 8.94025C0.900267 9.01396 0.845219 9.10138 0.807751 9.19754C0.76963 9.29329 0.749996 9.3961 0.749996 9.49996C0.749996 9.60382 0.76963 9.70663 0.807751 9.80238C0.845219 9.89854 0.900267 9.98597 0.969749 10.0597L6.96975 16.393Z"
                  fill="#D4BA77"
                />
              </svg>

              <ALink
                href={`/partners${search ? `?search=${search}` : ""}`}
                className="inline-block text-base leading-loose font-bold text-center py-4 after:content-[''] after:block after:w-[50%] after:h-[2px] after:bg-primary"
              >
                Zurück zu Unsere Partner
              </ALink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSinglePageHeader;
