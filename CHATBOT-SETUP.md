# Chat Widget Setup Guide

This guide will help you connect the FLUXIVE chat widget to your n8n agent workflow.

## Overview

The chat widget is now installed on your website and will appear as a floating bubble in the bottom-right corner. It features:

- ✨ **Glassmorphism design** matching your FLUXIVE aesthetic
- 💬 **Real-time streaming responses** from your n8n agent
- 📱 **Responsive design** that works on mobile and desktop
- 🎨 **Smooth animations** with Framer Motion
- 🌙 **Theme support** (dark/light mode compatible)

## Quick Start

### 1. Configure Your n8n Webhook URL

Add your n8n webhook URL to the `.env` file:

```bash
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
```

**Important:** The variable must start with `NEXT_PUBLIC_` to be accessible in the browser.

### 2. n8n Workflow Configuration

Your n8n workflow needs to be configured for **streaming responses**. Here are two approaches:

#### Option A: Server-Sent Events (SSE) - Recommended

Configure your n8n workflow to send streaming responses:

1. **Webhook Node** (Trigger):
   - Method: `POST`
   - Path: `/webhook/your-webhook-id`
   - Response Mode: `Stream`

2. **AI Agent Node** (e.g., OpenAI, Claude, etc.):
   - Enable streaming: `true`
   - Model: Your preferred model

3. **Respond to Webhook Node**:
   - Response Mode: `Stream`
   - Content-Type: `text/plain` or `text/event-stream`
   - Stream the AI response chunks

**Example n8n Workflow:**

```
Webhook (POST)
  → Extract message from body: {{ $json.message }}
  → AI Chat Model (streaming enabled)
  → Respond to Webhook (stream response)
```

#### Option B: Standard JSON Response (Fallback)

If streaming is not available, you can return a standard JSON response:

1. **Webhook Node** (Trigger):
   - Method: `POST`
   - Path: `/webhook/your-webhook-id`

2. **AI Agent Node**:
   - Process the message

3. **Respond to Webhook Node**:
   - Response Code: `200`
   - Response Body:
     ```json
     {
       "response": "{{ $json.output }}",
       "sessionId": "{{ $json.sessionId }}"
     }
     ```

### 3. Expected Request Format

The chat widget sends POST requests to your n8n webhook with the following JSON body:

```json
{
  "message": "User's message text",
  "sessionId": "session_1234567890"
}
```

### 4. Expected Response Format

#### For Streaming (Recommended):

The response should be a stream of text chunks (plain text or SSE format):

```
chunk1
chunk2
chunk3
...
```

Or with Server-Sent Events:

```
data: chunk1

data: chunk2

data: chunk3

```

#### For Non-Streaming (Fallback):

```json
{
  "response": "The AI agent's complete response",
  "sessionId": "session_1234567890"
}
```

## Testing Your Setup

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to `http://localhost:3000`

3. **Look for the chat bubble** in the bottom-right corner

4. **Click the bubble** to open the chat widget

5. **Send a test message** to verify the connection to n8n

## Troubleshooting

### Chat widget not appearing

- Check that you've added `<ChatWidget />` to `src/app/layout.tsx`
- Verify there are no console errors in the browser
- Ensure the component is imported correctly

### No response from n8n

- Verify your `NEXT_PUBLIC_N8N_WEBHOOK_URL` is set correctly in `.env`
- Check that your n8n workflow is active and the webhook is accessible
- Test your n8n webhook directly with curl:
  ```bash
  curl -X POST https://your-n8n-instance.com/webhook/your-webhook-id \
    -H "Content-Type: application/json" \
    -d '{"message": "test", "sessionId": "test123"}'
  ```
- Check browser console for CORS errors (you may need to configure CORS in n8n)

### CORS Issues

If you encounter CORS errors, configure your n8n instance to allow requests from your domain:

1. In n8n settings, add your domain to allowed origins
2. Or use the **Set Headers** node before the Respond to Webhook node:
   ```
   Access-Control-Allow-Origin: https://fluxive.com
   Access-Control-Allow-Methods: POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type
   ```

### Streaming not working

- Verify your n8n AI node has streaming enabled
- Check that the Respond to Webhook node is set to stream mode
- If streaming doesn't work, the fallback to standard JSON response will be used automatically

## Advanced Configuration

### Session Management

The current implementation generates a simple session ID. For production, you may want to:

- Store sessions in localStorage or cookies
- Implement user authentication
- Persist chat history across page reloads

### Customization

You can customize the chat widget in `src/components/ChatWidget.tsx`:

- **Colors**: Modify gradient classes (e.g., `from-cyan-500 to-emerald-500`)
- **Position**: Change `bottom-6 right-6` classes
- **Size**: Adjust width (`w-[380px]`) and height (`h-[600px]`)
- **Welcome message**: Edit the initial message in the `messages` state

### Adding Message History

To persist chat history, add localStorage support:

```typescript
// Save messages to localStorage
useEffect(() => {
  localStorage.setItem('chat_history', JSON.stringify(messages))
}, [messages])

// Load messages on mount
useEffect(() => {
  const saved = localStorage.getItem('chat_history')
  if (saved) {
    setMessages(JSON.parse(saved))
  }
}, [])
```

## Production Deployment

When deploying to production:

1. Update `.env.production` with your production n8n webhook URL
2. Ensure your n8n instance is accessible from your production domain
3. Configure CORS properly in n8n
4. Test the chat widget thoroughly before launch
5. Monitor n8n logs for any errors

## Support

For issues or questions:
- Check n8n logs for errors
- Review browser console for client-side errors
- Test webhook endpoint independently
- Verify environment variables are loaded correctly

## Example n8n Workflow JSON

Here's a basic n8n workflow you can import:

```json
{
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300],
      "webhookId": "your-webhook-id",
      "parameters": {
        "path": "your-webhook-id",
        "method": "POST",
        "responseMode": "responseNode"
      }
    },
    {
      "name": "AI Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "position": [450, 300],
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.message }}"
      }
    },
    {
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "position": [650, 300],
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { \"response\": $json.output } }}"
      }
    }
  ],
  "connections": {
    "Webhook": { "main": [[{ "node": "AI Agent" }]] },
    "AI Agent": { "main": [[{ "node": "Respond to Webhook" }]] }
  }
}
```

---

**Built with ❤️ for FLUXIVE**
