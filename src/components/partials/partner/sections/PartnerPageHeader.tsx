"use client";

import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

// Import Types
import { StrapiImage } from "@/types/StrapiImage";

interface PartnerPageHeaderProps {
  fields: {
    media: StrapiImage;
    partnerBoxTwo: {
      title: string;
      desc: string;
    };
  };
}

const PartnerBoxTwo = styled("div")``;

const PartnerPageHeader = ({ fields }: PartnerPageHeaderProps) => {
  return (
    <section className="relative flex items-center overflow-y-hidden bg-grey-100 pb-36">
      <div className="relative bg-grey-100 w-full pt-[27%] min-h-[510px] lazy-load">
        <LazyLoadImage
          wrapperClassName="absolute top-0 left-0 z-10 overflow-hidden"
          className="object-cover h-full"
          src={`${fields?.media?.data?.attributes?.url}`}
          effect="black-and-white"
          width="100%"
          height="100%"
          alt="home"
        />
      </div>

      <div className="absolute bottom-0 w-full left-0 bottom-5 md:bottom-16 z-10 ml-auto">
        <div className="w-full md:w-auto md:max-w-[1000px] mx-auto px-5">
          <PartnerBoxTwo className="px-10 py-16 bg-primary w-full md:max-w-[359px] ml-auto rounded-md md:shadow-2xl">
            <h4 className="inline-block relative subtitle text-3xl text-white pb-1 mb-8">
              <ReactMarkdown>{fields?.partnerBoxTwo?.title}</ReactMarkdown>
              <span className="mt-[2px] absolute left-0 md:right-auto mr-auto right-0 top-full divider inline-block h-[3px] w-24 bg-white rounded-md"></span>
            </h4>

            <p className="text-white text-lg">{fields?.partnerBoxTwo?.desc}</p>
          </PartnerBoxTwo>
        </div>
      </div>
    </section>
  );
};

export default PartnerPageHeader;
