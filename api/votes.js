const BIN_ID  = "69c77db2c3097a1dd56ba19c";
const BIN_KEY = "$2a$10$/JTvoAU60TOtiKzlVNOmeuyJss/zRTeJeMTiI2XI2s.DLUZk8cEle";
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Read raw body manually — fixes Vercel body parsing issues
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => data += chunk);
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

export const config = { api: { bodyParser: false } }; // disable built-in parser

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const r = await fetch(`${BIN_URL}/latest`, {
        headers: { "X-Master-Key": BIN_KEY }
      });
      const d = await r.json();
      return res.status(200).json({ votes: d.record?.votes || {} });
    }

    if (req.method === "POST") {
      const raw = await getRawBody(req);
      const body = JSON.parse(raw || "{}");
      const votes = body.votes ?? {};

      const r = await fetch(BIN_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": BIN_KEY
        },
        body: JSON.stringify({ votes })
      });
      const d = await r.json();
      return res.status(200).json({ ok: true, votes: d.record?.votes || votes });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }

  return res.status(405).end();
}
