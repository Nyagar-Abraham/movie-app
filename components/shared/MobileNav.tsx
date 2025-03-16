"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { Links } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NavBarContrls from "./NavBarControls";
import NavBarControls from "./NavBarControls";

const MobileNav = ({ isTransparent }: { isTransparent: boolean }) => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="size-8 text-light100-dark0" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="!bg-transparent  text-light90-dark-10 p-0 max-w-[20rem] "
      >
        <div
          className={cn(
            "px-6 py-10  flex flex-col  gap-6 rounded-md h-full pb-10 ",
            {
              "backdrop-blur-md !bg-transparent": isTransparent,
              "bg-dark90-light10": !isTransparent,
            }
          )}
        >
          <div className="flex items-center ">
            <Logo size={32} />
            <span className="text-2xl font-semibold text-accent-100 hover:text-accent-200">
              CineSphere
            </span>
          </div>

          <div className="flex flex-col gap-2 ">
            {Links.map((navRoute) => {
              const active =
                (pathname.includes(navRoute.href) &&
                  navRoute.href.length > 1) ||
                pathname === navRoute.href;

              return (
                <SheetClose asChild>
                  <Link
                    key={navRoute.label}
                    href={navRoute.href}
                    className={cn(
                      `h-fit rounded-md items-center  duration-200   px-4 py-2 transition-all border border-transparent hover:text-accent-100`,
                      {
                        "text-light90-dark10 hover:bg-dark90-light10":
                          !active && !isTransparent,
                        "text-accent-100   border-accent-100":
                          active && isTransparent,
                        "hover:border hover:border-accent-100": isTransparent,
                        "bg-dark90-light10": !isTransparent && active,
                      }
                    )}
                  >
                    <span className="capitalize    text-sm ">
                      {navRoute.label}
                    </span>
                  </Link>
                </SheetClose>
              );
            })}
          </div>

          <NavBarControls isTransparent={isTransparent} isMobile />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
