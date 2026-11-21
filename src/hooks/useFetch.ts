"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

// Loads data from the API. `data` stays null while loading.
export function useFetch<T>(path: string, auth = false) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    setData(null);
    setError("");
    apiFetch<T>(path, {}, auth)
      .then((result) => {
        if (!ignore) setData(result);
      })
      .catch((err: Error) => {
        if (!ignore) setError(err.message);
      });
    return () => {
      ignore = true;
    };
  }, [path, auth]);

  return { data, setData, error };
}
