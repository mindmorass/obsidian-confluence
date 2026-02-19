FROM ghcr.io/puppeteer/puppeteer:24.37.5@sha256:19d010877be7911acd7ad1795f603b4ca604c88c26848b81d1d9914e85a289e4

COPY ./dist /app

ENV NODE_OPTIONS=--enable-source-maps PUPPETEER_CACHE_DIR="/home/pptruser/.cache/puppeteer"

WORKDIR "/content"

CMD ["node", "/app/index.js"]
