FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps --only=production

COPY prisma ./prisma

RUN npx --yes prisma@6.12.0 generate

COPY --from=builder /app/dist ./dist

EXPOSE 4001

CMD ["node", "dist/main"]
