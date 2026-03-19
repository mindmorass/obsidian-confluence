FROM ghcr.io/puppeteer/puppeteer:24.40.0@sha256:de1c985f0af848b07599cdb20ec0509b1a69927cf466b65cf56eb706cc4245fb

COPY ./dist /app

ENV NODE_OPTIONS=--enable-source-maps PUPPETEER_CACHE_DIR="/home/pptruser/.cache/puppeteer"

WORKDIR "/content"

CMD ["node", "/app/index.js"]
