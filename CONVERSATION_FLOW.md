# AI Assistant Conversation Flow

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER ENTERS WORKSPACE                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  AUTO-WELCOME MESSAGE (No user input required)              │
│                                                              │
│  👋 Hi! I'm here to help you explore a problem using        │
│  systems thinking.                                           │
│                                                              │
│  You can start by describing the problem you want to         │
│  understand. For example:                                    │
│  • "Why is student stress increasing?"                       │
│  • "Why is traffic getting worse?"                           │
│  • "Why is my team's productivity dropping?"                 │
│                                                              │
│  Once you tell me your problem, I'll help you:               │
│  ✓ clarify it,                                               │
│  ✓ build a model,                                            │
│  ✓ learn insights from it.                                   │
│                                                              │
│  What problem would you like to explore?                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   PHASE 1: CONCEPTUALIZATION                 │
│                                                              │
│  User: "Why is student stress increasing?"                   │
│                                                              │
│  AI: "That's an important question. Let me ask a few         │
│  things to understand better:                                │
│  - What year/level of students are you thinking about?       │
│  - What signs of stress are you noticing?                    │
│  - What do you think might be contributing to it?"           │
│                                                              │
│  [AI asks 2-4 clarifying questions]                          │
│  [Keeps messages short and friendly]                         │
│  [Uses plain language, no jargon]                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  User provides more details...                               │
│                                                              │
│  User: "College students. They seem overwhelmed with         │
│  assignments and exams. When stressed they sleep less,       │
│  which makes it worse."                                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    PHASE 2: MODEL GENERATION                 │
│                                                              │
│  AI: "Perfect! I can see a pattern forming. Let me create    │
│  a simple model:                                             │
│                                                              │
│  VARIABLES:                                                  │
│  - Course Load                                               │
│  - Student Stress                                            │
│  - Sleep Quality                                             │
│  - Exam Performance                                          │
│  - Study Time                                                │
│                                                              │
│  LINKS:                                                      │
│  - Course Load -> Student Stress (positive)                  │
│  - Student Stress -> Sleep Quality (negative)                │
│  - Sleep Quality -> Exam Performance (positive)              │
│  - Exam Performance -> Student Stress (negative)             │
│  - Student Stress -> Study Time (negative)                   │
│                                                              │
│  Here's what this shows: More coursework increases stress,   │
│  which reduces sleep. Poor sleep hurts exam performance,     │
│  which increases stress even more. This creates a            │
│  reinforcing cycle.                                          │
│                                                              │
│  Would you like to add more factors, or shall we explore     │
│  what this model tells us?"                                  │
│                                                              │
│  [Button appears: "Add to Canvas"]                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  User clicks "Add to Canvas"                                 │
│                                                              │
│  Frontend Parser (parseAIModel.js):                          │
│  1. Extracts VARIABLES section → creates nodes              │
│  2. Extracts LINKS section → creates edges                  │
│  3. Positions nodes intelligently                            │
│  4. Preserves link types (positive/negative)                 │
│  5. Renders on ReactFlow canvas                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     PHASE 3: ANALYSIS                        │
│                                                              │
│  User: "What can we do about it?"                            │
│                                                              │
│  AI: "Looking at the model, I see a few leverage points:     │
│                                                              │
│  1. **Sleep Quality** - Breaking the stress-sleep cycle      │
│     could help. This is a key intervention point.            │
│                                                              │
│  2. **Course Load** - Reducing or spacing out assignments    │
│     addresses the root cause.                                │
│                                                              │
│  3. **Study Skills** - Better efficiency could reduce        │
│     stress without changing workload.                        │
│                                                              │
│  I also see a reinforcing loop:                              │
│  Stress ↑ → Sleep ↓ → Performance ↓ → Stress ↑              │
│                                                              │
│  The most powerful intervention is usually improving sleep,  │
│  because it breaks the reinforcing loop.                     │
│                                                              │
│  Would you like to add any of these interventions to the     │
│  model?"                                                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    PHASE 4: ITERATION                        │
│                                                              │
│  User: "Yes, add sleep interventions"                        │
│                                                              │
│  AI: "Great! Let me add those:                               │
│                                                              │
│  VARIABLES:                                                  │
│  - Sleep Hygiene Program                                     │
│  - Stress Management Workshops                               │
│                                                              │
│  LINKS:                                                      │
│  - Sleep Hygiene Program -> Sleep Quality (positive)         │
│  - Stress Management Workshops -> Student Stress (negative)  │
│                                                              │
│  Now we can see how interventions might break the cycle.     │
│                                                              │
│  Would you like to explore other scenarios or refine         │
│  further?"                                                   │
│                                                              │
│  [Cycle continues: User can keep iterating]                  │
└─────────────────────────────────────────────────────────────┘
```

---

## State Transitions

```
┌──────────────┐
│   WELCOME    │  ← Initial state (auto-shown)
└──────┬───────┘
       │
       ↓ User describes problem
