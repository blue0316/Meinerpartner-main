import { StrapiNews } from "@/types/StrapiNews";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface NewsTwoProps {
  news: StrapiNews;
}

const NewsTwo = ({ news }: NewsTwoProps) => {
  return (
    <div className="news md:flex justify-between text-lg">
      <div className="relative max-w-[calc(100%-30px)] md:max-w-[350px] lg:max-w-[419px] w-full">
        <div className="relative  flex justify-center pt-[77%] lazy-load">
          <LazyLoadImage
            wrapperClassName="absolute top-0 left-0 z-10 overflow-hidden"
            className="object-cover h-full"
            src={`${news?.attributes?.image?.data?.attributes?.url}`}
            effect="black-and-white"
            width="100%"
            height="100%"
            alt="home"
          />

          <div className="bg-overlay absolute top-0 left-0 w-full h-full"></div>

          <div className="absolute w-auto -right-7  md:-right-5 -bottom-5 flex items-center justify-between font-bold z-10">
            <h3 className="text-sm md:text-base bg-primary text-white px-6 md:px-10 py-3 md:py-4 rounded-sm md:min-w-[210px] text-center">
              {news?.attributes?.topic}
            </h3>
          </div>
        </div>
      </div>

      <div className="news-details md:mt-0 mt-5 md:max-w-[calc(100%-400px)] lg:max-w-[calc(100%-511px)] w-full z-10">
        <p className="text-sm text-primary">{news?.attributes?.date}</p>

        <h2 className="title text-lg font-bold mb-3">
          {news?.attributes?.title}
        </h2>

        <p className="text-base mb-5">{news?.attributes?.desc}</p>

        {news?.attributes?.videoLink && (
          <a
            href={news?.attributes?.videoLink}
            className="inline-flex items-center border border-black rounded-[25px] font-bold text-base space-x-2 h-[50px] px-2"
          >
            <img
              src="/assets/images/icons/video.png"
              width={30}
              height={30}
              alt="video"
            />
            <span className="block px-2">Zum Video</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default NewsTwo;
