"use client";

import { notFound } from "next/navigation";

// Import Custom Components
import PartnerSinglePageHeader from "@/components/partials/partner/sections/PartnerSinglePageHeader";

// Import Utils
import { getStrapiData } from "@/utils";
import { useEffect, useState } from "react";
import { StrapiUser } from "@/types/StrapiUser";

interface PageProps {
  params: {
    slug: string;
  };
}

const PartnerSinglePage = ({ params }: PageProps) => {
  const slug = params?.slug;
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (!data) {
      fetchData(slug);
    }
  }, [slug]);

  const fetchData = async (slug: string) => {
    try {
      const urlParamsObject = {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: {
          contactInfo: {
            populate: "*",
          },
          socialInfo: {
            populate: {
              instagram: {
                populate: "*",
              },
              twitter: {
                populate: "*",
              },
              facebook: {
                populate: "*",
              },
              linkedin: {
                populate: "*",
              },
              youtube: {
                populate: "*",
              },
              tiktok: {
                populate: "*",
              },
            },
          },
          background: {
            populate: "*",
          },
          avatar: {
            populate: "*",
          },
          brand: {
            populate: "*",
          },
          categories: {
            populate: "*",
          },
        },
      };

      const singleData = await getStrapiData(`users`, urlParamsObject);

      setData(singleData);
    } catch (error) {
      notFound();
    }
  };

  return (
    <main>
      {data ? (
        <PartnerSinglePageHeader user={data[0]} />
      ) : (
        <div className="text-5xl flex items-center bg-primary text-white justify-center fixed top-0 w-full h-full z-40">
          <div className="preloader">
            <div className="loader">
              <div className="shadow"></div>
              <div className="box"></div>
            </div>
          </div>
        </div>
      )}{" "}
    </main>
  );
};

export default PartnerSinglePage;
