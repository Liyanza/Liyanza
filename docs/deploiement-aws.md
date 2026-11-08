# Déploiement du site sur AWS

Le site ne passe plus par Vercel. Il tourne en conteneur Docker sur l'EC2 `kiyanza-backend` (compte `922640335967`, Paris), derrière le Caddy qui sert déjà `api.kiyanza.com`.

L'infrastructure du serveur vit dans le dépôt **Liyanza-backend** : `deploy/aws/docker-compose.yml` (service `web`), `caddy/Caddyfile`, `deploy-web.sh`, et son README (section « Site »).

## Déploiement automatique

Chaque push sur `main` lance [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml). Le workflow se lance aussi à la main (onglet Actions → Deploy (AWS) → Run workflow).

1. L'image est construite à partir du [`Dockerfile`](../Dockerfile) (Next.js `output: "standalone"`), puis poussée dans ECR `kiyanza-web` avec deux étiquettes : le commit et `prod`.
2. Par Session Manager, le serveur lance `deploy-web.sh` : il récupère `prod`, relance le conteneur et attend qu'il soit « healthy ».
3. Si `www.kiyanza.com` pointe vers l'EC2, le job vérifie aussi que le site répond publiquement.

Aucune clé AWS n'est stockée dans GitHub : le workflow obtient des identifiants temporaires par OIDC, avec le rôle `github-deploy-web`.

## Variables

| Variable | Où | Valeur par défaut |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Variables du dépôt GitHub (Actions → Variables) | `https://www.kiyanza.com` |
| `NEXT_PUBLIC_API_URL` | idem | `https://api.kiyanza.com` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION` | idem | vides |
| `WEB_PROXY_SECRET` | Serveur, `deploy/aws/.env` du backend (même valeur que l'API) | — |

Les `NEXT_PUBLIC_*` sont figées dans le code au build. Pour qu'une modification soit prise en compte, il faut relancer le workflow.

## Tester l'image en local

```sh
docker build -t kiyanza-web --build-arg NEXT_PUBLIC_API_URL=https://api.kiyanza.com .
docker run --rm -p 3000:3000 kiyanza-web
```

Sans Docker : `npm run build`, puis copier `public` et `.next/static` dans `.next/standalone`, et lancer `node server.js`. Laisser `HOSTNAME=0.0.0.0` (valeur de l'image). Lié à `127.0.0.1`, le serveur ne se joint plus lui-même pour les réécritures du proxy : il tente `localhost`, qui résout en `::1` sous Windows, et les pages bouclent en 308.
