FROM node:18-alpine AS network-test

ARG NETWORK_TIMEOUT=60000
ARG NPM_REGISTRY=https://registry.npmjs.org

RUN mkdir /diagnostics && \
  echo "\n=== NETWORK DIAGNOSTICS START ===\n" > /diagnostics/network.txt && \
  echo "DNS Config:" >> /diagnostics/network.txt && \
  cat /etc/resolv.conf >> /diagnostics/network.txt && \
  echo "\nPing NPM Registry:" >> /diagnostics/network.txt && \
  ping -c 4 registry.npmjs.org >> /diagnostics/network.txt || echo "Ping failed" >> /diagnostics/network.txt && \
  echo "\nNslookup NPM Registry:" >> /diagnostics/network.txt && \
  nslookup registry.npmjs.org >> /diagnostics/network.txt || echo "Nslookup failed" >> /diagnostics/network.txt && \
  echo "\n=== NETWORK DIAGNOSTICS END ===\n" >> /diagnostics/network.txt

FROM node:18-alpine AS stage-1

WORKDIR /app

COPY --from=network-test /diagnostics /app/diagnostics

RUN mkdir -p /app/logs

COPY package.json yarn.lock ./
COPY packages/specmash-server/package.json ./packages/specmash-server/

RUN yarn install --network-timeout 60000 --frozen-lockfile

COPY packages/specmash-server/ ./packages/specmash-server/

WORKDIR /app/packages/specmash-server

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
