# Physique Premium

Site Next.js professionnel pour un professeur de physique avec:

- landing page moderne
- page de réservation
- panneau admin sécurisé
- base SQLite locale ou Supabase
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

## Variables d'environnement

Copier `.env.example` vers `.env.local` puis compléter si besoin:

```bash
cp .env.example .env.local
```

Variables principales:

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Physique2026!
ADMIN_SESSION_SECRET=change-me
ADMIN_PASSWORD_SALT=change-me-too
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_PROVIDER=sqlite
```

## Base de données

- En local, SQLite est créée automatiquement dans `data/physique.db`.
- Si `DATABASE_PROVIDER=supabase` et que les variables Supabase sont présentes, le site utilise Supabase automatiquement.

## Connexion Supabase

1. Créez un projet Supabase.
2. Ouvrez le SQL Editor et exécutez [supabase/schema.sql](/Applications/OneDrive-IowaCityCommunitySchoolDistrict/PROJECT/phisique/supabase/schema.sql).
3. Récupérez les variables du projet:

```bash
DATABASE_PROVIDER=supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=votre-publishable-key
SUPABASE_SECRET_KEY=votre-secret-key
```

4. Ajoutez exactement les mêmes variables sur Vercel.
5. Redéployez le projet.

Le code garde SQLite comme fallback si Supabase n'est pas configuré.

## Compatibilité future

La structure du projet est maintenant prête pour un usage local avec SQLite et un déploiement Vercel avec Supabase.
