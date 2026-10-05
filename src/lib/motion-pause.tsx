"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type MotionPause = {
  paused: boolean;
  togglePause: () => void;
};

const Ctx = createContext<MotionPause>({
  paused: false,
  togglePause: () => {},
});

export function useMotionPause() {
  return useContext(Ctx);
}

export function MotionPauseProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("motion-paused", paused);
    return () => document.documentElement.classList.remove("motion-paused");
  }, [paused]);

  return (
    <Ctx.Provider
      value={{ paused, togglePause: () => setPaused((value) => !value) }}
    >
      {children}
    </Ctx.Provider>
  );
}
