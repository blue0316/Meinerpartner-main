import React from "react";

// Import Custom Components
import AboutPageHeader from "./sections/AboutPageHeader";
import RenderCommonBlock from "../common/RenderCommonBlock";
import AboutPageContent from "./sections/AboutPageContent";
import Team from "./sections/Team";

const getBlockComponent = ({ __component, ...rest }: any) => {
  if (__component.indexOf("partials.") > -1) {
    return <RenderCommonBlock component={__component} fields={{ ...rest }} />;
  } else {
    switch (__component) {
      case "about.about-page-header":
        return <AboutPageHeader fields={{ ...rest }} />;
      case "about.about-page-content":
        return <AboutPageContent fields={{ ...rest }} />;
      case "about.teams":
        return <Team fields={{ ...rest }} />;
    }
  }
};

const RenderAboutPageBlock = ({ blocks }: any, index: number) => {
  return (
    <React.Fragment key={index}>{blocks.map(getBlockComponent)}</React.Fragment>
  );
};

RenderAboutPageBlock.defaultProps = {
  blocks: [],
};

export default RenderAboutPageBlock;
