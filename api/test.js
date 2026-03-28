export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const BIN_ID  = "69c78d22aa77b81da92acfe8";
  const BIN_KEY = "$2a$10$0yAyzdJkccLLxr4kpnEezurL5Puqmk0NK0O0EvgMKEbwJoybGr9ES";
  const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
  const HDR     = { "Content-Type": "application/json", "X-Master-Key": BIN_KEY };

  const put = await fetch(BIN_URL, {
    method: "PUT", headers: HDR,
    body: JSON.stringify({ votes: { TEST: ["ali"] } })
  });
  const putText = await put.text();

  const get = await fetch(`${BIN_URL}/latest`, { headers: HDR });
  const getText = await get.text();

  return res.status(200).json({
    put_status: put.status, put: JSON.parse(putText),
    get_status: get.status, get: JSON.parse(getText)
  });
}
