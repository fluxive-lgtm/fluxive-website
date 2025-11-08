import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, sessionId, userTimeInfo } = body

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      )
    }

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid session ID' },
        { status: 400 }
      )
    }

    // Get webhook URL from environment (not exposed to client)
    const webhookUrl = process.env.N8N_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL is not configured')
      return NextResponse.json(
        { error: 'Chat service is not configured' },
        { status: 500 }
      )
    }

    // Forward request to n8n webhook with user time info
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sessionId,
        userTimeInfo: userTimeInfo || null,
      }),
    })

    if (!response.ok) {
      throw new Error(`n8n webhook returned ${response.status}`)
    }

    // Stream the response back to the client
    const reader = response.body?.getReader()
    
    if (!reader) {
      return NextResponse.json(
        { error: 'No response from chat service' },
        { status: 500 }
      )
    }

    // Create a readable stream to pass through the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            controller.enqueue(value)
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
