# Verwende das Node.js 16 Image als Basis
FROM node:18-alpine

# Arbeitsverzeichnis im Container festlegen
WORKDIR /usr/src/app

# Kopiere nur die package.json und package-lock.json, um Cache bei Abhängigkeiten zu nutzen
COPY package*.json ./

# Installiere nur Produktionsabhängigkeiten für das Build-Image
RUN npm install



# Prisma-Schema hinzufügen
COPY prisma ./prisma

# Erstelle Prisma-Client
RUN npx prisma generate

# Kopiere den gesamten Projektcode in das Arbeitsverzeichnis
COPY . .

# Erstelle das Uploads-Verzeichnis
RUN mkdir -p uploads

# TypeScript-Build (Output kommt in dist/)
RUN npm run build

# Exponiere den Port, den der Server nutzt
EXPOSE 3000

# CMD unterscheidet sich in dev/prod. `NODE_ENV` wird in docker-compose definiert.
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then nodemon dist/core/server.js; else node dist/core/server.js; fi"]
