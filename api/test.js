export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const BIN_ID  = "69c77db2c3097a1dd56ba19c";
  const BIN_KEY = "a$10$0yAyzdJkccLLxr4kpnEezurL5Puqmk0NK0O0EvgMKEbwJoybGr9ES";
  const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
  const HDR = { "Content-Type": "application/json", "X-Master-Key": BIN_KEY };

  const putRes = await fetch(BIN_URL, {
    method: "PUT", headers: HDR,
    body: JSON.stringify({ votes: { "TEST": ["ali"] } })
  });
  const putText = await putRes.text();
  const getRes  = await fetch(`${BIN_URL}/latest`, { headers: HDR });
  const getText = await getRes.text();

  return res.status(200).json({
    put_status: putRes.status, put: putText.slice(0,200),
    get_status: getRes.status, get: getText.slice(0,200)
  });
}
