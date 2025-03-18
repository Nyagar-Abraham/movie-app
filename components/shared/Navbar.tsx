"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MobileNav from "./MobileNav";
import NavBarControls from "./NavBarControls";
import NavLinks from "./NavLinks";
import useMatchPath from "@/hooks/useMatchPathname";

const Navbar = () => {
  const pathname = usePathname();
  const match = useMatchPath();

  const isTransparent = pathname === "/" || match;

  return (
    <nav
      className={cn(" top-0 py-3 z-50 min-h-[4rem]  fixed inset-x-0 ", {
        "backdrop-blur-md ": isTransparent,
        "bg-dark90-light10": !isTransparent,
      })}
    >
      {" "}
      <MaxWidthWrapper className="flex-between xl:px-0 xll:max-w-[86rem] XLL:max-w-[88rem] xl:max-w-[80rem]  ">
        <div className="flex items-center gap-2">
          <Logo
            size={32}
            className=" hover:scale-[1.2] transition-all duration-200"
          />{" "}
          <span className="text-2xl font-semibold text-accent-100 hover:text-accent-200">
            CineSphere
          </span>
        </div>

        <NavLinks isTransparent={isTransparent} />
        <div className="max-lg:hidden">
          <NavBarControls isMobile={false} isTransparent={isTransparent} />
        </div>

        <MobileNav isTransparent={isTransparent} />
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
