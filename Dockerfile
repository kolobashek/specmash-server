FROM node:18-alpine AS network-test

# Сохраняем диагностику в папку, которая будет смонтирована
RUN mkdir /diagnostics && \
  echo "\n=== NETWORK DIAGNOSTICS START ===\n" > /diagnostics/network.txt && \
  echo "DNS Config:" >> /diagnostics/network.txt && \
  cat /etc/resolv.conf >> /diagnostics/network.txt && \
  echo "\nNetwork Routes:" >> /diagnostics/network.txt && \
  ip route >> /diagnostics/network.txt && \
  echo "\nDNS Test:" >> /diagnostics/network.txt && \
  nslookup registry.npmjs.org >> /diagnostics/network.txt 2>&1 || true && \
  echo "\nConnectivity Test:" >> /diagnostics/network.txt && \
  wget -q --spider https://registry.npmjs.org >> /diagnostics/network.txt 2>&1 || true && \
  echo "\n=== NETWORK DIAGNOSTICS END ===\n" >> /diagnostics/network.txt

FROM node:18-alpine

WORKDIR /app

# Копируем диагностику из предыдущего этапа
COPY --from=network-test /diagnostics /app/diagnostics

# Создаем директорию для логов
RUN mkdir -p /app/logs

# ... остальные команды
COPY yarn.lock ./
COPY packages/specmash-server/package*.json ./

RUN yarn install --network-timeout 60000 --frozen-lockfile

COPY packages/specmash-server/ .

RUN yarn build

EXPOSE 3000
CMD ["yarn", "dev", "--host", "0.0.0.0"]