# NuxtHub Better Auth Starter

Minimal [NuxtHub](https://hub.nuxt.com) + [Better Auth](https://better-auth.com) template. Multi-cloud ready.

## Features

- Email/password + GitHub OAuth
- Session storage with KV
- Protected routes via route rules
- Nuxt UI components

## Setup

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Create GitHub OAuth App at https://github.com/settings/developers with callback `http://localhost:3000/api/auth/callback/github`

## Deploy

NuxtHub auto-detects your hosting provider. Configure bindings per platform:

### Cloudflare Workers

```bash
# Create resources
wrangler d1 create my-db
wrangler kv namespace create KV
wrangler kv namespace create CACHE

# Update wrangler.jsonc with IDs, then:
pnpm build && wrangler deploy
```

### Vercel

Set environment variables in Vercel dashboard:
- `DATABASE_URL` - Neon/Supabase PostgreSQL
- `KV_REST_API_URL` + `KV_REST_API_TOKEN` - Vercel KV or Upstash

### Turso + Upstash (any host)

```env
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NUXT_BETTER_AUTH_SECRET` | Yes | Auth secret (32+ chars) |
| `NUXT_PUBLIC_SITE_URL` | Yes | Site URL for OAuth callbacks |
| `GITHUB_CLIENT_ID` | Yes | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | Yes | GitHub OAuth secret |

See `.env.example` for database/KV provider options.

## License

MIT
