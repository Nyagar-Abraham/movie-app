"use client";

import Video from "next-video";
import getStarted from "/videos/get-started.mp4";
import { Video as VideoType } from "@/utils/interfaces";
import YouTube, { YouTubeProps } from "react-youtube";

interface VideosProps {
  videos: VideoType[];
  className?: string;
}

const Videos = ({ videos, className }: VideosProps) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts = {
    width: "300px",
    height: "200px",
  };

  return (
    <div className="flex-none w-full ">
      <div className="flex w-full rounded-lg  gap-4 overflow-scroll hide-scrollbar">
        {videos.map((video: VideoType) => {
          if (video.site !== "YouTube") return null;

          return (
            <div
              key={video.key}
              className="border bg-black border-dark-400/40 rounded-lg overflow-hidden relative flex-none"
            >
              <p className="text-sm px-6 py-3 font-medium">
                Type: {video.type} - {video?.official ? "Official" : "General"}
              </p>
              <YouTube
                videoId={video.key}
                onReady={onPlayerReady}
                opts={opts}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Videos;
