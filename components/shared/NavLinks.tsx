"use client";

import { Links } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCalendarCheck, FaUser, FaUsers } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

const NavLinks = ({ isTransparent }: { isTransparent: boolean }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn("flex-center   rounded-full gap-2 p-1 max-lg:hidden ", {
        "backdrop-blur-xl ": isTransparent,
        "bg-dark80-light20 ": !isTransparent,
      })}
    >
      {Links.map((navRoute) => {
        const active =
          (pathname.includes(navRoute.href) && navRoute.href.length > 1) ||
          pathname === navRoute.href;

        return (
          <Link
            key={navRoute.label}
            href={navRoute.href}
            className={cn(
              `h-fit rounded-full items-center  duration-200   px-4 py-2 transition-all border border-transparent hover:text-accent-100`,
              {
                "text-light90-dark10 hover:bg-dark90-light10":
                  !active && !isTransparent,
                "text-accent-100   border-accent-100": active && isTransparent,
                "hover:border hover:border-accent-100": isTransparent,
                "bg-dark90-light10": !isTransparent && active,
              }
            )}
          >
            <span className="capitalize    text-sm ">{navRoute.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
