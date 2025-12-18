import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ChatbotWidget.css';

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [sessionId, setSessionId] = useState(null);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const apiUrl = 'http://localhost:5000/api';

    const suggestions = [
        { text: 'What products do you offer?', message: 'What products do you offer?' },
        { text: 'Overhead Travelling Cleaner', message: 'Tell me about Overhead Travelling Cleaner' },
        { text: 'Contact Sales', message: 'How can I contact sales?' },
        { text: 'Location', message: 'Where are you located?' },
    ];

    // Send welcome message on first open
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setTimeout(() => {
                addBotMessage('👋 Hello! Welcome to Unirols Airtex. I\'m your AI-powered assistant trained specifically on our products. How can I help you today?');
            }, 500);
        }
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const addUserMessage = (text) => {
        setMessages(prev => [...prev, { type: 'user', text }]);
    };

    const addBotMessage = (text) => {
        setMessages(prev => [...prev, { type: 'bot', text }]);
    };

    const handleSend = async () => {
        const message = inputValue.trim();
        if (!message) return;

        addUserMessage(message);
        setInputValue('');
        setShowSuggestions(false);
        setIsTyping(true);

        try {
            const response = await fetch(`${apiUrl}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    session_id: sessionId
                })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            setSessionId(data.session_id);
            setIsTyping(false);
            addBotMessage(data.response);

        } catch (error) {
            console.error('Chatbot API Error:', error);
            setIsTyping(false);
            addBotMessage('⚠️ Sorry, I\'m having trouble connecting. Please try again, or contact us directly at sales@unirolsairtex.com');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.message);
        setTimeout(() => handleSend(), 100);
    };

    const formatMessage = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    };

    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    return (
        <>
            {/* Chatbot Toggle Button */}
            <motion.button
                className={`chatbot-button ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
            >
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`} />
            </motion.button>

            {/* Chatbot Container */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-container active"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="chatbot-avatar">
                                <i className="fas fa-robot" />
                            </div>
                            <div className="chatbot-info">
                                <h3>Unirols AI Assistant</h3>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="chatbot-messages">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    className={`message ${msg.type}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="message-avatar">
                                        <i className={`fas ${msg.type === 'user' ? 'fa-user' : 'fa-robot'}`} />
                                    </div>
                                    <div
                                        className="message-content"
                                        dangerouslySetInnerHTML={{
                                            __html: msg.type === 'user'
                                                ? escapeHtml(msg.text)
                                                : formatMessage(msg.text)
                                        }}
                                    />
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="message bot typing-message">
                                    <div className="message-avatar">
                                        <i className="fas fa-robot" />
                                    </div>
                                    <div className="typing-indicator active">
                                        <div className="typing-dots">
                                            <span /><span /><span />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Suggestions */}
                        {showSuggestions && messages.length <= 1 && (
                            <div className="chatbot-suggestions">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        className="suggestion-btn"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion.text}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="chatbot-input-container">
                            <input
                                ref={inputRef}
                                type="text"
                                className="chatbot-input"
                                placeholder="Ask me anything..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                className="chatbot-send-btn"
                                onClick={handleSend}
                                aria-label="Send message"
                            >
                                <i className="fas fa-paper-plane" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatbotWidget;
