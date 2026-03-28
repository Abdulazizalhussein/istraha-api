export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  const BIN_ID  = "69c77db2c3097a1dd56ba19c";
  const BIN_KEY = "$2a$10$/JTvoAU60TOtiKzlVNOmeuyJss/zRTeJeMTiI2XI2s.DLUZk8cEle";
  const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  // Test PUT directly with hardcoded data
  try {
    const putRes = await fetch(BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": BIN_KEY
      },
      body: JSON.stringify({ votes: { "TEST": ["ali", "mshari"] } })
    });
    const putText = await putRes.text();
    
    // Now GET to verify
    const getRes = await fetch(`${BIN_URL}/latest`, {
      headers: { "X-Master-Key": BIN_KEY }
    });
    const getText = await getRes.text();
    
    return res.status(200).json({
      put_status: putRes.status,
      put_response: putText.slice(0, 300),
      get_status: getRes.status,
      get_response: getText.slice(0, 300)
    });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
