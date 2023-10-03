import qs from "qs";

// Import Render Block
import RenderNewsPageBlock from "@/components/partials/news/RenderNewsPageBlock";
import { getStrapiURL } from "@/utils";

async function getData() {
  const mergedOptions = {
    next: { revalidate: 10 },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

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

  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = getStrapiURL(`/api/news-page?${queryString}`);

  const res = await fetch(requestUrl, mergedOptions);
  const data = await res.json();

  return data.data.attributes;
}

const NewsPage = async () => {
  const data = await getData();

  return (
    <main>
      <RenderNewsPageBlock blocks={data?.blocks} />
    </main>
  );
};

export default NewsPage;
