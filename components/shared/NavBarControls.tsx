import { cn } from "@/lib/utils";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import Theme from "./Theme";
import { SheetClose } from "../ui/sheet";

function AuthLinks({
  isMobile,
  children,
  isTransparent,
}: {
  isMobile: boolean;
  children: React.ReactNode;
  isTransparent: boolean;
}) {
  const content = (
    <div
      className={cn(
        `h-fit rounded-full items-center duration-200 border border-transparent hover:text-accent-100 px-4 py-2 transition-all `,
        {
          "rounded-md": isMobile,
          "hover:border-accent-100": isTransparent,
          " hover:bg-dark80-light20 ": !isTransparent,
        }
      )}
    >
      {children}
    </div>
  );

  return (
    <SignedOut>
      {isMobile ? <SheetClose asChild>{content}</SheetClose> : content}
    </SignedOut>
  );
}

const NavBarControls = ({
  isMobile,
  isTransparent,
}: {
  isMobile: boolean;
  isTransparent: boolean;
}) => {
  return (
    <div
      className={cn("text-light90-dark10 mt-auto flex gap-3 items-center ", {
        "flex-col !items-stretch": isMobile,
      })}
    >
      <div
        className={cn("flex-center gap-2 text-sm ", {
          "flex-col !items-stretch": isMobile,
        })}
      >
        <AuthLinks isTransparent={isTransparent} isMobile={isMobile}>
          <SignUpButton />
        </AuthLinks>
        <AuthLinks isTransparent={isTransparent} isMobile={isMobile}>
          <SignInButton />
        </AuthLinks>
      </div>

      <div
        className={cn("flex-center gap-3", {
          "!justify-between": isMobile,
        })}
      >
        {isMobile ? (
          <SheetClose asChild>
            <Theme />
          </SheetClose>
        ) : (
          <Theme />
        )}

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default NavBarControls;
