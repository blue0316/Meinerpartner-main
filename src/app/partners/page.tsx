// Import Custom Components
import RenderPartnerPageBlock from "@/components/partials/partner/RenderPartnerPageBlock";

// Import Utils
import { getStrapiData } from "@/utils";

async function getData() {
  const urlParamsObject = {
    populate: {
      seo: {
        populate: "*",
      },
      blocks: {
        populate: "*",
      },
    },
  };

  const data = await getStrapiData("partner", urlParamsObject);

  return data.data.attributes;
}

const Partner = async () => {
  const data = await getData();

  return (
    <main>
      <RenderPartnerPageBlock blocks={data?.blocks} />
    </main>
  );
};

export default Partner;
