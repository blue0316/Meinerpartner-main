"use client";

import styled from "@emotion/styled";
import ReactMarkdown from "react-markdown";

// Import Custom Components
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";

// Import Custom Types
import { StrapiHeader } from "@/types/StrapiHeader";
import { StrapiImage } from "@/types/StrapiImage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { StrapiButton } from "@/types/StrapiButton";

interface PartnerSectionProps {
  fields: {
    header: StrapiHeader;
    media: StrapiImage;
    desc: string;
    partnerBoxOne: {
      title: string;
      desc: string;
      button: Array<StrapiButton>;
    };
  };
}

const Desc = styled.div`
  p {
    margin-bottom: 1.4rem;
  }
`;

const PartnerBox = styled.div`
  h3 {
    margin-bottom: 1rem;
    font-size: 28px;
    font-weight: 700;
    line-height: 32px;
  }

  p {
    margin-bottom: 2rem;
    font-size: 18px;
    font-weight: 400;
    line-height: 32px;
  }
`;

const PartnerSection = ({ fields }: PartnerSectionProps) => {
  return (
    <section className="relative z-2 bg-grey-100 pt-10 md:-mt-10 md:pt-0">
      <div className="container relative">
        <div className="grid grid-flex-row grid-cols-12 sm:gap-x-8 gap-y-8 relative z-10 items-center">
          <div className="col-span-12 md:col-span-7">
            <Heading
              addTitleClass="text-3xl mb-6 font-extrabold"
              subtitle={fields.header?.subtitle}
              title={fields?.header?.title}
            />

            <Desc>
              <ReactMarkdown>{fields?.desc}</ReactMarkdown>
            </Desc>
          </div>

          <div className="col-span-12 md:col-span-5 relative">
            <PartnerBox className="bg-primary text-white rounded-lg p-10 shadow-2xl md:max-w-[368px] mx-auto md:mt-16">
              <h3>{fields?.partnerBoxOne?.title}</h3>

              <ReactMarkdown>{fields?.partnerBoxOne?.desc}</ReactMarkdown>

              <Button
                adClass="text-base text-primary font-bold text-center bg-white py-4"
                fields={fields?.partnerBoxOne?.button[0]}
              ></Button>
            </PartnerBox>
          </div>
        </div>

        <div className="relative h-[300px] md:h-[500px]">
          <div className="absolute left-0 right-0 flex justify-center pt-[400px] md:pt-[600px] xl:pt-[47%] lazy-load mt-12 md:-mt-28 lg:-mt-32 relative z-0">
            <LazyLoadImage
              wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
              className="object-cover h-full"
              src={`${fields?.media?.data.attributes?.url}`}
              effect="black-and-white"
              width="100%"
              height="100%"
              alt="home"
            />

            <div className="bg-overlay bg-white absolute top-0 left-0 w-full h-full rounded-md z-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
