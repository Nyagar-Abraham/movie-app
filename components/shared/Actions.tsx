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

  async function handleAction(field: "saved" | "favorites") {
    try {
      setIsUpdating(true);
      // check if the show exists
      const _id = await getShow(showId.toString());

      let id;
      let fielToAdd;
      //if it doesn1t exist, create it

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

      let message;

      if (field === "favorites") {
        message = isFavorite
          ? `${showData.title} successfull removed from favorites`
          : `${showData.title} successfull added to favorites`;
      }

      if (field === "saved") {
        message = isSaved
          ? `${showData.title} successfull removed from bookmaks`
          : `${showData.title} successfull added to bookmarks`;
      }

      if (id) {
        toast({
          title: "Success",
          description: message,
          variant: "default",
        });
      } else {
        toast({
          title: "failed",
          description: `something went wrong`,
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

          await updateShowMetrics({
            _id,
            user_id: userId,
            field: "views",
            action: "add",
            path: pathname,
          });
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
          "h-[28px] w-[28px] rounded-full flex-center gap-1   flex-center bg-transparent",
          {
            "absolute top-4 right-5": !isDetailCard,
          }
        )}
      >
        <Heart
          className={cn("size-5 hover:text-secondary-100", {
            "text-secondary-100 fill-secondary-100": isFavorite,
          })}
        />{" "}
        <span className="text-sm">{mongoShow?.favorites?.length}</span>
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
