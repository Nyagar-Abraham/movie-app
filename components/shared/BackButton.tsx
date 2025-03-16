"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import ButtonComponent from "./Button";

const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter();

  return (
    <ButtonComponent
      onClick={() => router.back()}
      className={className}
      icon={<FaArrowLeft />}
    >
      <span>back</span>
    </ButtonComponent>
  );
};

export default BackButton;
