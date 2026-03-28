import { kv } from "@vercel/kv";

const KEY = "istraha_votes";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    const votes = (await kv.get(KEY)) || {};
    return res.status(200).json({ votes });
  }

  if (req.method === "POST") {
    const votes = req.body?.votes ?? {};
    await kv.set(KEY, votes);
    return res.status(200).json({ ok: true, votes });
  }

  return res.status(405).end();
}
