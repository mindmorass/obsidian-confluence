FROM ghcr.io/puppeteer/puppeteer:24.37.2@sha256:59818936eb9768ba3c1681441ec62e8aacaa67c074e2573bd66bf78a065b31e1

COPY ./dist /app

ENV NODE_OPTIONS=--enable-source-maps PUPPETEER_CACHE_DIR="/home/pptruser/.cache/puppeteer"

WORKDIR "/content"

CMD ["node", "/app/index.js"]
