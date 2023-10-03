import ReactMarkdown from "react-markdown";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { StrapiMember } from "@/types/StrapiMember";

interface TeamOneProps {
  member: {
    attributes: StrapiMember;
  };
}

const TeamOne = ({ member }: TeamOneProps) => {
  return (
    <div className="member">
      <div className="relative flex justify-center pt-[100%] lazy-load mb-7">
        <LazyLoadImage
          wrapperClassName="absolute top-0 left-0 z-10 overflow-hidden rounded-full overflow-hideen"
          className="object-cover"
          src={`${member?.attributes?.avatar?.data?.attributes?.url}`}
          effect="black-and-white"
          width="100%"
          height="100%"
          alt="home"
        />

        <div className="bg-overlay absolute top-0 left-0 w-full h-full rounded-full overflow-hideen"></div>
      </div>

      <div className="member-details">
        <h4 className="inline-block relative subtitle text-2xl text-black font-bold pb-1">
          <ReactMarkdown>{member?.attributes?.title}</ReactMarkdown>
          <span className="absolute left-0 md:right-auto mr-auto right-0 bottom-full divider inline-block h-1 w-[160px] bg-black rounded-md"></span>
        </h4>

        <p className="">{member?.attributes?.email}</p>
      </div>
    </div>
  );
};

export default TeamOne;
