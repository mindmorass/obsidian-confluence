FROM ghcr.io/puppeteer/puppeteer:24.36.0@sha256:60273620ab047d273d77f8535cd3adaffa9c138e3b38ba7934d8934a7b5d3c92

COPY ./dist /app

ENV NODE_OPTIONS=--enable-source-maps PUPPETEER_CACHE_DIR="/home/pptruser/.cache/puppeteer"

WORKDIR "/content"

CMD ["node", "/app/index.js"]
