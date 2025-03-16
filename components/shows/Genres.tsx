import React from "react";

interface GenresProps {
  genres: {
    id: number;
    name: string;
  }[];
}

const Genres = ({ genres }: GenresProps) => {
  return (
    <div className="flex items-center gap-2">
      {genres.map((genre) => (
        <span
          key={genre.id}
          className="border border-dark-400 text-xs rounded-full text-dark-200 px-3 py-[2px]"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
};

export default Genres;
