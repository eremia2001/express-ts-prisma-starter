# Verwende das offizielle Node.js 14 Image als Basis
FROM node:16

# Arbeitsverzeichnis im Container festlegen
WORKDIR /usr/src/app

# Installiere nodemon global
RUN npm install -g nodemon

# Kopiere package.json und package-lock.json
COPY package*.json ./

# Installiere alle Node.js Abhängigkeiten
RUN npm install

# Kopiere den restlichen Quellcode des Projekts in das Arbeitsverzeichnis
COPY . .


# Erstellen Sie das Uploads-Verzeichnis
RUN mkdir -p uploads

# Exponiere den Port, den dein Server benutzt
EXPOSE 3000

# Befehl zum Starten deines Node.js Servers mit nodemon
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && nodemon src/app.js"]
