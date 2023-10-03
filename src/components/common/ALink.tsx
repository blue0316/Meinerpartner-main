import Link from "next/link";
import { memo } from "react";

interface AlinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ALink: React.FC<AlinkProps> = ({
  href,
  children,
  className,
  onClick,
}) => {
  /**
   * On click handler
   *
   * @param {MouseEvent} e
   */
  function onClickHandler(event: React.MouseEvent<HTMLElement>): void {
    if (href == "#") {
      event.preventDefault();
    }

    if (typeof onClick == "function") {
      onClick();
    }
  }

  return (
    <Link href={href ? href : "#"}>
      <div className={className} onClick={onClickHandler}>
        {children}
      </div>
    </Link>
  );
};

export default memo(ALink);
