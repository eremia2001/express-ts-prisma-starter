# **My Backend Boilerplate**

Willkommen zu deinem **Express + TypeScript + Prisma** Boilerplate, das dir einen soliden Start für neue Projekte bietet. Dieses Projekt ist nach **Best Practices** strukturiert und verwendet **Domain Driven Design (DDD)**. Das Ziel ist, dass du dieses Grundgerüst immer wieder verwenden kannst, um schnell und effizient neue Backend-Projekte aufzubauen.

---

## **Inhalt**

1. [Überblick](#überblick)
2. [Technologien](#technologien)
3. [Projektstruktur](#projektstruktur)
4. [Warum mehrere Dateien pro Modul?](#warum-mehrere-dateien-pro-modul)
   - [Controller](#1-usercontrollerts)
   - [Service](#2-userservicets)
   - [Repository](#3-userrepositoryts)
   - [Types](#4-usertypests)
5. [Quick Start](#quick-start)
6. [Weiterführende Informationen](#weiterführende-informationen)

---

## **Überblick**

In diesem Boilerplate wollen wir:

- **Express** als Webframework verwenden, um REST-APIs zu erstellen.
- **TypeScript** für Typensicherheit und bessere Wartbarkeit.
- **Prisma** zur Kommunikation mit einer **PostgreSQL**-Datenbank (kann natürlich leicht für andere Datenbanken angepasst werden).
- **Docker** und **docker-compose** für Containerisierung.
- **Swagger** für API-Dokumentation.
- **Logging** (z.B. mit _pino_) für eine bessere Nachvollziehbarkeit des Systemverhaltens.

Das Ziel ist eine leicht verständliche und **gut strukturierte** Codebasis, die du bei **jedem Projekt** wiederverwenden kannst.

---

## **Technologien**

- **Node.js** _(Version 18-alpine)_
- **Express** _(4.x)_
- **TypeScript** _(4.x oder höher)_
- **Prisma** _(4.x oder höher)_
- **PostgreSQL** _(15-alpine)_
- **Docker & Docker Compose**
- **Swagger** _(swagger-jsdoc, swagger-ui-express)_
- **pino** _(für Logging)_

---

## **Projektstruktur**

```bash
my-backend-boilerplate/
├─ prisma/
│   └─ schema.prisma          # Prisma Schema für Datenbank-Modelle
├─ src/
│   ├─ config/
│   │   ├─ index.ts           # Allgemeine Konfiguration (z.B. Env-Variablen)
│   │   └─ logger.ts          # Logging-Konfiguration
│   ├─ core/
│   │   ├─ app.ts             # Express-App (Verknüpfung von Middlewares, Routen, Swagger etc.)
│   │   └─ server.ts          # Startpunkt des Servers
│   ├─ modules/               # Domain Driven Design: hier werden die einzelnen "Domänen" abgelegt
│   │   └─ user/
│   │       ├─ user.controller.ts
│   │       ├─ user.service.ts
│   │       ├─ user.repository.ts
│   │       └─ user.types.ts
│   ├─ routes/
│   │   └─ index.ts           # Haupt-Router, importiert Routen aus den Modulen
│   ├─ middlewares/
│   │   └─ errorHandler.ts    # Zentrales Error-Handling
│   └─ docs/
│       └─ swagger.ts         # Swagger-Dokumentation
├─ .env                       # Environment Variablen
├─ .gitignore
├─ docker-compose.yml
├─ Dockerfile
├─ package.json
├─ tsconfig.json
├─ nodemon.json
└─ README.md                  # Du bist hier :)
```

**Hinweis**: Diese Struktur kann an deine Bedürfnisse angepasst werden. Prinzipiell haben wir jedoch eine **DDD-konforme Trennung**, damit unser Code gut wartbar bleibt und schnell erweitert werden kann.

---

## **Warum mehrere Dateien pro Modul?**

In diesem Boilerplate nutzen wir eine **DDD-orientierte** Aufteilung nach **Controller**, **Service**, **Repository** und (optional) **Types**. Dadurch wird jede Datei einer **klaren Verantwortlichkeit** (Single Responsibility Principle) zugewiesen.

### **1. `user.controller.ts`**

- **Aufgabe**: Nimmt **HTTP-Requests** entgegen, validiert die Eingaben (z.B. Check, ob alle notwendigen Daten da sind) und ruft den entsprechenden **Service** auf.
- **Warum?**:
  - Hält die Routen-Definition von der eigentlichen **Business-Logik** getrennt.
  - Macht das System wartbar und logisch nachvollziehbar: Wenn etwas am Routing geändert wird, geschieht dies im Controller.

**Beispiel**:

```ts
import { Router } from 'express';
import { createUser, getUsers } from './user.service';

export const userRouter = Router();

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await getUsers();
    return res.json(users);
  } catch (err) {
    next(err);
  }
});

userRouter.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await createUser(email, password);
    return res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});
```

### **2. `user.service.ts`**

- **Aufgabe**: Enthält die **Business-Logik** oder „Regeln“, die für den Anwendungsfall `user` relevant sind.
- **Warum?**:
  - Service soll **Geschäftslogik** (z.B. Validierungen, Verschlüsselung) und **Ablaufsteuerung** (z.B. E-Mails verschicken, wenn ein User erstellt wird) beinhalten.
  - Kapselt die Fachlichkeit, sodass der Controller _nicht_ wissen muss, wie genau etwas berechnet wird.

**Beispiel**:

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async () => {
  return prisma.user.findMany();
};

export const createUser = async (email: string, password: string) => {
  // Beispiel: Passwort hashen, Email-Validierung etc.
  return prisma.user.create({
    data: { email, password },
  });
};
```

### **3. `user.repository.ts`**

- **Aufgabe**: Übernimmt das **Speichern** und **Abrufen** von Daten aus der Datenbank.
- **Warum?**:
  - Diese Schicht ist für den **Zugriff auf die Datenquelle** (z.B. PostgreSQL) verantwortlich und isoliert vom Rest der Anwendung.
  - Trennung zwischen **Business-Logik** (Service) und **technischer Persistenz** (Repository).
  - Lässt sich leicht austauschen oder mocken (z.B. für Unit-Tests).

**Beispiel**:

```ts
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const userRepository = {
  findAll: async (): Promise<User[]> => {
    return prisma.user.findMany();
  },

  create: async (email: string, password: string): Promise<User> => {
    return prisma.user.create({
      data: { email, password },
    });
  },
};
```

### **4. `user.types.ts`**

- **Aufgabe**: Definiert gemeinsame **TypeScript-Typen** (Interfaces, Types), die in diesem `user`-Modul verwendet werden.
- **Warum?**:
  - Verschafft dir und anderen Entwicklern eine zentrale Übersicht aller Datentypen, die zur Domäne `user` gehören.
  - Erhöht die Lesbarkeit und Wartbarkeit, weil du Typen nicht über verschiedene Dateien verstreuen musst.

**Beispiel**:

```ts
export interface CreateUserDTO {
  email: string;
  password: string;
}
```

---

## **Quick Start**

1. **Repository klonen** oder herunterladen:
   ```bash
   git clone https://github.com/dein-username/my-backend-boilerplate.git
   ```
2. **Environment Variables** einrichten:
   ```bash
   cp .env.example .env
   ```
   Passe die Werte an deine Umgebung an (z.B. `DATABASE_URL`).
3. **Docker** starten:
   ```bash
   docker-compose up --build
   ```
4. **Datenbank migrations** (Option, falls die Datenbank angelegt werden soll):
   ```bash
   docker-compose exec backend npm run prisma:migrate
   ```
5. **Swagger UI** aufrufen unter:  
   [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
6. Teste deinen Endpoint:
   - [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

## **Weiterführende Informationen**

- **DDD** (_Domain Driven Design_) macht dein System modular und erweitert. Lies hierzu das Buch ["Domain-Driven Design: Tackling Complexity in the Heart of Software"](https://www.domainlanguage.com/ddd/) von Eric Evans oder Blogs, die DDD-Konzepte veranschaulichen.
- **Prisma** bietet dir eine komfortable und typsichere Möglichkeit, mit deiner Datenbank zu interagieren. Dokumentation: [Prisma Docs](https://www.prisma.io/docs)
- **Docker** ermöglicht eine konsistente Entwicklungs- und Produktionsumgebung. Mehr dazu unter [Docker Docs](https://docs.docker.com/).
- **Swagger** unterstützt dich bei der **API-Dokumentation**, sodass Nutzer deines Backends die Endpoints leicht verstehen und testen können.

---

> Mit diesem Boilerplate hast du eine einfache und **saubere** Grundlage, auf der du aufbauen kannst. Viel Erfolg beim Entwickeln deiner nächsten Projekte!
