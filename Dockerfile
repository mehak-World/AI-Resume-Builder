# Base image
FROM node:20.19.0 AS base
WORKDIR /app


#client-build side
FROM base AS client-build
COPY client/package.json client/package-lock.json ./
COPY client/.env .
RUN npm install
COPY client/ ./
RUN npm run build

# --------- SERVER SETUP ---------
FROM base AS server
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server/ ./server

# Copy client build into server
COPY --from=client-build /app/dist ./server/public

WORKDIR /app/server
EXPOSE 3000
CMD ["node", "app.js"]