"use client";

import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

// Import Custom Components
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import NewsOne from "@/components/features/News/NewsOne";

// Import Types
import { StrapiButton } from "@/types/StrapiButton";
import { StrapiHeader } from "@/types/StrapiHeader";
import { StrapiNews } from "@/types/StrapiNews";

// Import Utils
import { getNewsData } from "@/utils";

interface NewsSectionProps {
  fields: {
    header: StrapiHeader;
    button: StrapiButton;
  };
}

const StyledHeading = styled.div`
  max-width: 500px;
  font-weight: 700;

  strong {
    color: #d4ba77;
  }
`;

const NewsSection = ({ fields }: NewsSectionProps) => {
  const [news, setNews] = useState<any>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const NewsData = await getNewsData();
    setNews(NewsData.data);
  };

  return (
    <section className="py-20 bg-grey-100 overflow-hidden">
      <div className="container">
        <StyledHeading className="text-center mx-auto">
          <Heading
            addTitleClass="text-3xl mb-7 font-extrabold"
            subtitle={fields.header?.subtitle}
            title={fields?.header?.title}
          />
        </StyledHeading>

        <Swiper
          className="py-10"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          noSwipingClass="slide-visible"
          pagination={{ clickable: true }}
          watchSlidesProgress={true}
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 70,
            },
          }}
        >
          {news.length > 0 ? (
            news?.slice(0, 10)?.map((item: StrapiNews, index: number) => (
              <SwiperSlide key={index}>
                <NewsOne news={item} />
              </SwiperSlide>
            ))
          ) : (
            <div className="h-[400px] bg-grey-100 rouned-md flex items-center justify-center">
              <div
                className="inline-block h-12 w-12 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          )}
        </Swiper>

        <div className="flex items-center space-x-2 text-primary">
          <Button
            adClass="inline-block text-base leading-loose font-bold text-center py-4 after:content-[''] after:block after:w-[70%] after:h-[2px] after:bg-primary"
            fields={fields?.button}
          ></Button>
          <svg
            width="25"
            height="27"
            viewBox="0 0 25 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.32 22.794C15.1235 22.9945 14.8604 23.1055 14.5873 23.103C14.3142 23.1005 14.0529 22.9847 13.8598 22.7806C13.6666 22.5765 13.5571 22.3004 13.5547 22.0118C13.5523 21.7232 13.6573 21.4451 13.8471 21.2375L20.4023 14.3102L2.08354 14.3102C1.80727 14.3102 1.54232 14.1942 1.34697 13.9878C1.15162 13.7814 1.04187 13.5014 1.04187 13.2094C1.04187 12.9175 1.15162 12.6375 1.34697 12.431C1.54232 12.2246 1.80727 12.1086 2.08354 12.1086L20.4023 12.1086L13.8471 5.18135C13.6573 4.97374 13.5523 4.69568 13.5547 4.40705C13.5571 4.11843 13.6666 3.84234 13.8598 3.63824C14.0529 3.43414 14.3142 3.31838 14.5873 3.31587C14.8604 3.31336 15.1235 3.42431 15.32 3.62483L23.6533 12.4312C23.7498 12.5336 23.8263 12.6552 23.8783 12.7889C23.9313 12.9221 23.9585 13.065 23.9585 13.2094C23.9585 13.3538 23.9313 13.4968 23.8783 13.6299C23.8263 13.7636 23.7498 13.8852 23.6533 13.9877L15.32 22.794Z"
              fill="#D4BA77"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
