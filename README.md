# NuxtHub Better Auth Starter

A minimal starter template for [NuxtHub](https://hub.nuxt.com) with [Better Auth](https://better-auth.com) integration.

## Features

- Email/Password authentication
- GitHub OAuth
- Session management with KV secondary storage
- SQLite database (D1) for user storage
- Protected routes with route rules
- Nuxt UI components

## Setup

1. Clone and install dependencies:

```bash
pnpm install
```

2. Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

3. Create a GitHub OAuth App at https://github.com/settings/developers
   - Set callback URL to `http://localhost:3000/api/auth/callback/github`

4. Start development server:

```bash
pnpm dev
```

## Deploy to Cloudflare

1. Create Cloudflare resources:

```bash
npx wrangler d1 create nuxthub-better-auth
npx wrangler kv namespace create KV
npx wrangler kv namespace create CACHE
```

2. Update `nuxt.config.ts` with the IDs from step 1

3. Build and deploy:

```bash
pnpm build
npx wrangler deploy
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NUXT_BETTER_AUTH_SECRET` | Secret key for auth (min 32 chars) |
| `NUXT_PUBLIC_SITE_URL` | Your site URL for OAuth callbacks |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret |

## License

MIT
