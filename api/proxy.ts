import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Extract everything after /api from the original URL
    const url = req.url || '';
    const afterApi = url.replace(/^\/api/, '');

    const target = `https://api.poiskkino.dev${afterApi}`;

    const apiRes = await fetch(target, {
      headers: {
        'X-API-KEY': process.env.VITE_KINOPOISK_API_KEY || '',
        'Content-Type': 'application/json',
      },
    });

    const data = await apiRes.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(apiRes.status).json(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
}
