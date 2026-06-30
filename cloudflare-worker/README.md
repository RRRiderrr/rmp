# RMP VPN Cloudflare Worker

Этот Worker проксирует только:
- TMDb API: `/tmdb/3/...`
- OpenRouter AI search: `/openrouter`

Сам просмотр фильмов не трогается.

## Режим ключей

В этой версии Secrets в Cloudflare не обязательны.
Worker берёт ключи из запросов сайта:

- TMDb: header `X-TMDB-Key` или query `api_key`
- OpenRouter: header `Authorization` или `X-OpenRouter-Key`

Ключи берутся из `script.js` сайта. Это проще, но менее безопасно: пользователь может увидеть ключи в DevTools.

## Опционально

Если захочешь позже перейти на нормальный безопасный вариант, можно добавить Cloudflare Secrets:
- `TMDB_API_KEY`
- `OPENROUTER_API_KEY`

Worker всё ещё умеет использовать Secrets как fallback.


## TMDb images / posters

В v28 Worker также проксирует постеры и backdrop-картинки TMDb.
Сайт при включённом RMP VPN автоматически меняет ссылки вида:

```txt
https://image.tmdb.org/t/p/w500/...jpg
```

на:

```txt
https://YOUR-WORKER.workers.dev/image/t/p/w500/...jpg
```

Это нужно для пользователей, у которых API через Worker работает, но `image.tmdb.org` не открывается напрямую.