┌──────────────┐
│ CLARIFYING   │  ← AI asks questions
└──────┬───────┘
       │
       ↓ Problem is clear
┌──────────────┐
│  MODELING    │  ← AI generates VARIABLES + LINKS
└──────┬───────┘
       │
       ↓ User clicks "Add to Canvas"
┌──────────────┐
│   VISUAL     │  ← Model appears on canvas
└──────┬───────┘
       │
       ↓ User asks for insights
┌──────────────┐
│  ANALYSIS    │  ← AI explains loops & leverage points
└──────┬───────┘
       │
       ↓ User wants to refine
┌──────────────┐
│  ITERATION   │  ← Add/modify variables, repeat cycle
└──────────────┘
       │
       ↓ (loops back to any phase)
```

---

## Decision Tree

```
User Message Received
│
├─ Contains "connect me to human"?
│  └─ YES → Provide Slack/WhatsApp connection info
│  └─ NO → Continue
│
├─ Is this the first message?
│  └─ YES → Start CLARIFYING phase
│  └─ NO → Continue
│
├─ Problem well-defined?
│  └─ NO → Ask more clarifying questions
│  └─ YES → Continue
│
├─ User wants model?
│  └─ YES → Generate VARIABLES + LINKS
│  └─ NO → Continue clarifying
│
├─ Model exists?
│  └─ NO → Offer to create one
│  └─ YES → Continue
│
├─ User wants insights?
│  └─ YES → Analyze loops & leverage points
│  └─ NO → Continue
│
└─ User wants to refine?
   └─ YES → Suggest additions/modifications
   └─ NO → Ask what they'd like to explore
```

---

## Message Type Examples

### 1. Clarifying Questions
```
"That's interesting! A few questions:
- Who is affected by this?
- What changes have you noticed?
- What do you think causes it?"
```

### 2. Model Generation
```
"Let me create a model:

VARIABLES:
- [List of 3-7 key elements]

LINKS:
- [Element A] -> [Element B] (positive/negative)

[Plain language explanation]

Would you like to refine this?"
```

### 3. Analysis
```
"Looking at the model, I see:

1. **Reinforcing Loop**: [Description]
2. **Balancing Loop**: [Description]
3. **Leverage Points**: [List]

[Insight about most powerful intervention]

What would you like to explore?"
```

### 4. Iteration
```
"Good idea! Let me add that:

VARIABLES:
- [New variable]

LINKS:
- [New connections]

[Explanation of how it fits]

Anything else to add?"
```

---

## Error Handling Flow

```
User Message
│
├─ Empty/whitespace only?
│  └─ Frontend blocks send (no API call)
│
├─ API timeout?
│  └─ Show: "I'm having trouble connecting. Try again?"
│
├─ API error?
│  └─ Show: "Something went wrong. Please try again."
│
├─ Rate limit exceeded?
│  └─ Show: "Too many requests. Please wait a moment."
│
└─ Success
   └─ Display AI response
```

---

## Special Cases

### Case 1: User is confused
```
User: "I don't understand"

AI: "No problem! Let me explain differently...
[Simpler explanation]

If you'd like to speak with a human expert, just say:
'Connect me to a human'"
```

### Case 2: User wants to start over
```
User: "Let's try a different problem"

AI: "Sure! What new problem would you like to explore?"
[Resets to CLARIFYING phase]
```

### Case 3: User provides incomplete info
```
User: "Traffic"

AI: "I'd like to understand more about the traffic issue:
- Where is this happening?
- When is traffic worst?
- What do you think causes it?"
```

### Case 4: User asks about the tool
```
User: "How does this work?"

AI: "I help you explore problems using systems thinking:
1. You describe a problem
2. I ask questions to understand it
3. We build a visual model together
4. I help you find insights

What problem would you like to explore?"
```

---

## Integration Points

### Frontend → Backend
```javascript
POST /api/chat
{
  "message": "User's message",
  "sessionId": "optional-for-history"
}
```

### Backend → Frontend
```javascript
{
  "reply": "AI's response with VARIABLES/LINKS if modeling"
}
```

### Frontend Parser → Canvas
```javascript
parseAIModel(aiResponse) → {
  nodes: [{ id, position, data }],
  edges: [{ id, source, target, label }]
}
```

---

## Performance Considerations

- **Response Time**: Target < 3 seconds
- **Message Length**: Keep AI responses under 500 tokens
- **Rate Limiting**: 10 messages per minute per user
- **Session Storage**: Optional, improves context
- **Caching**: Consider caching common clarifying questions

---

## Quality Metrics

Track these to ensure good UX:
- Average messages to first model: Target 3-5
- Model generation success rate: Target > 95%
- Parser success rate: Target > 98%
- User satisfaction: Target > 4/5
- Conversation completion rate: Target > 70%

---

**Last Updated**: November 23, 2025
