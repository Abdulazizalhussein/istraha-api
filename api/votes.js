const BIN_ID  = "69c78d22aa77b81da92acfe8";
const BIN_KEY = "$2a$10$0yAyzdJkccLLxr4kpnEezurL5Puqmk0NK0O0EvgMKEbwJoybGr9ES";
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const HDR     = { "Content-Type": "application/json", "X-Master-Key": BIN_KEY };

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => data += chunk);
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const r = await fetch(`${BIN_URL}/latest`, { headers: HDR });
      const d = await r.json();
      return res.status(200).json({ votes: d.record?.votes || {} });
    }

    if (req.method === "POST") {
      const raw  = await getRawBody(req);
      const votes = JSON.parse(raw || "{}").votes ?? {};
      const r = await fetch(BIN_URL, {
        method: "PUT", headers: HDR,
        body: JSON.stringify({ votes })
      });
      const d = await r.json();
      return res.status(200).json({ ok: r.ok, votes: d.record?.votes || votes });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
  return res.status(405).end();
}
