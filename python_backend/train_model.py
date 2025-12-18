"""
UNIROLS NLP CHATBOT - Simplified Model Training (No NLTK)
Train using sentence transformers only - works on all platforms
"""

import json
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from training_data import TRAINING_DATA
import os

class UnirolsNLPModel:
    def __init__(self):
        print("🔄 Loading sentence transformer model...")
        self.sentence_model = SentenceTransformer('all-MiniLM-L6-v2')  # 80MB model
        self.intents = TRAINING_DATA['intents']
        self.patterns = []
        self.tags = []
        self.responses = {}
        
        # Build training data
        self._prepare_training_data()
        
        # Train model
        self._train()
    
    def _prepare_training_data(self):
        """Prepare patterns and tags for training"""
        print("📚 Preparing training data...")
        
        for intent in self.intents:
            tag = intent['tag']
            self.responses[tag] = intent['responses']
            
            for pattern in intent['patterns']:
                # Simple lowercase - no complex preprocessing needed
                cleaned_pattern = pattern.lower().strip()
                self.patterns.append(cleaned_pattern)
                self.tags.append(tag)
        
        print(f"✅ Prepared {len(self.patterns)} patterns across {len(set(self.tags))} intents")
    
    def _train(self):
        """Train the NLP model using sentence embeddings"""
        print("🧠 Training NLP model...")
        
        # Generate embeddings for all patterns
        self.pattern_embeddings = self.sentence_model.encode(self.patterns, show_progress_bar=True)
        
        print(f"✅ Model trained successfully!")
        print(f"   • Patterns: {len(self.patterns)}")
        print(f"   • Intents: {len(set(self.tags))}")
        print(f"   • Embedding dimension: {self.pattern_embeddings.shape[1]}")
    
    def predict(self, user_input, threshold=0.5):
        """
        Predict intent and generate response
        """
        # Simple preprocessing
        processed_input = user_input.lower().strip()
        
        # Generate embedding for user input
        input_embedding = self.sentence_model.encode([processed_input])
        
        # Calculate similarity with all patterns
        similarities = cosine_similarity(input_embedding, self.pattern_embeddings)[0]
        
        # Get best match
        best_match_idx = np.argmax(similarities)
        confidence = similarities[best_match_idx]
        
        if confidence < threshold:
            return {
                'intent': 'unknown',
                'confidence': float(confidence),
                'response': self._get_fallback_response()
            }
        
        predicted_tag = self.tags[best_match_idx]
        response = np.random.choice(self.responses[predicted_tag])
        
        return {
            'intent': predicted_tag,
            'confidence': float(confidence),
            'response': response
        }
    
    def _get_fallback_response(self):
        """Generate fallback response for low confidence predictions"""
        return (
            "I'm not entirely sure about that. Could you rephrase your question?\n\n"
            "I can help you with:\n"
            "• Product information (Overhead Cleaners, Bobbin Transport, Vacuum Systems)\n"
            "• Contact details and quotations\n"
            "• Technical specifications\n\n"
            "Or contact our sales team:\n"
            "📧 sales@unirolsairtex.com\n"
            "📞 +91 93629 06631"
        )
    
    def save_model(self, filepath='python_backend/model/unirols_nlp_model.pkl'):
        """Save trained model to disk"""
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        with open(filepath, 'wb') as f:
            pickle.dump({
                'pattern_embeddings': self.pattern_embeddings,
                'patterns': self.patterns,
                'tags': self.tags,
                'responses': self.responses
            }, f)
        
        print(f"💾 Model saved to {filepath}")
    
    @classmethod
    def load_model(cls, filepath='python_backend/model/unirols_nlp_model.pkl'):
        """Load trained model from disk"""
        instance = cls.__new__(cls)
        instance.sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
        
        with open(filepath, 'rb') as f:
            data = pickle.load(f)
            instance.pattern_embeddings = data['pattern_embeddings']
            instance.patterns = data['patterns']
            instance.tags = data['tags']
            instance.responses = data['responses']
        
        print(f"📂 Model loaded from {filepath}")
        return instance

if __name__ == '__main__':
    print("=" * 70)
    print("          UNIROLS NLP CHATBOT - MODEL TRAINING")
    print("=" * 70)
    print()
    
    # Train model
    model = UnirolsNLPModel()
    print()
    
    # Save model
    model.save_model()
    print()
    
    # Test predictions
    print("=" * 70)
    print("          TESTING MODEL")
    print("=" * 70)
    print()
    
    test_queries = [
        "What products do you offer?",
        "Tell me about overhead cleaners",
        "How much does it cost?",
        "Where are you located?",
        "Can you customize?"
    ]
    
    for query in test_queries:
        print(f"❓ Query: {query}")
        result = model.predict(query)
        print(f"   ✓ Intent: {result['intent']}")
        print(f"   ✓ Confidence: {result['confidence']:.2%}")
        print(f"   ✓ Response: {result['response'][:80]}...")
        print()
    
    print("=" * 70)
    print("✨ Training complete! Model ready to use.")
    print("=" * 70)
