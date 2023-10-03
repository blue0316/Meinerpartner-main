"use client";

import styled from "styled-components";

// Import Custom Components
import Heading from "@/components/common/Heading";
import ServiceBoxOne from "@/components/features/Service/ServiceBoxOne";

// Import Custom Components
import { StrapiHeader } from "@/types/StrapiHeader";
import { StrapiService } from "@/types/StrapiService";

interface ServicesSectionProps {
  fields: {
    header: StrapiHeader;
    serviceBoxOne: Array<StrapiService>;
  };
}

const StyledHeading = styled.div`
  max-width: 600px;
  font-weight: 700;

  strong {
    color: #d4ba77;
  }
`;

const ServicesSection = ({ fields }: ServicesSectionProps) => {
  return (
    <section className="py-24">
      <div className="container">
        <StyledHeading className="text-center mx-auto">
          <Heading
            addTitleClass="text-3xl mb-7 font-extrabold"
            subtitle={fields.header?.subtitle}
            title={fields?.header?.title}
          />
        </StyledHeading>

        <div className="max-w-[900px] w-full mx-auto mt-16">
          <div className="grid grid-flex-row grid-cols-12 sm:gap-x-10 gap-y-10 lg:gap-x-20 lg:gap-y-20">
            {fields?.serviceBoxOne.map((service, index) => (
              <div className="col-span-12 md:col-span-6" key={index}>
                <ServiceBoxOne service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
