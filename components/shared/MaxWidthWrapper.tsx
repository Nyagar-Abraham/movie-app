import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function MaxWidthWrapper({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`w-full  mx-auto xll:max-w-[86rem] XLL:max-w-[88rem] xl:max-w-[80rem] px-2 mdl:px-8 xl:px-0  ${className}`}
    >
      {children}
    </div>
  );
}
