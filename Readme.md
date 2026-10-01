# Contrat d'API — MachineCare

Toutes les routes sauf `/auth/login` nécessitent un header :
`Authorization: Bearer <token>`

---

## Auth / Users

| Méthode | Path | Body | Réponse succès | Erreurs |
|---|---|---|---|---|
| POST | `/auth/login` | `{ email, password }` | `200 { token }` | `401` email/password incorrect |
| GET | `/users/me` | — (JWT) | `200 { id, email, createdAt }` | `401` bla token |
| PUT | `/users/me` | `{ email?, password? }` | `200 { id, email }` | `401`, `409` email déjà utilisé |
| POST | `/users` | `{ email, password }` | `201 { id, email }` | `401`, `400` champs manquants, `409` email dupliqué |

## Machines

| Méthode | Path | Body | Réponse | Erreurs |
|---|---|---|---|---|
| POST | `/machines` | `{ reference, nom, atelier, statut }` | `201` | `400`, `409` reference dupliquée |
| GET | `/machines?atelier=&statut=` | — | `200 [...]` | — |
| GET | `/machines/:id` | — | `200 {...}` | `404` |
| PUT | `/machines/:id` | `{ nom?, atelier?, statut? }` | `200 {...}` | `400`, `404` |
| DELETE | `/machines/:id` | — | `204` ou `409` si reports liés | `404` |
| GET | `/machines/:id/reports` | — | `200 [...]` | `404` |

## Reports

| Méthode | Path | Body | Réponse | Erreurs |
|---|---|---|---|---|
| POST | `/reports` | `{ machine, description }` | `201` | `400` description vide, `404` machine inexistante |
| GET | `/reports?machine=&statut=` | — | `200 [...]` | — |
| GET | `/reports/:id` | — | `200 {...}` | `404` |
| PUT | `/reports/:id` | `{ statut?, description? }` | `200 {...}` | `400` statut inconnu, `404` |
| PATCH | `/reports/:id/resolve` | `{ resolutionNote }` | `200 {...}` | `400` note manquante, `404` |




| Code HTTP | Cas |
|---|---|
| 400 | données invalides |
| 401 | token absent/invalide |
| 404 | ressource inexistante |
| 409 | conflit (doublon) |
| 500 | erreur serveur |


## Politique de suppression d'une machine

La suppression d'une machine entraîne la suppression en cascade de tous
les signalements (reports) qui lui sont associés. La requête
`DELETE /machines/:id` supprime d'abord les reports liés à la machine,
puis la machine elle-même, et retourne `204 No Content`.

Ce choix évite les données orphelines (reports pointant vers une machine
inexistante) mais entraîne la perte de l'historique des pannes de cette
machine. Il n'y a donc pas de blocage même si la machine possède des
signalements.


## Lancer avec Docker

### Prérequis

- Docker et Docker Compose installés (`docker --version`, `docker compose version`)

### Installation

1. Cloner le dépôt :
```bash
   git clone https://github.com/razaane/MachineCare.git
   cd MachineCare
```

2. Créer le fichier `.env` à partir de l'exemple :
```bash
   cp .env.example .env
```
   Puis remplir `JWT_SECRET` avec une valeur de votre choix.

3. Lancer les conteneurs :
```bash
   docker compose up --build
```

4. L'API est accessible sur `http://localhost:3000`. Vérifier avec :
```bash
   curl http://localhost:3000/health
```

### Arrêter les conteneurs

```bash
docker compose down
```

Pour supprimer aussi les données MongoDB persistées :
```bash
docker compose down -v
```

### Variables d'environnement

| Variable | Description |
|---|---|
| `PORT` | Port d'écoute de l'API (défaut : 3000) |
| `MONGO_URI` | URI de connexion MongoDB (`mongodb://mongo:27017/machinecare` en Docker) |
| `JWT_SECRET` | Clé secrète pour signer les tokens JWT |