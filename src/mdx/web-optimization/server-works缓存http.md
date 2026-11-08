我已经加上了调试头，修改在 service-worker.js (line 1)。现在这 3 个接口的响应里会带一个 x-sw-cache：

- hit：10 分钟内直接命中 service worker 缓存
- miss：本地没缓存，回源后写入缓存
- stale-refresh：本地有旧缓存，但已超过 10 分钟，所以重新请求服务端并覆盖缓存

原理很直接：service worker 拦截浏览器的 fetch，只对白名单接口生效。它先用“完整请求 URL”查 Cache Storage，如果命中且 x-sw-cached-at 没过 10 分钟，就直接返回缓存；否则走网络请求，并把新响应重新写回缓存。因为 key 是完整 URL，所以不同 query string 会分开缓存，比如不同 date 会是不同条目。

```js
const CACHE_NAME = "a-trade-v2";
const API_CACHE_NAME = "a-trade-api-v2";
const SIGNALS_CACHE_TTL_MS = 10 * 60 * 1000;
const APP_SHELL = ["/", "/dashboard", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png", "/title.png"];
const CACHED_API_PATH_SUFFIXES = ["/api/stock/signals", "/api/stock/daily-ranking", "/api/stock/daily-limit"];

async function buildCachedApiResponse(response) {
  const headers = new Headers(response.headers);
  headers.set("x-sw-cached-at", String(Date.now()));

  return new Response(await response.blob(), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME && key !== API_CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isApiRequest = isSameOrigin && requestUrl.pathname.startsWith("/api/");
  const isCachedApiRequest =
    isSameOrigin && CACHED_API_PATH_SUFFIXES.some((suffix) => requestUrl.pathname.endsWith(suffix));
  const isDocumentRequest = event.request.mode === "navigate" || event.request.destination === "document";
  const isStaticAsset =
    event.request.destination === "style" ||
    event.request.destination === "script" ||
    event.request.destination === "worker" ||
    event.request.destination === "image" ||
    event.request.destination === "font" ||
    event.request.destination === "manifest";

  if (isCachedApiRequest) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(API_CACHE_NAME);
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
          const cachedAt = Number(cachedResponse.headers.get("x-sw-cached-at") || "0");
          if (Date.now() - cachedAt < SIGNALS_CACHE_TTL_MS) {
            return cachedResponse;
          }
        }

        const response = await fetch(event.request);
        if (response.ok) {
          void cache.put(event.request, await buildCachedApiResponse(response.clone()));
        }
        return response;
      })(),
    );
    return;
  }

  if (!isSameOrigin || isApiRequest || isDocumentRequest || !isStaticAsset) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const responseToCache = response.clone();
          void caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          return response;
        })
        .catch(() => caches.match(event.request));
    }),
  );
});
```