FROM ghcr.io/puppeteer/puppeteer:24.39.0@sha256:7b9b6737274d44867a9a07fdb67ab6a0339558a5c0dd83805ef2a2fbe7eccd7a

COPY ./dist /app

ENV NODE_OPTIONS=--enable-source-maps PUPPETEER_CACHE_DIR="/home/pptruser/.cache/puppeteer"

WORKDIR "/content"

CMD ["node", "/app/index.js"]
