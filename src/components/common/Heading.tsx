import ReactMarkdown from "react-markdown";

interface HeadingProps {
  addTitleClass?: string;
  subtitle: string;
  title: string;
}

const Heading = ({
  addTitleClass = "text-5xl font-light",
  subtitle,
  title,
}: HeadingProps) => {
  return (
    <div>
      <h4 className="inline-block relative subtitle text-lg text-primary font-bold pb-1">
        <ReactMarkdown>{subtitle}</ReactMarkdown>
        <span className="absolute left-0 md:right-auto mr-auto right-0 top-full divider inline-block h-1 w-16 bg-primary rounded-md"></span>
      </h4>

      <h1 className={`title leading-tight -ml-[2px] mt-5 ${addTitleClass}`}>
        <ReactMarkdown>{title}</ReactMarkdown>
      </h1>
    </div>
  );
};

export default Heading;
