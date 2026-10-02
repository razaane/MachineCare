# Documentation de l'API MachineCare

Base URL : `http://localhost:3000/api`
Format : JSON. Les routes protégées exigent le header `Authorization: Bearer <token>`.

Format d'erreur (toutes les routes) :
```json
{ "success": false, "message": "description de l'erreur" }
```

---

## 1. Auth / Users (MAC-152)

### POST /auth/register
Crée un utilisateur.

Body :
```json
{ "name": "Razane", "email": "razane@mail.com", "password": "123456" }
```
Réponses : `201` utilisateur créé | `400` champ manquant | `409` email déjà utilisé

### POST /auth/login
Body :
```json
{ "email": "razane@mail.com", "password": "123456" }
```
Réponses : `200` `{ "token": "<jwt>" }` | `400` / `401` identifiants invalides

### GET /users/profile  🔒
Retourne le profil de l'utilisateur connecté (sans mot de passe).
Réponses : `200` profil | `401` token manquant ou invalide

---

## 2. Machines (MAC-153)

Toutes les routes sont protégées 🔒.

### POST /machines
Body :
```json
{ "reference": "M-001", "name": "Tour CNC", "location": "Atelier A" }
```
Réponses : `201` machine créée | `400` champ manquant ou référence déjà utilisée | `401`

### GET /machines
Liste les machines. Filtres possibles via query string (ex. `?location=Atelier A`).
Réponses : `200` tableau de machines | `401`

### GET /machines/:id
Réponses : `200` machine | `400` id invalide | `404` machine introuvable | `401`

### PUT /machines/:id
Body : champs à modifier.
```json
{ "location": "Atelier B" }
```
Réponses : `200` machine mise à jour | `400` | `404` | `401`

### DELETE /machines/:id
Supprime la machine **et ses signalements** (cascade).
Réponses : `200` suppression OK | `404` | `401`

---

## 3. Reports / Signalements (MAC-153)

Toutes les routes sont protégées 🔒. Le champ `machine` est l'`_id` MongoDB de la machine (pas sa référence).

### POST /reports
Body :
```json
{ "machine": "670f8a2b1234567890abcde1", "description": "Panne moteur" }
```
Réponses : `201` signalement créé (`statut: "ouvert"`) | `400` champ manquant ou id invalide | `404` machine introuvable | `401`

### GET /reports
Filtres : `?statut=ouvert|en_cours|resolu` et/ou `?machine=<id>`.
Réponses : `200` tableau | `401`

### GET /reports/:id
Réponses : `200` signalement | `404` introuvable | `401`

### PUT /reports/:id
Body :
```json
{ "statut": "en_cours" }
```
Réponses : `200` mis à jour | `400` statut invalide | `404` | `401`

### PATCH /reports/:id/resolve
Body (`resolutionNote` obligatoire) :
```json
{ "resolutionNote": "Pièce remplacée" }
```
Réponses : `200` (`statut: "resolu"`, `resolvedAt` rempli) | `400` note manquante | `404` | `401`

### GET /machines/:id/reports
Historique des signalements d'une machine.
Réponses : `200` tableau | `404` machine introuvable | `401`

---

## Codes HTTP utilisés

| Code | Signification                     |
|------|-----------------------------------|
| 200  | OK                                |
| 201  | Ressource créée                   |
| 400  | Requête invalide                  |
| 401  | Non authentifié / token invalide  |
| 404  | Ressource ou route introuvable    |
| 409  | Conflit (doublon)                 |
| 500  | Erreur serveur                    |