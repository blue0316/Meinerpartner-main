"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Import Custom Components
import NewsTwo from "@/components/features/News/NewsTwo";

// Import Types
import { StrapiNews } from "@/types/StrapiNews";

// Import Utils
import { getNewsData } from "@/utils";

const NewsList = () => {
  const [news, setNews] = useState<any>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const NewsData = await getNewsData();
    setNews(NewsData.data);
  };

  return (
    <section className="py-20 bg-grey-100 -mt-10 md:-mt-32">
      <div className="container">
        <div className="grid grid-flex-row grid-cols-12 gap-y-10 md:gap-y-20 md:gap-x-5">
          {news.length > 0 ? (
            news.map((item: StrapiNews, index: number) => (
              <div className="col-span-12 md:col-span-12" key={index}>
                <NewsTwo news={item} />
              </div>
            ))
          ) : (
            <div className="col-span-12">
              <div className="h-[400px] rouned-md flex items-center justify-center">
                <div
                  className="inline-block h-12 w-12 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsList;
