# SD-AI Studio

**AI-assisted system dynamics modeling platform** - Build and explore system models through conversational AI.

## 🎯 Overview

SD-AI Studio is a web-based platform that helps users understand complex problems using systems thinking. Through an AI assistant, users can:
- Describe problems in plain language
- Generate visual system models (variables + causal links)
- Explore feedback loops and leverage points
- Iterate and refine models interactively

## 🚀 Features

- **AI-Guided Modeling** - Conversational AI walks users through problem conceptualization to model generation
- **Interactive Canvas** - Drag-and-drop node editor powered by ReactFlow
- **Structured Output Parsing** - Automatically converts AI suggestions into visual diagrams
- **Real-time Collaboration** - Edit nodes, add connections, and refine models visually
- **Save/Load Projects** - Persist your work and return later

## 🛠️ Tech Stack

- **Frontend**: React 19.2 + Vite 7.2
- **Styling**: Tailwind CSS 4.1
- **Canvas**: ReactFlow 11.11
- **HTTP**: Axios
- **Deployment**: GitHub Pages

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🤖 AI Implementation

### Frontend (✅ Complete)
- Auto-welcome message on workspace entry
- Fixed-height scrollable chat panel
- Enhanced parser for structured AI output (VARIABLES/LINKS format)
- "Add to Canvas" functionality

### Backend (⏳ Pending)
The backend needs to implement the `/api/chat` endpoint. See documentation:

- **[AI_SYSTEM_PROMPT.md](./AI_SYSTEM_PROMPT.md)** - Complete AI behavior specification
- **[BACKEND_AI_INTEGRATION.md](./BACKEND_AI_INTEGRATION.md)** - Implementation guide with code examples
- **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** - Step-by-step setup guide

### Quick Backend Setup

```javascript
// Example with OpenAI GPT-4
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

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [AI_SYSTEM_PROMPT.md](./AI_SYSTEM_PROMPT.md) | AI assistant behavior specification |
| [BACKEND_AI_INTEGRATION.md](./BACKEND_AI_INTEGRATION.md) | Backend implementation guide |
| [USER_GUIDE.md](./USER_GUIDE.md) | End-user documentation |
| [AI_IMPLEMENTATION_SUMMARY.md](./AI_IMPLEMENTATION_SUMMARY.md) | Overview of AI implementation |
| [CONVERSATION_FLOW.md](./CONVERSATION_FLOW.md) | Visual conversation flows |
| [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) | Setup and testing checklist |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Quick reference card |

## 🎨 Project Structure

```
AIHackathon/
├── src/
│   ├── api/              # API integration layer
│   ├── components/       # React components
│   │   ├── landing/      # Landing page components
│   │   └── workspace/    # Workspace components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   └── utils/            # Utility functions
├── public/               # Static assets
└── docs/                 # Documentation (AI implementation)
```

## 🔑 Key Components

### Workspace
- **HeaderBar** - Save/load/process actions
- **ToolsPanel** - Canvas tools (select, add node, add link, delete, zoom)
- **CanvasBoard** - ReactFlow diagram editor
- **ChatPanel** - AI assistant interface
- **ModelInspector** - Node property editor

### AI Integration
- **ChatContext** - Manages conversation state
- **parseAIModel** - Converts AI output to nodes/edges
- **Auto-welcome** - Greets users and explains the system

## 🧪 Testing

### Frontend Testing
```bash
# Run development server
npm run dev

# Open http://localhost:5173
# Verify welcome message appears
# Test chat panel scrolling
# Test "Add to Canvas" functionality
```

### Backend Testing
```bash
# Test chat endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Why is student stress increasing?"}'

# Expected: AI asks clarifying questions
```

## 🎯 AI Conversation Flow

```
1. Welcome → User describes problem
2. Conceptualization → AI asks clarifying questions
3. Modeling → AI generates VARIABLES + LINKS
4. Visualization → User clicks "Add to Canvas"
5. Analysis → AI explains loops and leverage points
6. Iteration → Refine and explore further
```

## 📝 AI Output Format

When generating models, the AI outputs:

```
VARIABLES:
- Variable A
- Variable B
- Variable C

LINKS:
- Variable A -> Variable B (positive)
- Variable B -> Variable C (negative)
```

The frontend parser automatically converts this to visual nodes and edges.

## 🌐 Environment Variables

```env
# Backend (create .env file)
OPENAI_API_KEY=sk-your-key-here
AI_MODEL=gpt-4
AI_MAX_TOKENS=500
AI_TEMPERATURE=0.7

# Frontend (optional)
VITE_API_BASE_URL=http://localhost:3000
```

## 🚀 Deployment

### Frontend (GitHub Pages)
```bash
npm run deploy
```

### Backend
Deploy to your preferred platform (Vercel, Railway, Heroku, etc.) with:
- Node.js runtime
- Environment variables configured
- CORS enabled for frontend domain

## 🤝 Contributing

1. Read the documentation (especially AI_SYSTEM_PROMPT.md)
2. Follow the existing code style
3. Test your changes thoroughly
4. Update documentation if needed

## 📄 License

This project is part of the AI Hackathon.

## 🆘 Support

- Check [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for common issues
- Review [CONVERSATION_FLOW.md](./CONVERSATION_FLOW.md) for AI behavior
- See [BACKEND_AI_INTEGRATION.md](./BACKEND_AI_INTEGRATION.md) for implementation help

## 🎓 Example Use Cases

- Understanding student stress factors
- Analyzing traffic congestion
- Exploring team productivity issues
- Modeling population dynamics
- Studying environmental systems
- Investigating economic feedback loops

---

**Status**: Frontend ✅ Complete | Backend ⏳ Pending Integration  
**Last Updated**: November 23, 2025
