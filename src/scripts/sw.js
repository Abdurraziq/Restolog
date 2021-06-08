import 'regenerator-runtime';

import {precacheAndRoute} from 'workbox-precaching';
import {clientsClaim, setCacheNameDetails} from 'workbox-core';
import {registerRoute} from 'workbox-routing';
import {CacheFirst, NetworkFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import CONFIG from './globals/config';

const {
  API_BASE_URL,
  PRECACHE_NAME,
  PRECACHE_PREFIX,
  PRECACHE_SUFFIX,
  API_CACHE_NAME,
  IMAGE_CACHE_NAME,
} = CONFIG;

self.skipWaiting();
clientsClaim();

setCacheNameDetails({
  prefix: PRECACHE_PREFIX,
  suffix: PRECACHE_SUFFIX,
  precache: PRECACHE_NAME,
});

precacheAndRoute(self.__WB_MANIFEST, {ignoreURLParametersMatching: [/.*/]});

registerRoute(
    ({url, request}) => {
      return url.origin === API_BASE_URL && request.destination !== 'image';
    },
    new NetworkFirst({cacheName: API_CACHE_NAME}),
);

registerRoute(
    ({url, request}) => {
      return url.origin === API_BASE_URL && request.destination === 'image';
    },
    new CacheFirst({
      cacheName: IMAGE_CACHE_NAME,
      plugins: [
        new CacheableResponsePlugin({statuses: [0, 200]}),
        new ExpirationPlugin({
          maxEntries: 40,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    }),
);
