# Quick Reference Card

## 🎯 For Developers

### Files Modified
```
src/context/ChatContext.jsx          → Auto-welcome message
src/components/workspace/ChatPanel.jsx → Fixed height + scrolling
src/utils/parseAIModel.js            → Enhanced parser
```

### Files Created
```
AI_SYSTEM_PROMPT.md              → AI behavior specification
BACKEND_AI_INTEGRATION.md        → Backend implementation guide
USER_GUIDE.md                    → End-user documentation
AI_IMPLEMENTATION_SUMMARY.md     → Overview of changes
SETUP_CHECKLIST.md               → Setup and testing checklist
CONVERSATION_FLOW.md             → Visual flow diagrams
QUICK_REFERENCE.md               → This file
```

---

## 🚀 Quick Start (Backend)

### 1. Install Dependencies
```bash
npm install openai express cors express-rate-limit dotenv
```

### 2. Create .env
```bash
OPENAI_API_KEY=sk-your-key-here
AI_MODEL=gpt-4
AI_MAX_TOKENS=500
AI_TEMPERATURE=0.7
```

### 3. Implement Endpoint
```javascript
const systemPrompt = fs.readFileSync('AI_SYSTEM_PROMPT.md', 'utf8');

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ],
    temperature: 0.7,
    max_tokens: 500
  });
  
  res.json({ reply: completion.choices[0].message.content });
});
```

### 4. Test
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Why is student stress increasing?"}'
```

---

## 📋 AI Output Format

### When Generating Models
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

### Link Types
- `(positive)` - A ↑ causes B ↑
- `(negative)` - A ↑ causes B ↓
- `(influences)` - default/neutral

---

## 🎨 Frontend Integration

### Auto-Welcome Message
```javascript
// Already implemented in ChatContext.jsx
const seedMessages = [
  {
    role: "assistant",
    message: `👋 Hi! I'm here to help you explore...`
  }
];
```

### Parse AI Response
```javascript
import parseAIModel from './utils/parseAIModel';

const { nodes, edges } = parseAIModel(aiResponse);
// Automatically handles VARIABLES/LINKS format
```

### Add to Canvas
```javascript
// Already implemented in ChatPanel.jsx
const injectToCanvas = () => {
  const { nodes, edges } = parseAIModel(latestAssistant.message);
  nodes.forEach(node => addNode(node.position, node.data, node.id));
  edges.forEach(edge => addEdge(edge));
};
```

---

## 🧪 Test Cases

### Test 1: Conceptualization
```
Input: "Why is student stress increasing?"
Expected: AI asks clarifying questions
```

### Test 2: Model Generation
```
Input: "College students overwhelmed with assignments"
Expected: AI outputs VARIABLES and LINKS sections
```

### Test 3: Analysis
```
Input: "What can we do about it?"
Expected: AI identifies leverage points and loops
```

### Test 4: Parser
```javascript
const text = `
VARIABLES:
- Course Load
- Student Stress

LINKS:
- Course Load -> Student Stress (positive)
`;

const result = parseAIModel(text);
// Should create 2 nodes and 1 edge
```

---

## 🔧 Troubleshooting

### Issue: No nodes created
**Check**: AI output has `VARIABLES:` section
**Fix**: Ensure system prompt is loaded correctly

### Issue: Links not connecting
**Check**: Variable names match exactly in LINKS section
**Fix**: AI should use exact same names

### Issue: Chat panel too tall
**Check**: `max-h-[400px]` class on outer div
**Fix**: Already fixed in ChatPanel.jsx

### Issue: No line breaks in messages
**Check**: `whitespace-pre-wrap` class on message text
**Fix**: Already fixed in ChatPanel.jsx

---

## 📊 Key Metrics

### Response Quality
- Clarifying questions: 2-4 per problem
- Variables per model: 3-7 (start simple)
- Response time: < 3 seconds
- Token usage: < 500 per response

### User Experience
- Messages to first model: 3-5
- Parser success rate: > 98%
- User satisfaction: > 4/5

---

## 🎯 AI Behavior Rules

### DO
✅ Ask clarifying questions first
✅ Use plain language
✅ Keep messages short (2-4 sentences)
✅ Output structured format for models
✅ Explain feedback loops
✅ Encourage iteration

### DON'T
❌ Make assumptions without asking
❌ Use technical jargon
❌ Generate complex models immediately
❌ Claim to modify canvas directly
❌ Rush the user

---

## 🔐 Security

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const chatLimiter = rateLimit({
  windowMs: 60000,      // 1 minute
  max: 10,              // 10 requests
  message: { error: "Too many requests" }
});

app.post('/api/chat', chatLimiter, handler);
```

### Input Validation
```javascript
if (!message || message.trim().length === 0) {
  return res.status(400).json({ error: "Message required" });
}

if (message.length > 1000) {
  return res.status(400).json({ error: "Message too long" });
}
```

---

## 📞 Support Resources

### Documentation
- `AI_SYSTEM_PROMPT.md` - Complete AI specification
- `BACKEND_AI_INTEGRATION.md` - Implementation guide
- `USER_GUIDE.md` - User documentation
- `CONVERSATION_FLOW.md` - Visual flows

### Code References
- `src/context/ChatContext.jsx` - Chat state management
- `src/components/workspace/ChatPanel.jsx` - Chat UI
- `src/utils/parseAIModel.js` - Parser logic

---

## 🎓 Example Conversation

```
AI: 👋 Hi! I'm here to help you explore a problem...
    What problem would you like to explore?

User: Why is student stress increasing?

AI: That's an important question. Let me ask:
    - What year/level of students?
    - What signs of stress?
    - What do you think causes it?

User: College students. Overwhelmed with assignments.

AI: Got it! Let me create a model:

    VARIABLES:
    - Course Load
    - Student Stress
    - Sleep Quality
    - Exam Performance

    LINKS:
    - Course Load -> Student Stress (positive)
    - Student Stress -> Sleep Quality (negative)
    - Sleep Quality -> Exam Performance (positive)
    - Exam Performance -> Student Stress (negative)

    This shows a reinforcing cycle...
    Would you like to refine this?

[User clicks "Add to Canvas"]
[Model appears on canvas]

User: What can we do about it?

AI: Looking at the model, I see leverage points:
    1. Sleep Quality - breaks the cycle
    2. Course Load - addresses root cause
    3. Study Skills - improves efficiency
    
    Would you like to add interventions?
```

---

## ⚡ Performance Tips

### Backend
- Use streaming for long responses (optional)
- Cache system prompt in memory
- Implement conversation history (optional)
- Use connection pooling for DB

### Frontend
- Debounce input (already handled by form submit)
- Lazy load chat history if implementing persistence
- Optimize ReactFlow rendering with memo

---

## 🚦 Status Indicators

### Frontend
✅ Auto-welcome message
✅ Fixed-height chat panel
✅ Enhanced parser
✅ Message formatting
✅ Add to Canvas button

### Backend
⏳ API endpoint implementation
⏳ AI integration
⏳ Rate limiting
⏳ Error handling
⏳ Testing

---

## 📝 Checklist

- [ ] Read AI_SYSTEM_PROMPT.md
- [ ] Choose AI provider
- [ ] Set up environment variables
- [ ] Implement /api/chat endpoint
- [ ] Test with provided test cases
- [ ] Add rate limiting
- [ ] Deploy to production
- [ ] Monitor performance
- [ ] Gather user feedback

---

**Version**: 1.0
**Last Updated**: November 23, 2025
**Status**: Frontend Complete | Backend Pending
