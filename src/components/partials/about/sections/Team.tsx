"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import Heading from "@/components/common/Heading";
import TeamOne from "@/components/features/Team/TeamOne";

import { StrapiHeader } from "@/types/StrapiHeader";
import { StrapiMember } from "@/types/StrapiMember";
import { getStrapiData } from "@/utils";

interface TeamProps {
  fields: {
    header: StrapiHeader;
    desc: string;
  };
}

const Team = ({ fields }: TeamProps) => {
  const [data, setData] = useState<Array<StrapiMember>>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const urlParamsObject = {
      populate: "*",
    };

    const members = await getStrapiData("members", urlParamsObject);

    setData(members?.data);
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="max-w-[800px] mb-16">
          <Heading
            addTitleClass="text-3xl font-bold"
            subtitle={fields.header?.subtitle}
            title={fields?.header?.title}
          />

          <div className="my-5">
            <ReactMarkdown>{fields?.desc}</ReactMarkdown>
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-flex-row grid-cols-12 sm:gap-x-5 lg:gap-x-16 gap-y-5 lg:gap-y-16">
            {data && data.length > 0
              ? data.map((member: any, index) => (
                  <div
                    className="col-span-12 sm:col-span-6 lg:col-span-4"
                    key={index}
                  >
                    <TeamOne member={member} />
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
