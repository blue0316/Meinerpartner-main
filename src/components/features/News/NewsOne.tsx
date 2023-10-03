import { StrapiNews } from "@/types/StrapiNews";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface NewsOneProps {
  news: StrapiNews;
}

const NewsOne = ({ news }: NewsOneProps) => {
  return (
    <div className="news text-lg">
      <div className="relative flex justify-center pt-[62%] lazy-load max-w-[calc(100%-40px)]">
        <LazyLoadImage
          wrapperClassName="absolute top-0 left-0 z-10 overflow-hidden"
          className="object-cover h-full"
          src={`${news?.attributes?.image?.data?.attributes?.url}`}
          effect="black-and-white"
          width="100%"
          height="100%"
          alt="home"
        />

        <div className="bg-overlay absolute top-0 left-0 w-full h-full rounded-md"></div>
      </div>

      <div className="news-details relative pt-14 z-10">
        <div className="absolute left-0 w-full -top-4 flex items-center justify-between font-bold">
          <p className="text-sm text-primary mt-5">{news?.attributes?.date}</p>

          <h3 className="text-sm md:text-base bg-primary text-white px-6 md:px-10 py-3 md:py-4 rounded-sm md:min-w-[210px] text-center">
            {news?.attributes?.topic}
          </h3>
        </div>

        <p className="limited-text max-w-[calc(100%-40px)]">
          {news?.attributes?.desc}
        </p>
      </div>
    </div>
  );
};

export default NewsOne;
