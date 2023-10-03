"use client";

import styled from "styled-components";

// Import Custom Components
import Heading from "@/components/common/Heading";
import { StrapiHeader } from "@/types/StrapiHeader";
import Button from "@/components/common/Button";
import { StrapiButton } from "@/types/StrapiButton";

interface ContactSectionProps {
  fields: {
    header: StrapiHeader;
    button: StrapiButton;
  };
}

const StyledHeading = styled.div`
  max-width: 500px;
  font-weight: 700;

  .subtitle strong {
    color: #fff;
  }

  strong {
    color: #d4ba77;
  }

  .title {
    line-height: 1.5;
  }
`;

const ContactSection = ({ fields }: ContactSectionProps) => {
  return (
    <section className="bg-black py-20">
      <div className="container text-center">
        <StyledHeading className="text-center mx-auto">
          <Heading
            addTitleClass="text-3xl mb-7 text-white font-extrabold"
            subtitle={fields.header?.subtitle}
            title={fields?.header?.title}
          />
        </StyledHeading>

        <Button
          adClass="inline-block text-base text-white bg-primary font-bold text-center px-14 py-4"
          fields={fields?.button}
        ></Button>
      </div>
    </section>
  );
};

export default ContactSection;
