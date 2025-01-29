// Required dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Chat patterns and responses
const chatPatterns = {
    hello: {
        pattern: /\b(hello|hi|hey)\b/i,
        responses: [
            "Hi there! How can I help you today?",
            "Hello! Nice to meet you.",
            "Hey! What's on your mind?"
        ]
    },
    howAreYou: {
        pattern: /\bhow are you\b/i,
        responses: [
            "I'm doing well, thanks for asking! How about you?",
            "Pretty good! How are you?",
            "I'm great! How's your day going?"
        ]
    },
    weather: {
        pattern: /\bweather\b/i,
        responses: [
            "I can't check the weather, but I hope it's nice where you are!",
            "Sorry, I don't have access to weather information.",
            "You might want to check a weather app for that information."
        ]
    },
    thanks: {
        pattern: /\b(thank you|thanks)\b/i,
        responses: [
            "You're welcome!",
            "Glad I could help!",
            "No problem at all!"
        ]
    }
};

const defaultResponses = [
    "I'm not sure I understand. Could you rephrase that?",
    "That's interesting! Tell me more.",
    "I'm still learning. Could you explain what you mean?",
    "Hmm, I'm not quite sure how to respond to that."
];

// Chat history storage (in-memory - replace with database in production)
const chatHistory = new Map();

// Helper function to generate response
function generateResponse(message) {
    for (const [key, value] of Object.entries(chatPatterns)) {
        if (value.pattern.test(message)) {
            return value.responses[Math.floor(Math.random() * value.responses.length)];
        }
    }
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Routes
app.post('/api/chat', (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get or create chat history for this session
        if (!chatHistory.has(sessionId)) {
            chatHistory.set(sessionId, []);
        }

        const response = generateResponse(message);

        // Store the conversation
        chatHistory.get(sessionId).push({
            timestamp: new Date(),
            message,
            response
        });

        res.json({
            response,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('Error processing chat message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get chat history for a session
app.get('/api/chat/history/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const history = chatHistory.get(sessionId) || [];
    res.json(history);
});

// Clear chat history for a session
app.delete('/api/chat/history/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    chatHistory.delete(sessionId);
    res.json({ message: 'Chat history cleared' });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Start server
app.listen(port, () => {
    console.log(`Chatbot backend server running on port ${port}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;