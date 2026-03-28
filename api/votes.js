const BIN_ID  = "69c77db2c3097a1dd56ba19c";
const BIN_KEY = "$2a$10$/JTvoAU60TOtiKzlVNOmeuyJss/zRTeJeMTiI2XI2s.DLUZk8cEle";
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const BIN_HDR = { "Content-Type": "application/json", "X-Master-Key": BIN_KEY };

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const r = await fetch(`${BIN_URL}/latest`, { headers: BIN_HDR });
      const d = await r.json();
      return res.status(200).json({ votes: d.record?.votes || {} });
    }

    if (req.method === "POST") {
      // Log what we receive for debugging
      const body = req.body;
      const votes = (typeof body === "object" ? body?.votes : JSON.parse(body || "{}").votes) ?? {};
      
      const r = await fetch(BIN_URL, {
        method: "PUT",
        headers: BIN_HDR,
        body: JSON.stringify({ votes })
      });
      const d = await r.json();
      
      if (d.record) {
        return res.status(200).json({ ok: true, votes: d.record.votes });
      }
      return res.status(200).json({ ok: true, raw: d });
    }
  } catch (e) {
    return res.status(500).json({ error: String(e), stack: e.stack });
  }

  return res.status(405).end();
}
