FROM ghcr.io/puppeteer/puppeteer:24.37.1@sha256:f34793b5c3eabbcf735d543d0de5eaefb83647c71aac8d6c4c9b4354e187c885

COPY ./dist /app

ENV NODE_OPTIONS=--enable-source-maps PUPPETEER_CACHE_DIR="/home/pptruser/.cache/puppeteer"

WORKDIR "/content"

CMD ["node", "/app/index.js"]
