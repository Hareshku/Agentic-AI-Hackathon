# Setup Checklist for AI Assistant

## ✅ Frontend (Already Complete)

- [x] Auto-welcome message implemented
- [x] Chat panel with fixed height and scrolling
- [x] Enhanced parser for structured AI output
- [x] Message formatting with line breaks
- [x] "Add to Canvas" functionality
- [x] All diagnostics passing

## 🔲 Backend (To Do)

### 1. Choose AI Provider
- [ ] OpenAI GPT-4 (recommended)
- [ ] Anthropic Claude
- [ ] Local LLM (Ollama)
- [ ] Other: ___________

### 2. Set Up Environment
```bash
# Install dependencies
npm install openai
# or
npm install @anthropic-ai/sdk
# or
npm install axios  # for Ollama

# Create .env file
echo "OPENAI_API_KEY=your-key-here" > .env
echo "AI_MODEL=gpt-4" >> .env
echo "AI_MAX_TOKENS=500" >> .env
echo "AI_TEMPERATURE=0.7" >> .env
```

### 3. Implement API Endpoint
- [ ] Create `POST /api/chat` endpoint
- [ ] Load system prompt from `AI_SYSTEM_PROMPT.md`
- [ ] Implement conversation history management
- [ ] Add error handling
- [ ] Add rate limiting (10 requests/minute recommended)

### 4. Test Implementation
- [ ] Test Case 1: Initial welcome → conceptualization
- [ ] Test Case 2: Clarification → model generation
- [ ] Test Case 3: Model → analysis and insights
- [ ] Test Case 4: Error handling
- [ ] Test Case 5: Rate limiting

### 5. Deploy
- [ ] Set environment variables in production
- [ ] Configure CORS for frontend domain
- [ ] Set up monitoring/logging
- [ ] Document API endpoint for team

## 📚 Documentation Review

- [ ] Read `AI_SYSTEM_PROMPT.md` (AI behavior specification)
- [ ] Read `BACKEND_AI_INTEGRATION.md` (implementation guide)
- [ ] Read `USER_GUIDE.md` (understand user experience)
- [ ] Read `AI_IMPLEMENTATION_SUMMARY.md` (overview)

## 🧪 Testing Scenarios

### Scenario 1: Student Stress
```
User: "Why is student stress increasing?"
Expected: AI asks clarifying questions about level, signs, causes
```

### Scenario 2: Model Generation
```
User: "College students overwhelmed with assignments"
Expected: AI generates VARIABLES and LINKS in structured format
```

### Scenario 3: Analysis
```
User: "What can we do about it?"
Expected: AI identifies leverage points and feedback loops
```

### Scenario 4: Iteration
```
User: "Add social media to the model"
Expected: AI suggests how it connects to existing variables
```

## 🔍 Verification Steps

### Frontend Verification
1. [ ] Open workspace
2. [ ] See welcome message automatically
3. [ ] Type a problem description
4. [ ] Verify chat scrolls internally
5. [ ] Click "Add to Canvas" after AI response
6. [ ] Verify nodes and edges appear correctly

### Backend Verification
1. [ ] Send POST request to `/api/chat`
2. [ ] Verify response contains `reply` field
3. [ ] Verify AI follows system prompt
4. [ ] Verify structured format in model generation
5. [ ] Verify rate limiting works

### Integration Verification
1. [ ] Complete full conversation flow
2. [ ] Generate multiple models
3. [ ] Verify parser handles all AI outputs
4. [ ] Test edge cases (empty input, very long messages)
5. [ ] Test error scenarios (backend down, timeout)

## 🚀 Launch Checklist

- [ ] All tests passing
- [ ] Documentation complete
- [ ] Environment variables configured
- [ ] Rate limiting enabled
- [ ] Error handling tested
- [ ] CORS configured
- [ ] Monitoring set up
- [ ] Team trained on system prompt
- [ ] User guide published
- [ ] Backup plan if AI service is down

## 📊 Success Metrics

Track these after launch:
- [ ] Average conversation length
- [ ] Models generated per session
- [ ] "Add to Canvas" click rate
- [ ] User satisfaction (if surveyed)
- [ ] Error rate
- [ ] API response time

## 🆘 Troubleshooting

### Issue: AI doesn't output structured format
**Solution**: Check system prompt is loaded correctly, verify AI model supports instructions

### Issue: Parser doesn't create nodes
**Solution**: Check AI output format, verify VARIABLES/LINKS sections exist

### Issue: Chat panel expands page
**Solution**: Verify `max-h-[400px]` class is applied to outer container

### Issue: Messages don't show line breaks
**Solution**: Verify `whitespace-pre-wrap` class on message paragraph

### Issue: Backend timeout
**Solution**: Increase timeout, check AI service status, implement retry logic

## 📞 Support Contacts

- **Frontend Issues**: Check `src/components/workspace/ChatPanel.jsx`
- **Parser Issues**: Check `src/utils/parseAIModel.js`
- **AI Behavior**: Review `AI_SYSTEM_PROMPT.md`
- **Backend Setup**: Review `BACKEND_AI_INTEGRATION.md`

## 🎯 Quick Start Command

```bash
# Backend setup (example with OpenAI)
npm install openai express cors dotenv express-rate-limit

# Create endpoint file
cat > server.js << 'EOF'
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const OpenAI = require('openai');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const systemPrompt = fs.readFileSync('AI_SYSTEM_PROMPT.md', 'utf8');

const chatLimiter = rateLimit({
  windowMs: 60000,
  max: 10
});

app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      reply: "I'm having trouble right now. Please try again." 
    });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
EOF

# Run server
node server.js
```

---

**Last Updated**: November 23, 2025
**Status**: Frontend ✅ Complete | Backend ⏳ Pending
