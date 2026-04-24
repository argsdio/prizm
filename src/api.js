import { SYSTEM_PROMPT } from './constants'

/**
 * Sends the user's opinion to the Claude API and returns
 * a structured object with: flipside, steelman, commonGround, questions
 */
export async function fetchPerspectives(opinion) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  if (!apiKey) {
    throw new Error(
      'Missing VITE_ANTHROPIC_API_KEY. Add it to your .env file.'
    )
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: opinion }],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error ${response.status}`)
  }

  const data = await response.json()
  const text = data.content
    .map((block) => (block.type === 'text' ? block.text : ''))
    .join('')

  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}