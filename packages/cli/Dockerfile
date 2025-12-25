FROM ghcr.io/puppeteer/puppeteer:24.34.0@sha256:10da2500456c6a8ba5674599f1052c1129a5af90940d98c1ab7ca2b0530c5b84

COPY ./dist /app

ENV NODE_OPTIONS=--enable-source-maps PUPPETEER_CACHE_DIR="/home/pptruser/.cache/puppeteer"

WORKDIR "/content"

CMD ["node", "/app/index.js"]
