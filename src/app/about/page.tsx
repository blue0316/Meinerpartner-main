import RenderAboutPageBlock from "@/components/partials/about/RenderAboutPageBlock";
import { getStrapiData } from "@/utils";

async function getData() {
  const urlParamsObject = {
    populate: {
      seo: {
        populate: "*",
      },
      blocks: {
        populate: {
          header: {
            populate: "*",
          },
          image: {
            populate: "*",
          },
          pageContent: {
            populate: {
              header: {
                populate: "*",
              },
              ServiceMedia: {
                populate: "*",
              },
            },
          },
        },
      },
    },
  };

  const data = await getStrapiData("about", urlParamsObject);

  return data.data.attributes;
}

const AboutUs = async () => {
  const data = await getData();
  console.log(data, "datadatadata");

  return (
    <main>
      <RenderAboutPageBlock blocks={data?.blocks} />
    </main>
  );
};

export default AboutUs;
