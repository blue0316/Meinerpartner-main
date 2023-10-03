"use client";

import ServiceBoxTwo from "@/components/features/Service/ServiceBoxTwo";
import { StrapiAboutContentType } from "@/types/StrapiAboutContentType";

interface PageProps {
  fields: {
    pageContent: Array<StrapiAboutContentType>;
  };
}

const AboutPageContent = ({ fields }: PageProps) => {
  return (
    <section className="relative bg-grey-100 py-20">
      <div className="container">
        {fields?.pageContent?.map((content, index) => (
          <div
            className={`${
              fields.pageContent.length - 1 == index ? "" : "mb-16"
            }`}
            key={index}
          >
            <ServiceBoxTwo service={content} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutPageContent;
