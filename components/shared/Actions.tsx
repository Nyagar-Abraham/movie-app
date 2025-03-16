"use client";

import { icons } from "@/constants/icons";
import {
  createShow,
  getShow,
  updateShowMetrics,
} from "@/lib/actions/show.action";
import { cn } from "@/lib/utils";
import { MongoShow, ShowData } from "@/utils/interfaces";
import { useAuth } from "@clerk/nextjs";
import { Bookmark, Eye, Heart, Loader } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { type } from "os";
import useMatchPath from "@/hooks/useMatchPathname";

interface ActionsProps {
  isDetailCard?: boolean;
  showData: ShowData;
  showId: string;
  mongoShow: MongoShow | null;
}

// interface addShowMetricsParams {
//   newShowData: {
//     showData: {
//       title: string;
//       show_id: string;
//       vote_average: number;
//       vote_count: number;
//       release_date: string;
//       category: string;
//     };
//     field: "view" | "like" | "save";
//     action: "add" | "remove";
//     path: string;
//   };
//   updateShowData: {
//     show_id: string;
//     user_id: string;
//     field: "view" | "like" | "save";
//     action: "add" | "remove";
//     path: string;
//   };
// }

const Actions = ({
  mongoShow,
  isDetailCard,
  showId,
  showData,
}: ActionsProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const auth = useAuth();
  const { toast } = useToast();
  const match = useMatchPath();
  const pathname = usePathname();
  const userId = auth.userId as string;

  const isSaved = mongoShow?.saved?.includes(userId);
  const isFavorite = mongoShow?.favorites?.includes(userId);
  const isViewed = mongoShow?.views?.includes(userId);

  console.log({ userId });
  async function handleAction(field: "saved" | "favorites") {
    try {
      setIsUpdating(true);
      // check if the show exists
      const _id = await getShow(showId.toString());

      let id;
      let fielToAdd;
      //if it doesn1t exist, create it
      console.log(!_id, "show_id");
      if (!_id) {
        if (field === "saved") fielToAdd = { saved: [userId] };
        if (field === "favorites") fielToAdd = { favorites: [userId] };

        id = await createShow({
          showData: { ...showData, ...fielToAdd },
          path: pathname,
        });
      } else {
        let operation: "add" | "remove";

        if (
          (field === "saved" && isSaved) ||
          (field === "favorites" && isFavorite)
        )
          operation = "remove";
        if (
          (field === "saved" && !isSaved) ||
          (field === "favorites" && !isFavorite)
        )
          operation = "add";

        id = await updateShowMetrics({
          _id,
          user_id: userId!,
          field,
          action: operation!,
          path: pathname,
        });
      }

      //show confirmation feedback
      console.log({ id });
      if (id) {
        toast({
          title: "Success",
          description: `${field} successfull`,
          variant: "default",
        });
      } else {
        toast({
          title: "failed",
          description: `${field} failed`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  }

  useEffect(() => {
    if (!match) return;

    async function handleView() {
      try {
        // Check if the show exists
        let _id = await getShow(showId.toString());

        if (!_id) {
          // Create the show if it doesn't exist
          const _id = await createShow({
            showData: { ...showData },
            path: pathname,
          });

          if (!_id) throw new Error("Failed to create show");

          console.log(1, _id);
          await updateShowMetrics({
            _id,
            user_id: userId,
            field: "views",
            action: "add",
            path: pathname,
          });
          console.log(2, _id);
        } else {
          await updateShowMetrics({
            _id,
            user_id: userId,
            field: "views",
            action: "add",
            path: pathname,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleView();
  }, []);

  return (
    <div
      className={cn("flex items-center", {
        "absolute top-4 right-5": !isDetailCard,
      })}
    >
      <button
        className={cn(
          "h-[28px] w-[28px] rounded-full pointer-events-none hidden    bg-transparent",
          {
            block: isUpdating,
          }
        )}
      >
        <Loader
          className={cn("size-5 hover:text-secondary-100", {
            "text-secondary-100 fill-secondary-100 animate-spin": isUpdating,
          })}
        />
      </button>
      <button
        disabled={isUpdating}
        className={cn(
          "h-[28px]  rounded-full gap-1 mr-2   flex-center bg-transparent",
          {
            "absolute top-4 right-5": !isDetailCard,
          }
        )}
      >
        <Eye
          className={cn("size-5 hover:text-secondary-100", {
            "text-secondary-100 fill-secondary-100": isViewed,
          })}
        />
        <span className="text-sm">{mongoShow?.views?.length}</span>
      </button>
      <button
        disabled={isUpdating}
        onClick={() => handleAction("favorites")}
        className={cn(
          "h-[28px] w-[28px] rounded-full   flex-center bg-transparent",
          {
            "absolute top-4 right-5": !isDetailCard,
          }
        )}
      >
        <Heart
          className={cn("size-5 hover:text-secondary-100", {
            "text-secondary-100 fill-secondary-100": isFavorite,
          })}
        />
      </button>
      <button
        disabled={isUpdating}
        onClick={() => handleAction("saved")}
        className={cn(
          "h-[28px] w-[28px] rounded-full   flex-center bg-transparent",
          {
            "absolute top-4 right-5": !isDetailCard,
          }
        )}
      >
        <Bookmark
          className={cn("size-5 hover:text-secondary-100", {
            "text-secondary-100 fill-secondary-100": isSaved,
          })}
        />
      </button>
    </div>
  );
};

export default Actions;
