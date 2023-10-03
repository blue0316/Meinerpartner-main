import ALink from "./ALink";
import { StrapiButton } from "@/types/StrapiButton";
interface ButtonProps {
  adClass: string;
  fields: StrapiButton;
}

const Button = ({ adClass = "", fields }: ButtonProps) => {
  return (
    <ALink className={adClass} href={fields?.href}>
      {fields?.label}
    </ALink>
  );
};

export default Button;
