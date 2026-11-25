import { createHmac } from "node:crypto";
import { MongoClient } from "mongodb";

export const runtime = "nodejs";
const client = new MongoClient(process.env.MONGODB_URI as string, { serverSelectionTimeoutMS: 5000 });
const db = client.db("iftarshareAuthDB");
let indexReady: Promise<string> | undefined;
const reply = (message: string, status = 200) => Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowed = new URL(process.env.BETTER_AUTH_URL || request.url).origin;
  if (origin !== allowed) return reply("Please subscribe from the IftarShare website.", 403);
  if (Number(request.headers.get("content-length")) > 2048) return reply("The request is too large.", 413);
  let body;
  try {
    const text = await request.text();
    if (text.length > 2048) return reply("The request is too large.", 413);
    body = JSON.parse(text);
  } catch { return reply("Please enter an email address.", 400); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return reply("Please enter an email address.", 400);
  if (body.website) return reply("Unable to accept this request.", 400);
  if (body.consent !== true) return reply("Please agree to storing your email before subscribing.", 400);
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply("Enter a valid email address.", 400);
  try {
    const secret = process.env.BETTER_AUTH_SECRET;
    if (!secret) throw new Error("Missing rate-limit secret");
    const limits = db.collection<{ _id: string; attempts: number; expiresAt: Date }>("newsletterRateLimits");
    indexReady ??= limits.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    await indexReady;
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    const key = createHmac("sha256", secret).update(`${ip}:${Math.floor(Date.now() / 60000)}`).digest("hex");
    const limit = await limits.findOneAndUpdate({ _id: key }, {
      $inc: { attempts: 1 }, $setOnInsert: { expiresAt: new Date(Date.now() + 120000) },
    }, { upsert: true, returnDocument: "after" });
    if ((limit?.attempts ?? 0) > 5) return reply("Please wait a minute before trying again.", 429);
    await db.collection<{ _id: string; email: string; createdAt: Date; consentVersion: string }>("newsletterSubscriptions").updateOne(
      { _id: email }, { $setOnInsert: { email, createdAt: new Date(), consentVersion: "event-updates-v1" } }, { upsert: true },
    );
    return reply("Your email is on the event updates list. Thank you.");
  } catch (error) {
    indexReady = undefined;
    console.error("Newsletter signup failed:", error instanceof Error ? error.name : "Unknown error");
    return reply("Could not save your email. Please try again shortly.", 503);
  }
}
