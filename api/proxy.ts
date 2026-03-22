import type { VercelRequest, VercelResponse } from '@vercel/node';
import https from 'https';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const path = (req.query.path as string) || '';
  const search = req.url?.split('?').slice(1).join('?') || '';
  // Remove path= param from forwarded query
  const cleanSearch = search
    .split('&')
    .filter((p) => !p.startsWith('path='))
    .join('&');

  const target = `https://api.poiskkino.dev${path}${cleanSearch ? '?' + cleanSearch : ''}`;

  const options = {
    headers: {
      'X-API-KEY': process.env.VITE_KINOPOISK_API_KEY || '',
      'Content-Type': 'application/json',
    },
  };

  https.get(target, options, (apiRes) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(apiRes.statusCode || 200);
    apiRes.pipe(res);
  }).on('error', (e) => {
    res.status(500).json({ error: e.message });
  });
}
