"use client";

import ReactMarkdown from "react-markdown";
import styled from "styled-components";

// Import Custom Components
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";

// Import Types
import { StrapiHeader } from "@/types/StrapiHeader";
import { StrapiBanner } from "@/types/StrapiBanner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { StrapiButton } from "@/types/StrapiButton";
import ALink from "@/components/common/ALink";

interface GallerySectionProps {
  fields: {
    header: StrapiHeader;
    desc: string;
    banners: Array<StrapiBanner>;
    button: StrapiButton;
  };
}

const StyledHeading = styled.div`
  .title {
    font-size: 48px;

    @media (max-width: 991px) {
      font-size: 32px;
    }

    @media (max-width: 767px) {
      font-size: 28px;
    }
  }
`;

const BannerSection = ({ fields }: GallerySectionProps) => {
  return (
    <section className="gallery-section">
      <div className="grid grid-flex-row grid-cols-12">
        <div className="col-span-12 sm:col-span-6 flex items-center justify-center">
          <div className="max-w-[700px] p-5">
            <StyledHeading>
              <Heading
                addTitleClass="text-3xl mb-5  font-extrabold"
                subtitle={fields.header?.subtitle}
                title={fields?.header?.title}
              />
            </StyledHeading>

            <ReactMarkdown>{fields?.desc}</ReactMarkdown>

            <div className="flex items-center space-x-2 text-primary">
              <ALink
                className="mt-2 inline-block text-base leading-loose font-bold text-center bg-white py-4 after:content-[''] after:block after:w-[70%] after:h-[2px] after:bg-primary after:mt-[1px]"
                href="/partners"
              >
                Hier gehts zu den Partnern
              </ALink>
              <svg
                className="mt-2"
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

        {fields?.banners?.map((banner, index) => (
          <div
            className={`col-span-12  ${
              fields?.banners.length - 1 == index
                ? "sm:col-span-6"
                : "sm:col-span-6 xl:col-span-3"
            }`}
            key={index}
          >
            <ALink
              href={`/partners?search=${banner?.title
                .toLowerCase()
                .replaceAll(" ", "-")}`}
              className={`banner relative ${
                fields?.banners.length - 1 == index
                  ? "flex items-center justify-center"
                  : ""
              }`}
            >
              <div
                className={`relative w-full flex justify-center plazy-load ${
                  fields?.banners.length - 1 == index
                    ? "pt-[100%] xl:pt-[50%]"
                    : "pt-[100%]"
                }`}
              >
                <LazyLoadImage
                  wrapperClassName="absolute top-0 left-0 z-10 overflow-hidden"
                  className={`object-cover h-full`}
                  src={`${banner?.image?.data?.attributes?.url}`}
                  effect="black-and-white"
                  width="100%"
                  height="100%"
                  alt="home"
                />

                <div className="bg-overlay absolute top-0 left-0 w-full h-full rounded-md"></div>
              </div>

              <div
                className={`banner-details text-white absolute z-10 ${
                  index % 2 == 0
                    ? fields?.banners.length - 1 == index
                      ? "w-full max-w-[500px] p-10"
                      : "left-0 bottom-0 p-10"
                    : "left-0 bottom-0 sm:bottom-auto sm:top-0 p-10"
                }`}
              >
                <h3 className="text-2xl font-bold">{banner?.title}</h3>
                <p className="text-lg">{banner?.desc}</p>
              </div>
            </ALink>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerSection;
