# Backend AI Integration Guide

## Overview
This document explains how to integrate the AI assistant into your backend to support the system-thinking modeling platform.

## API Endpoint Required

### POST `/api/chat`

**Request Body:**
```json
{
  "message": "Why is student stress increasing?"
}
```

**Response Body:**
```json
{
  "reply": "That's an important question. Let me ask a few things to understand better:\n- What year/level of students are you thinking about?\n- What signs of stress are you noticing?\n- What do you think might be contributing to it?"
}
```

## AI System Prompt

The complete system prompt is available in `AI_SYSTEM_PROMPT.md`. Key points:

### 1. **Conversation Phases**
The AI should guide users through three phases:
- **Conceptualization**: Ask clarifying questions about the problem
- **Modeling**: Generate structured variables and links
- **Analysis**: Provide insights about feedback loops and leverage points

### 2. **Output Format for Models**

When generating a model, the AI MUST use this exact format:

```
VARIABLES:
- Variable A
- Variable B
- Variable C

LINKS:
- Variable A -> Variable B (positive)
- Variable B -> Variable C (negative)
- Variable C -> Variable A (positive)
```

The frontend parser (`parseAIModel.js`) will automatically convert this into nodes and edges.

**Link Types:**
- `(positive)` - increase in A causes increase in B
- `(negative)` - increase in A causes decrease in B
- `(influences)` - default/neutral relationship

### 3. **Tone Guidelines**
- Friendly and supportive
- Non-technical language
- Short messages (2-4 sentences typically)
- Ask questions in small chunks
- Never make users feel wrong

### 4. **Restrictions**
The AI should NEVER:
- Claim to modify the canvas directly
- Claim to save/load diagrams
- Make assumptions without asking
- Use technical jargon without explanation

## Implementation Options

### Option 1: OpenAI GPT-4
```javascript
const openai = require('openai');

const systemPrompt = `[Content from AI_SYSTEM_PROMPT.md]`;

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ],
    temperature: 0.7,
    max_tokens: 500
  });
  
  res.json({ reply: completion.choices[0].message.content });
});
```

### Option 2: Anthropic Claude
```javascript
const Anthropic = require('@anthropic-ai/sdk');

const systemPrompt = `[Content from AI_SYSTEM_PROMPT.md]`;

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  const response = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 500,
    system: systemPrompt,
    messages: [
      { role: "user", content: message }
    ]
  });
  
  res.json({ reply: response.content[0].text });
});
```

### Option 3: Local LLM (Ollama)
```javascript
const axios = require('axios');

const systemPrompt = `[Content from AI_SYSTEM_PROMPT.md]`;

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  const response = await axios.post('http://localhost:11434/api/generate', {
    model: 'llama2',
    prompt: `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`,
    stream: false
  });
  
  res.json({ reply: response.data.response });
});
```

## Conversation State Management

For better context, maintain conversation history:

```javascript
// In-memory store (use Redis/DB for production)
const conversations = new Map();

app.post('/api/chat', async (req, res) => {
  const { message, sessionId } = req.body;
  
  // Get or create conversation history
  let history = conversations.get(sessionId) || [];
  
  // Add user message
  history.push({ role: "user", content: message });
  
  // Call AI with full history
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      ...history
    ]
  });
  
  const reply = completion.choices[0].message.content;
  
  // Save assistant response
  history.push({ role: "assistant", content: reply });
  conversations.set(sessionId, history);
  
  res.json({ reply });
});
```

## Testing the Integration

### Test Case 1: Initial Welcome
The frontend automatically shows the welcome message, so the first user message should trigger conceptualization.

**User:** "Why is traffic getting worse?"

**Expected AI Response:**
```
That's a great question. Let me understand better:
- What city or area are you thinking about?
- When do you notice traffic is worst?
- What do you think might be causing it?
```

### Test Case 2: Model Generation
After clarification, AI should output structured format.

**User:** "Morning rush hour in downtown. More people are moving to the city."

**Expected AI Response:**
```
I see! Let me create a simple model:

VARIABLES:
- City Population
- Number of Commuters
- Traffic Congestion
- Commute Time
- Public Transit Usage

LINKS:
- City Population -> Number of Commuters (positive)
- Number of Commuters -> Traffic Congestion (positive)
- Traffic Congestion -> Commute Time (positive)
- Commute Time -> Public Transit Usage (positive)
- Public Transit Usage -> Traffic Congestion (negative)

This shows how population growth increases traffic, but also how bad traffic can push people toward public transit, which helps reduce congestion.

Would you like to add more factors or explore this model further?
```

### Test Case 3: Analysis
**User:** "What can we do about it?"

**Expected AI Response:**
```
Looking at the model, I see a few leverage points:

1. **Public Transit** - This creates a balancing loop. Better transit → less cars → less congestion
2. **Remote Work** - Could reduce Number of Commuters
3. **Staggered Work Hours** - Spreads out peak demand

The most powerful intervention is usually improving public transit, because it creates a positive feedback loop.

Would you like to add any of these to the model?
```

## Error Handling

```javascript
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ 
        error: "Message is required" 
      });
    }
    
    // AI call here...
    
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ 
      reply: "I'm having trouble connecting right now. Could you try again in a moment?"
    });
  }
});
```

## Rate Limiting

Implement rate limiting to prevent abuse:

```javascript
const rateLimit = require('express-rate-limit');

const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: { error: "Too many requests, please slow down" }
});

app.post('/api/chat', chatLimiter, async (req, res) => {
  // Handler...
});
```

## Environment Variables

```env
# .env file
OPENAI_API_KEY=sk-...
AI_MODEL=gpt-4
AI_MAX_TOKENS=500
AI_TEMPERATURE=0.7
```

## Next Steps

1. Choose your AI provider (OpenAI, Anthropic, or local)
2. Copy the system prompt from `AI_SYSTEM_PROMPT.md`
3. Implement the `/api/chat` endpoint
4. Test with the provided test cases
5. Add conversation history management
6. Deploy with rate limiting

## Support

If you need help implementing this, refer to:
- `AI_SYSTEM_PROMPT.md` - Complete AI behavior specification
- `src/utils/parseAIModel.js` - Frontend parser implementation
- `src/context/ChatContext.jsx` - Frontend chat integration
