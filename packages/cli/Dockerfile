FROM ghcr.io/puppeteer/puppeteer:24.35.0@sha256:f9032ca7bfc11f3d808377f0d2ddd8c1068c3f1a0daf8032166d14cd7cc4d2be

COPY ./dist /app

ENV NODE_OPTIONS=--enable-source-maps PUPPETEER_CACHE_DIR="/home/pptruser/.cache/puppeteer"

WORKDIR "/content"

CMD ["node", "/app/index.js"]
