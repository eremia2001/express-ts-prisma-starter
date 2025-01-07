FROM node:18-alpine
WORKDIR /usr/src/app

# Install alle Dependencies (inkl. dev)
COPY package*.json ./
RUN npm install

# Prisma etc. optional
COPY prisma ./prisma
RUN npx prisma generate

# restlicher Code
COPY . .

# kein "RUN npm run build" hier für reines Development
EXPOSE 3000

CMD ["npm", "run", "dev"]
