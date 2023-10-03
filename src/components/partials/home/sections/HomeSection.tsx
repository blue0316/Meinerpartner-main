"use client";

import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";

// Import Custom Components
import Heading from "@/components/common/Heading";

// Import Custom Types
import { StrapiImage } from "@/types/StrapiImage";
import { StrapiHeader } from "@/types/StrapiHeader";

interface HomeSectionProps {
  fields: {
    header: StrapiHeader;
    image: StrapiImage;
  };
}

const HomeSection = ({ fields }: HomeSectionProps) => {
  return (
    <section className="relative flex items-center overflow-y-hidden z-10">
      <div className="relative bg-grey-100 w-full pt-[750px] sm:pt-[1000px] lg:pt-[40%] min-h-[761px] lazy-load">
        <LazyLoadImage
          wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
          className="object-cover h-full"
          src={`/assets/images/banner-bottom.png`}
          effect="black-and-white"
          width="100%"
          height="100%"
          alt="home"
        />
      </div>

      <div className="absolute left-0 top-0 w-full z-10 h-full flex items-center justify-center">
        <div className="container pt-7">
          <div className="grid grid-flex-row grid-cols-12 sm:gap-x-8 gap-y-8 items-center justify-center">
            <div className="col-span-12 lg:col-span-5">
              <Heading
                addTitleClass="text-4xl xl:text-5xl font-light"
                subtitle={fields.header?.subtitle}
                title={fields?.header?.title}
              />
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="relative flex justify-center pt-[64%] lazy-load">
                <LazyLoadImage
                  wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
                  className="object-cover"
                  src={`${fields?.image?.data?.attributes?.url}`}
                  effect="black-and-white"
                  width="100%"
                  height="100%"
                  alt="home"
                />

                <div className="bg-overlay absolute top-0 left-0 w-full h-full rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
