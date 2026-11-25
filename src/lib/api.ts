import { authClient } from "./auth-client";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const EVENT_TYPES = ["Iftar Packet", "Sehri Meal", "Food Pack", "Water & Dates", "Eid Gift"] as const;

export type EventItem = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  capacity: number;
  creatorEmail: string;
  creatorName?: string;
  joinedCount?: number;
};

export type JoinedItem = { _id: string; joinedAt: string; event: EventItem };

export class ApiError extends Error {}

/** Calls the Express API. With auth=true the BetterAuth JWT is sent as a Bearer token. */
export async function apiFetch<T>(path: string, options: RequestInit = {}, auth = false): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) {
    const { data } = await authClient.token();
    if (!data?.token) throw new ApiError("Your session has expired. Please log in again.");
    headers.Authorization = `Bearer ${data.token}`;
  }
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { ...options, headers: { ...headers, ...options.headers } });
  } catch {
    throw new ApiError("Cannot reach the server. Please try again shortly.");
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(body?.message ?? "Something went wrong.");
  return body as T;
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { timeZone: "Asia/Dhaka", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
