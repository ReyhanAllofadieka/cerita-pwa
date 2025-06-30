module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{html,js,css,png,jpg,jpeg,svg,json}'
  ],
  swDest: 'dist/sw.js',
  runtimeCaching: [
    {
      urlPattern: ({ request }) => request.destination === 'document',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'html-cache',
      },
    },
    {
      urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'asset-cache',
      },
    },
    {
      urlPattern: ({ url }) => url.origin === 'https://story-api.dicoding.dev', // ganti jika pakai URL lain
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
      },
    }
  ]
};
