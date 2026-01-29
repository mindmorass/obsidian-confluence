FROM ghcr.io/puppeteer/puppeteer:24.36.1@sha256:407c7ea5be37dad19fd428f56057450045e57db38d9315548f84fe99f6b8336e

COPY ./dist /app

ENV NODE_OPTIONS=--enable-source-maps PUPPETEER_CACHE_DIR="/home/pptruser/.cache/puppeteer"

WORKDIR "/content"

CMD ["node", "/app/index.js"]
