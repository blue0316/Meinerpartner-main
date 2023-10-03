import React from "react";

// Import Custom Components
import ContactSection from "./sections/ContactSection";
import NewsSection from "./sections/NewsSection";
import PageHeader from "./sections/PageHeader";

const RenderCommonBlock = ({ component, fields }: any) => {
  switch (component) {
    case "partials.news-collection":
      return <NewsSection fields={{ ...fields }} />;
    case "partials.contact":
      return <ContactSection fields={{ ...fields }} />;
    case "partials.page-header":
      return <PageHeader fields={{ ...fields }} />;
    default:
      return (
        <h1>
          There is no section called {component.replace("partials.", "")} on
          frontend
        </h1>
      );
  }
};

export default RenderCommonBlock;
