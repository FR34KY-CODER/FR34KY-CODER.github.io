"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PROJECTS, type ProjectCaseStudy } from "@/data/projects";
import library from "@/data/playback.json";
type Catalog = {
  city: string;
  timezone: string;
  projects: ProjectCaseStudy[];
  movies: string[][];
  series: string[][];
  tracks: typeof library;
};
const empty: Catalog = {
  city: "Jaipur",
  timezone: "Asia/Kolkata",
  projects: [],
  movies: [],
  series: [],
  tracks: [],
};
const Context = createContext({
  ...empty,
  projects: PROJECTS,
  tracks: library,
  refresh: async () => {},
});
export function CatalogProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(empty);
  const refresh = useCallback(async () => {
    if (process.env.NEXT_PUBLIC_STATIC_CONTACT === "true") return;
    const res = await fetch("/api/manage?action=catalog", { method: "POST" });
    if (res.ok) setData(await res.json());
  }, []);
  useEffect(() => {
    void refresh().catch(() => {});
  }, [refresh]);
  const value = useMemo(
    () => ({
      ...data,
      projects: [...PROJECTS, ...data.projects],
      tracks: [...library, ...data.tracks],
      refresh,
    }),
    [data, refresh],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useCatalog = () => useContext(Context);
