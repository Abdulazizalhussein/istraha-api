const BIN_ID  = "69c77db2c3097a1dd56ba19c";
const BIN_KEY = "$2a$10$/JTvoAU60TOtiKzlVNOmeuyJss/zRTeJeMTiI2XI2s.DLUZk8cEle";
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

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
      const text = await r.text();
      console.log("GET response:", r.status, text.slice(0,200));
      const d = JSON.parse(text);
      return res.status(200).json({ votes: d.record?.votes || {} });
    }

    if (req.method === "POST") {
      const body = req.body;
      const votes = body?.votes ?? {};
      console.log("POST votes:", JSON.stringify(votes).slice(0,200));

      const r = await fetch(BIN_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": BIN_KEY
        },
        body: JSON.stringify({ votes })
      });
      const text = await r.text();
      console.log("PUT response:", r.status, text.slice(0,300));

      return res.status(r.status).json({ ok: r.ok, status: r.status, raw: text.slice(0,200) });
    }
  } catch (e) {
    console.error("Error:", e.message);
    return res.status(500).json({ error: e.message });
  }

  return res.status(405).end();
}
