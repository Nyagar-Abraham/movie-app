import { cn } from "@/lib/utils";

interface Props {
  message: string;
  className?: string;
  classNameText?: string;
}

const NoResult = ({ message, className, classNameText }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-[20rem]  h-full",
        className
      )}
    >
      <h2
        className={cn(
          "text-2xl mt-8 text-accent-100 bg-dark100-light0",
          classNameText
        )}
      >
        {message}
      </h2>
    </div>
  );
};

export default NoResult;
