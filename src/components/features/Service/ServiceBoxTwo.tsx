import ReactMarkdown from "react-markdown";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Import Custom Components
import Heading from "@/components/common/Heading";

// Import Types
import { StrapiAboutContentType } from "@/types/StrapiAboutContentType";

interface ServiceBoxTwoProps {
  service: StrapiAboutContentType;
}

const ServiceBoxTwo = ({ service }: ServiceBoxTwoProps) => {
  return (
    <div className="service-box">
      <div className="max-w-[540px]">
        <Heading
          addTitleClass="text-3xl font-bold"
          subtitle={service.header?.subtitle}
          title={service?.header?.title}
        />
      </div>

      <div className="my-5">
        <ReactMarkdown>{service?.desc}</ReactMarkdown>
      </div>

      {service?.isServiceBox && (
        <div className="max-w-[700px] mt-10">
          <div className="grid grid-flex-row grid-cols-12 gap-y-5 sm:gap-x-5">
            {service?.ServiceMedia?.map((item, index) => (
              <div className="col-span-6 md:col-span-3" key={index}>
                <div>
                  <div className="relative flex justify-center pt-[82px] max-w-[82px] mx-auto lazy-load">
                    <LazyLoadImage
                      wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
                      className="object-cover"
                      src={`${item?.image?.data?.attributes?.url}`}
                      effect="black-and-white"
                      width="100%"
                      height="100%"
                      alt="home"
                    />

                    <div className="bg-overlay absolute top-0 left-0 w-full h-full rounded-md"></div>
                  </div>

                  <div className="service-box-details text-center mt-5">
                    <h4 className="service-box-title text-sm text-primary font-bold mb-4">
                      {item?.label}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceBoxTwo;
