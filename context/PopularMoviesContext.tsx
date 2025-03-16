"use client";

import { createContext, useContext, useMemo, useState, useEffect } from "react";

interface PopularMoviesContextType {
  index: number;
  incrementIndex: (newIndex: number) => void;
  resetIndex: () => void;
}

const PopularMoviesContext = createContext<
  PopularMoviesContextType | undefined
>(undefined);

export const PopularMoviesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [index, setIndex] = useState<number>(0);

  const incrementIndex = (newIndex: number) => {
    setIndex(newIndex);
    localStorage.setItem("count", JSON.stringify(newIndex));
  };

  const resetIndex = () => {
    setIndex(0);
    localStorage.setItem("count", JSON.stringify(0));
  };

  const value = useMemo(() => ({ index, incrementIndex, resetIndex }), [index]);

  return (
    <PopularMoviesContext.Provider value={value}>
      {children}
    </PopularMoviesContext.Provider>
  );
};

export const usePopularMoviesContext = () => {
  const context = useContext(PopularMoviesContext);

  if (!context) {
    throw new Error(
      "usePopularMoviesContext must be used within a PopularMoviesProvider"
    );
  }

  return context;
};
