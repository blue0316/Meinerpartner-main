import { LazyLoadImage } from "react-lazy-load-image-component";

// Import Types
import { StrapiService } from "@/types/StrapiService";

interface ServiceBoxOneProps {
  service: StrapiService;
}

const ServiceBoxOne = ({ service }: ServiceBoxOneProps) => {
  return (
    <div className="service-box">
      <div className="relative flex justify-center pt-[82px] max-w-[82px] mx-auto lazy-load">
        <LazyLoadImage
          wrapperClassName="absolute top-0 left-0 z-10 rounded-md overflow-hidden"
          className="object-cover"
          src={`${service?.image?.data?.attributes?.url}`}
          effect="black-and-white"
          width="100%"
          height="100%"
          alt="home"
        />

        <div className="bg-overlay absolute top-0 left-0 w-full h-full rounded-md"></div>
      </div>

      <div className="service-box-details text-center mt-5">
        <h4 className="service-box-title text-sm text-primary font-bold mb-4">
          {service?.title}
        </h4>
        <p className="service-box-desc text-lg">{service?.desc}</p>
      </div>
    </div>
  );
};

export default ServiceBoxOne;
