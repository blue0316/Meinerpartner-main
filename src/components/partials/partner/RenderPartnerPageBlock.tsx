import React from "react";

// Import Custom Components
import CategoryCollection from "./sections/CategoryCollection";
import PartnerPageHeader from "./sections/PartnerPageHeader";
import RenderCommonBlock from "../common/RenderCommonBlock";

const getBlockComponent = ({ __component, ...rest }: any) => {
  if (__component.indexOf("partials.") > -1) {
    return <RenderCommonBlock component={__component} fields={{ ...rest }} />;
  } else {
    switch (__component) {
      case "partners.partner-page-header":
        return <PartnerPageHeader fields={{ ...rest }} />;
      case "partners.category-collection":
        return <CategoryCollection fields={{ ...rest }} />;
    }
  }
};

const RenderPartnerPageBlock = ({ blocks }: any, index: number) => {
  return (
    <React.Fragment key={index}>{blocks.map(getBlockComponent)}</React.Fragment>
  );
};

RenderPartnerPageBlock.defaultProps = {
  blocks: [],
};

export default RenderPartnerPageBlock;
