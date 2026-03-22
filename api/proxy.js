export default async function handler(req, res) {
  try {
    const url = req.url || '';
    const path = url.replace(/^\/api/, '');
    const target = `https://api.poiskkino.dev${path}`;

    const API_KEY = 'PRHT9N8-VCN4SYB-Q327F2T-XC37DTB';

    const apiRes = await fetch(target, {
      method: req.method || 'GET',
      headers: {
        'X-API-KEY': API_KEY,
        'Accept': 'application/json',
      },
    });

    const text = await apiRes.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(apiRes.status).send(text);
  } catch (e) {
    console.error('Proxy error:', e);
    res.status(500).json({ error: e.message });
  }
}
