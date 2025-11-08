# Chat API Route

## Security

This API route acts as a proxy between the client and the n8n webhook, ensuring that:

1. **Webhook URL is hidden** - The n8n webhook URL is never exposed to the client
2. **Server-side only** - Environment variable `N8N_WEBHOOK_URL` is server-side only (no `NEXT_PUBLIC_` prefix)
3. **Input validation** - Validates message and sessionId before forwarding
4. **Error handling** - Catches and handles errors without exposing internal details

## Environment Variable

Add to your `.env.local` file:

```bash
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
```

**Important:** Do NOT use `NEXT_PUBLIC_` prefix - this keeps the URL server-side only.

## Usage

The ChatWidget component calls this route internally:

```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: userMessage.content,
    sessionId: sessionId,
  }),
})
```

## Deployment

Make sure to add `N8N_WEBHOOK_URL` to your hosting platform's environment variables:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Other platforms: Check their documentation
