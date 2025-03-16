import { icons } from "@/constants/icons";
import Image from "next/image";

interface Props {
  open: boolean;
  width: number;
  height: number;
}

const Play = ({ open, width, height }: Props) => {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 rounded-full bg-slate-200/40 justify-center  items-center gap-4 size-16 ${open ? "flex" : "hidden"}`}
    >
      <Image
        src={icons.play}
        alt={`play icon`}
        className="object-cover"
        width={width}
        height={height}
      />
    </div>
  );
};

export default Play;
