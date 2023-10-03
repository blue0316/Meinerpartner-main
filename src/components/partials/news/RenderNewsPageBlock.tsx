import React from "react";

// Import Custom Components
import NewsList from "./sections/NewsList";
import RenderCommonBlock from "../common/RenderCommonBlock";

const getBlockComponent = ({ __component, ...rest }: any) => {
  if (__component.indexOf("partials.") > -1) {
    return <RenderCommonBlock component={__component} fields={{ ...rest }} />;
  } else {
    switch (__component) {
      case "news.news-list":
        return <NewsList />;
    }
  }
};

const RenderNewsPageBlock = ({ blocks }: any, index: number) => {
  return (
    <React.Fragment key={index}>{blocks.map(getBlockComponent)}</React.Fragment>
  );
};

RenderNewsPageBlock.defaultProps = {
  blocks: [],
};

export default RenderNewsPageBlock;
