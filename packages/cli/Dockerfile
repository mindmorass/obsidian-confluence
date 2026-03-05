FROM ghcr.io/puppeteer/puppeteer:24.38.0@sha256:bcb4fd4543ceee3a6b8b9a81403ed4c09ae316dca8b857773cf67328c0c2ee3c

COPY ./dist /app

ENV NODE_OPTIONS=--enable-source-maps PUPPETEER_CACHE_DIR="/home/pptruser/.cache/puppeteer"

WORKDIR "/content"

CMD ["node", "/app/index.js"]
