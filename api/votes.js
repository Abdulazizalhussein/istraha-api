const BIN_ID  = "69c77db2c3097a1dd56ba19c";
const BIN_KEY = "$2a$10$/JTvoAU60TOtiKzlVNOmeuyJss/zRTeJeMTiI2XI2s.DLUZk8cEle";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
  const HEADERS = {
    "Content-Type": "application/json",
    "X-Master-Key": BIN_KEY
  };

  try {
    if (req.method === "GET") {
      const r = await fetch(`${BIN_URL}/latest`, { headers: HEADERS });
      const d = await r.json();
      return res.status(200).json({ votes: d.record?.votes || {} });
    }

    if (req.method === "POST") {
      const votes = req.body?.votes ?? {};
      await fetch(BIN_URL, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify({ votes })
      });
      return res.status(200).json({ ok: true });
    }
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }

  return res.status(405).end();
}
