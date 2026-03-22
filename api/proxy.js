export default async function handler(req, res) {
  try {
    const url = req.url || '';
    // url will be like /api/v1.4/movie?...
    // strip leading /api to get /v1.4/movie?...
    const path = url.replace(/^\/api/, '');
    const target = `https://api.poiskkino.dev${path}`;

    console.log('Proxying to:', target);
    console.log('API KEY present:', !!process.env.VITE_KINOPOISK_API_KEY);

    const apiRes = await fetch(target, {
      method: req.method || 'GET',
      headers: {
        'X-API-KEY': process.env.KINOPOISK_API_KEY || process.env.VITE_KINOPOISK_API_KEY || '',
        'Accept': 'application/json',
      },
    });

    const text = await apiRes.text();
    console.log('API status:', apiRes.status);
    console.log('API response preview:', text.slice(0, 200));

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(apiRes.status).send(text);
  } catch (e) {
    console.error('Proxy error:', e);
    res.status(500).json({ error: e.message, stack: e.stack });
  }
}
