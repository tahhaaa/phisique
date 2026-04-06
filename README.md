# Physique Premium

Site Next.js professionnel pour un professeur de physique avec:

- landing page moderne
- page de réservation
- panneau admin sécurisé
- base SQLite locale
- PWA installable
- notifications navigateur

## Démarrage local

```bash
npm install
npm run dev
```

## Connexion admin par défaut

- utilisateur: `admin`
- mot de passe: `Physique2026!`

## Variables optionnelles

Créer un fichier `.env` si vous souhaitez personnaliser:

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Physique2026!
ADMIN_SESSION_SECRET=change-me
ADMIN_PASSWORD_SALT=change-me-too
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Base de données

La base SQLite locale est créée automatiquement dans `data/physique.db` au premier démarrage.

## Compatibilité future

La structure du projet est prête pour une migration vers Supabase côté data layer si nécessaire.
