import qs from "qs";

// Import Custom Components
import RenderHomePageBlock from "@/components/partials/home/RenderHomePageBlock";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

// Import Utils
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
      blocks: {
        populate: {
          header: {
            populate: "*",
          },
          image: {
            populate: "*",
          },
          media: {
            populate: "*",
          },
          partnerBoxOne: {
            populate: "*",
          },
          button: {
            populate: "*",
          },
          banners: {
            populate: "*",
          },
          serviceBoxOne: {
            populate: "*",
          },
        },
      },
      seo: {
        populate: "*",
      },
    },
  };

  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = getStrapiURL(`/api/home?${queryString}`);

  const res = await fetch(requestUrl, mergedOptions);
  const data = await res.json();

  return data;
}

export default async function Home() {
  const data = await getData();
  const session = await getServerSession(authOptions);

  return (
    <main>
      <RenderHomePageBlock blocks={data.data?.attributes.blocks} />
    </main>
  );
}
