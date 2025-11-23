# SD-AI Studio User Guide

## Welcome! 👋

SD-AI Studio helps you explore complex problems using **systems thinking**. You don't need any prior knowledge - the AI assistant will guide you through the process.

---

## How It Works

### 1️⃣ **Describe Your Problem**
Start by telling the AI about a problem you want to understand. For example:
- "Why is student stress increasing?"
- "Why is traffic getting worse in my city?"
- "Why is my team's productivity dropping?"

### 2️⃣ **Answer Questions**
The AI will ask clarifying questions to understand your problem better. Answer naturally - there are no wrong answers!

### 3️⃣ **Review the Model**
The AI will generate a system model showing:
- **Variables** (the key elements in your system)
- **Links** (how they influence each other)

### 4️⃣ **Add to Canvas**
Click "Add to Canvas" to visualize the model. You can then:
- Drag nodes around
- Edit node properties
- Add more connections
- Delete elements

### 5️⃣ **Explore Insights**
Ask the AI to explain:
- Feedback loops (reinforcing or balancing)
- Leverage points (where to intervene)
- What-if scenarios

---

## Understanding the Model

### Variables
These are the key elements in your system. Examples:
- Population
- Traffic Congestion
- Student Stress
- Team Morale

### Links
These show how variables influence each other:
- **Positive (+)**: When A increases, B increases
- **Negative (-)**: When A increases, B decreases

### Feedback Loops

**Reinforcing Loop** (Vicious or Virtuous Cycle)
```
Motivation ↑ → Productivity ↑ → Success ↑ → Motivation ↑
```
Small changes grow exponentially.

**Balancing Loop** (Self-Correcting)
```
Traffic ↑ → Commute Time ↑ → Public Transit Use ↑ → Traffic ↓
```
The system naturally seeks equilibrium.

---

## Canvas Tools

### Select Tool `[ ]`
- Click nodes to select and edit them
- Drag nodes to reposition
- Click edges to select them

### Add Node `+`
- Click anywhere on canvas to add a new variable
- Edit its name and properties in the right panel

### Add Link `->`
- Click and drag from one node to another
- Creates a causal relationship

### Delete `X`
- Click any node or edge to remove it

### Zoom `++`
- Click to zoom in on the canvas
- Use mouse wheel to zoom in/out

---

## Tips for Better Models

### Start Simple
Begin with 3-5 key variables. You can always add more later.

### Be Specific
Instead of "Economy", use "Household Income" or "Unemployment Rate"

### Look for Loops
The most interesting insights come from feedback loops - where effects circle back to causes.

### Iterate
Models are never "done". Keep refining as you learn more.

### Ask "Why?"
If the AI suggests something unclear, ask for explanation!

---

## Example Conversation

**You:** "Why is student stress increasing?"

**AI:** "That's an important question. Let me ask a few things to understand better:
- What year/level of students are you thinking about?
- What signs of stress are you noticing?
- What do you think might be contributing to it?"

**You:** "College students. They seem overwhelmed with assignments and exams."

**AI:** "Got it. So we're looking at college students feeling overwhelmed. A few more questions:
- Are there other factors beyond coursework? (social life, finances, sleep?)
- What happens when stress increases? Does it affect their performance?"

**You:** "Yes, when stressed they sleep less, which makes it worse. And they perform poorly on exams."

**AI:** "Perfect! I can see a pattern forming. Let me create a simple model:

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

Here's what this shows: More coursework increases stress, which reduces sleep. Poor sleep hurts exam performance, which increases stress even more. This creates a reinforcing cycle.

Would you like to add more factors, or shall we explore what this model tells us?"

**You:** "What can we do about it?"

**AI:** "Looking at the model, I see a few leverage points:

1. **Sleep Quality** - Breaking the stress-sleep cycle could help
2. **Course Load** - Reducing or spacing out assignments
3. **Study Skills** - Better efficiency could reduce stress without changing workload

The most powerful intervention is usually improving sleep, because it breaks the reinforcing loop.

Would you like to add any of these interventions to the model?"

---

## Keyboard Shortcuts

- `Enter` - Send message in chat
- `Delete` - Delete selected node/edge (when in Select mode)
- `Esc` - Deselect all

---

## Saving Your Work

Use the buttons in the header:
- **Save** - Store your current diagram
- **Load** - Retrieve a previously saved diagram
- **Run Model** - Process your model with AI analysis

---

## Need Human Help?

If you're stuck or want to discuss your model with an expert, just tell the AI:

**"Connect me to a human"**

We'll help you connect via Slack or WhatsApp.

---

## Common Questions

**Q: Do I need to know systems thinking?**
A: No! The AI will guide you through everything.

**Q: Can I edit the AI's suggestions?**
A: Absolutely! The AI provides a starting point. You can modify anything.

**Q: What if the AI doesn't understand my problem?**
A: Try rephrasing or providing more specific details. The AI learns from your answers.

**Q: Can I work on multiple models?**
A: Yes! Use Save/Load to manage different projects.

**Q: Is my data private?**
A: Your conversations and models are stored securely. See our privacy policy for details.

---

## Best Practices

✅ **DO:**
- Start with a clear problem statement
- Answer the AI's questions thoughtfully
- Experiment with different structures
- Ask for explanations when confused
- Iterate and refine your model

❌ **DON'T:**
- Rush to build a complex model immediately
- Ignore feedback loops
- Assume the first model is perfect
- Hesitate to ask questions

---

## Getting Started

Ready to begin? Just describe your problem in the chat panel, and the AI will guide you from there!

**Example starting prompts:**
- "I want to understand why [problem] is happening"
- "Help me model [system/situation]"
- "Why does [behavior] keep occurring?"

Happy modeling! 🚀
