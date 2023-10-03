import ALink from "./ALink";

interface MobileMenuProps {
  menu: Array<{
    title: string;
    link: string;
  }>;
}

const MobileMenu = ({ menu }: MobileMenuProps) => {
  const closeMobileSidebar = () => {
    if (document.querySelector("body.open-mobile-menu")) {
      document.querySelector("body")?.classList.remove("open-mobile-menu");
    }
  };

  return (
    <>
      <div
        className="mobile-menu-overlay opacity-0 invisible transition-all bg-black bg-opacity-70 fixed w-full h-full top-0 left-0 z-20"
        onClick={closeMobileSidebar}
      ></div>

      <div className="mobile-menu fixed top-0 left-0 -translate-x-[300px] w-[300px] h-full bg-black text-white z-20 transition-all">
        <ul className="list-none m-0 font-semibold text-base xl:text-lg p-5 space-y-3">
          {menu?.map((item: any, index: number) => (
            <li key={index} className="hover:text-primary">
              <ALink href={item.link}>{item.title}</ALink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MobileMenu;
