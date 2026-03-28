export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const BIN_ID  = "69c78d22aa77b81da92acfe8";
  const BIN_KEY = "$2a$10$0yAyzdJkccLLxr4kpnEezurL5Puqmk0NK0O0EvgMKEbwJoybGr9ES";
  const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
  const HDR     = { "Content-Type": "application/json", "X-Master-Key": BIN_KEY };

  // Reset to empty
  const r = await fetch(BIN_URL, {
    method: "PUT", headers: HDR,
    body: JSON.stringify({ votes: {} })
  });
  const d = await r.json();
  return res.status(200).json({ ok: r.ok, record: d.record });
}
