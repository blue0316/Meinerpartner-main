import React from "react";

// Import Custom Components
import HomeSection from "./sections/HomeSection";
import NewsSection from "./sections/NewsSection";
import BannerSection from "./sections/BannerSection";
import PartnerSection from "./sections/PartnerSection";
import ServicesSection from "./sections/ServicesSection";
import ContactSection from "./sections/ContactSection";

const getBlockComponent = ({ __component, ...rest }: any) => {
  switch (__component) {
    case "home.home":
      return <HomeSection fields={{ ...rest }} />;
    case "home.partners":
      return <PartnerSection fields={{ ...rest }} />;
    case "home.news":
      return <NewsSection fields={{ ...rest }} />;
    case "home.banners":
      return <BannerSection fields={{ ...rest }} />;
    case "home.services":
      return <ServicesSection fields={{ ...rest }} />;
    case "home.contact":
      return <ContactSection fields={{ ...rest }} />;
  }
};

const RenderHomePageBlock = ({ blocks }: any, index: number) => {
  return (
    <React.Fragment key={index}>{blocks.map(getBlockComponent)}</React.Fragment>
  );
};

RenderHomePageBlock.defaultProps = {
  blocks: [],
};

export default RenderHomePageBlock;
