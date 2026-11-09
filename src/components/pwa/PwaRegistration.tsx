'use client';

import { useEffect } from 'react';

const SERVICE_WORKER_URL = '/service-worker.js';

/** Registers the production worker and keeps local development free of stale caches. */
export function PwaRegistration() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    if (process.env.NODE_ENV !== 'production') {
      void navigator.serviceWorker.getRegistrations().then((registrations) =>
        Promise.all(registrations.map((registration) => registration.unregister())),
      );
      if ('caches' in window) {
        void caches.keys().then((keys) =>
          Promise.all(
            keys
              .filter((key) => key.startsWith('programming-tech-'))
              .map((key) => caches.delete(key)),
          ),
        );
      }
      return;
    }

    void navigator.serviceWorker
      .register(SERVICE_WORKER_URL, { scope: '/', updateViaCache: 'none' })
      .then((registration) => registration.update())
      .catch((error) => console.error('Service Worker registration failed:', error));
  }, []);

  return null;
}
