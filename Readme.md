# MachineCare – API de gestion de la maintenance industrielle

API REST sécurisée pour gérer les machines d'un atelier industriel, déclarer les pannes (signalements) et suivre leur résolution.

## Contexte / Fonctionnalités (MAC-149)

- Authentification par JWT (inscription, connexion, profil)
- CRUD des machines avec filtres
- Déclaration de signalements (pannes) liés à une machine
- Statuts d'un signalement : `ouvert` → `en_cours` → `resolu`
- Résolution avec note obligatoire (`resolutionNote`) et date (`resolvedAt`)
- Historique des signalements par machine
- Suppression en cascade : supprimer une machine supprime ses signalements
- Gestion centralisée des erreurs (400, 401, 404, 409, 500)

## Stack technique

Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, Docker / Docker Compose.

## Architecture

```
src/
  routes/        définition des endpoints
  controllers/   reçoivent req, renvoient res
  services/      logique métier
  repositories/  accès aux données
  models/        schémas Mongoose (User, Machine, Report)
  middlewares/   auth JWT, notFound, gestion d'erreurs
  utils/         ApiError, asyncHandler
  app.js         configuration Express
server.js        connexion MongoDB + démarrage du serveur
```

Parcours d'une requête : route → middleware (auth) → controller → service → repository → MongoDB.

## Installation locale (MAC-150)

Prérequis : Node.js 20+, npm, Git, MongoDB (ou Docker).

```bash
git clone <repo-url>
cd machinecare
npm install
cp .env.example .env
npm run dev
```

L'API est disponible sur `http://localhost:3000`.


## Documentation complète des endpoints : voir docs/API.md


## Lancement avec Docker (recommandé)

```bash
docker compose up -d
docker compose logs -f api
```

Cela démarre deux conteneurs : l'API (avec hot reload via nodemon) et MongoDB.
Arrêt : `docker compose down`.

## Variables d'environnement (MAC-151)

Copier `.env.example` vers `.env` et renseigner les valeurs :

| Variable     | Description                    | Exemple                              |
|--------------|--------------------------------|--------------------------------------|
| `PORT`       | Port du serveur                | `3000`                               |
| `MONGO_URI`  | URI de connexion MongoDB       | `mongodb://mongo:27017/machinecare`  |
| `JWT_SECRET` | Secret de signature des tokens | `change_me`                          |

> Avec Docker, l'hôte MongoDB est `mongo` (nom du service). En local sans Docker, utiliser `localhost`.
> Le fichier `.env` ne doit jamais être commité.

## Endpoints principaux

| Méthode | Route                        | Description                    |
|---------|------------------------------|--------------------------------|
| POST    | `/api/auth/register`         | Inscription                    |
| POST    | `/api/auth/login`            | Connexion (retourne le JWT)    |
| GET     | `/api/machines`              | Lister / filtrer les machines  |
| POST    | `/api/machines`              | Créer une machine              |
| PUT     | `/api/machines/:id`          | Modifier une machine           |
| DELETE  | `/api/machines/:id`          | Supprimer (cascade reports)    |
| POST    | `/api/reports`               | Déclarer un signalement        |
| GET     | `/api/reports`               | Lister (`?statut=`, `?machine=`) |
| GET     | `/api/reports/:id`           | Consulter un signalement       |
| PUT     | `/api/reports/:id`           | Modifier (ex. changer statut)  |
| PATCH   | `/api/reports/:id/resolve`   | Résoudre avec note             |
| GET     | `/api/machines/:id/reports`  | Historique d'une machine       |

Toutes les routes (sauf register/login) nécessitent `Authorization: Bearer <token>`.

## Règles métier

- `User.email` unique (rejet si doublon)
- `Machine.reference` unique (rejet si doublon)
- `Report.statut` : `ouvert` | `en_cours` | `resolu`
- Résolution : `resolutionNote` obligatoire, `resolvedAt` rempli automatiquement
- `Report.machine` doit référencer une machine existante (ObjectId)
- `createdAt` / `updatedAt` automatiques sur User, Machine, Report

## Tests

Collection Postman fournie dans `/postman` couvrant le parcours complet.