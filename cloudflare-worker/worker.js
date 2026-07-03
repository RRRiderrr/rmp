export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, HTTP-Referer, X-OpenRouter-Title, X-OpenRouter-Key, X-TMDB-Key, X-RMP-TMDB-Key',
      'Access-Control-Max-Age': '86400'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      if (url.pathname.startsWith('/image/')) {
        return await handleTmdbImage(request, env, corsHeaders);
      }
      if (url.pathname.startsWith('/tmdb/')) {
        return await handleTmdb(request, env, corsHeaders);
      }
      if (url.pathname === '/openrouter') {
        return await handleOpenRouter(request, env, corsHeaders);
      }
      if (url.pathname === '/health') {
        return json({ ok: true, service: 'rmp-vpn-worker', keyMode: 'client-script-or-secret' }, 200, corsHeaders);
      }
      return json({ error: 'Not found' }, 404, corsHeaders);
    } catch (error) {
      return json({ error: error?.message || 'Worker error' }, 500, corsHeaders);
    }
  }
};

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

function getHeader(request, name) {
  return request.headers.get(name) || request.headers.get(name.toLowerCase()) || '';
}

function getClientTmdbKey(request, env, url) {
  return (
    getHeader(request, 'X-TMDB-Key') ||
    getHeader(request, 'X-RMP-TMDB-Key') ||
    url.searchParams.get('api_key') ||
    env.TMDB_API_KEY ||
    ''
  ).trim();
}

function getClientOpenRouterAuth(request, env) {
  const auth = getHeader(request, 'Authorization');
  if (auth) return auth;

  const key = (getHeader(request, 'X-OpenRouter-Key') || env.OPENROUTER_API_KEY || '').trim();
  return key ? `Bearer ${key.replace(/^Bearer\s+/i, '')}` : '';
}


async function handleTmdbImage(request, env, corsHeaders) {
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, corsHeaders);

  const incoming = new URL(request.url);
  const imagePath = incoming.pathname.replace(/^\/image/, ''); // /t/p/w500/xxx.jpg

  if (!/^\/t\/p\/(w\d+|original)\/[a-zA-Z0-9_./-]+$/.test(imagePath)) {
    return json({ error: 'Invalid TMDb image path' }, 400, corsHeaders);
  }

  const target = new URL(`https://image.tmdb.org${imagePath}`);
  incoming.searchParams.forEach((value, key) => target.searchParams.set(key, value));

  const upstream = await fetch(target.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'User-Agent': 'RMP-Worker-Image-Proxy/1.0'
    },
    cf: { cacheTtl: 86400, cacheEverything: true }
  });

  const headers = new Headers(corsHeaders);
  headers.set('Content-Type', upstream.headers.get('Content-Type') || 'image/jpeg');
  headers.set('Cache-Control', 'public, max-age=86400');
  headers.set('X-RMP-Image-Proxy', '1');
  return new Response(upstream.body, { status: upstream.status, headers });
}

async function handleTmdb(request, env, corsHeaders) {
  if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, corsHeaders);

  const incoming = new URL(request.url);
  const tmdbKey = getClientTmdbKey(request, env, incoming);
  if (!tmdbKey) {
    return json({ error: 'TMDb key is missing. Send X-TMDB-Key header or api_key query from script.js.' }, 401, corsHeaders);
  }

  const tmdbPath = incoming.pathname.replace(/^\/tmdb/, ''); // /3/movie/...
  const target = new URL(`https://api.themoviedb.org${tmdbPath}`);

  incoming.searchParams.forEach((value, key) => {
    if (key !== 'api_key') target.searchParams.set(key, value);
  });
  target.searchParams.set('api_key', tmdbKey);

  const upstream = await fetch(target.toString(), {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
    cf: { cacheTtl: 0, cacheEverything: false }
  });

  const body = await upstream.arrayBuffer();
  const headers = new Headers(corsHeaders);
  headers.set('Content-Type', upstream.headers.get('Content-Type') || 'application/json; charset=utf-8');
  headers.set('Cache-Control', 'no-store');
  return new Response(body, { status: upstream.status, headers });
}

async function handleOpenRouter(request, env, corsHeaders) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, corsHeaders);

  const authorization = getClientOpenRouterAuth(request, env);
  if (!authorization) {
    return json({ error: 'OpenRouter key is missing. Send Authorization or X-OpenRouter-Key header from script.js.' }, 401, corsHeaders);
  }

  const body = await request.text();
  const headers = {
    'Authorization': authorization,
    'Content-Type': 'application/json',
    'X-OpenRouter-Title': getHeader(request, 'X-OpenRouter-Title') || 'RMP AI Search'
  };

  const referer = getHeader(request, 'HTTP-Referer') || env.ALLOWED_ORIGIN || '';
  if (referer) headers['HTTP-Referer'] = referer;

  const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers,
    body
  });

  const responseHeaders = new Headers(corsHeaders);
  responseHeaders.set('Content-Type', upstream.headers.get('Content-Type') || 'application/json; charset=utf-8');
  responseHeaders.set('Cache-Control', 'no-store');
  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
}
