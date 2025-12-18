"""
UNIROLS NLP CHATBOT - Flask API Server
Production-ready REST API for chatbot
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import uuid
from datetime import datetime, timedelta
from train_model import UnirolsNLPModel

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": os.getenv('ALLOWED_ORIGINS', '*').split(',')
    }
})

# Load NLP model
print("🚀 Loading NLP model...")
try:
    model = UnirolsNLPModel.load_model()
except:
    print("⚠️  No trained model found. Training new model...")
    model = UnirolsNLPModel()
    model.save_model()

# Session management
sessions = {}
SESSION_TIMEOUT = timedelta(minutes=30)

def clean_old_sessions():
    """Remove expired sessions"""
    now = datetime.now()
    expired = [
        sid for sid, data in sessions.items()
        if now - data['last_activity'] > SESSION_TIMEOUT
    ]
    for sid in expired:
        del sessions[sid]

def get_or_create_session(session_id=None):
    """Get existing session or create new one"""
    clean_old_sessions()
    
    if session_id and session_id in sessions:
        sessions[session_id]['last_activity'] = datetime.now()
        return session_id
    
    new_id = str(uuid.uuid4())
    sessions[new_id] = {
        'created': datetime.now(),
        'last_activity': datetime.now(),
        'history': []
    }
    return new_id

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'active_sessions': len(sessions),
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Main chat endpoint
    
    POST /api/chat
    Body: {
        "message": "user query",
        "session_id": "optional session id"
    }
    
    Returns: {
        "response": "bot response",
        "session_id": "session id",
        "intent": "detected intent",
        "confidence": 0.95
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({'error': 'No message provided'}), 400
        
        user_message = data['message'].strip()
        session_id = get_or_create_session(data.get('session_id'))
        
        # Get prediction from NLP model
        result = model.predict(user_message)
        
        # Store in session history
        sessions[session_id]['history'].append({
            'user': user_message,
            'bot': result['response'],
            'intent': result['intent'],
            'confidence': result['confidence'],
            'timestamp': datetime.now().isoformat()
        })
        
        # Keep only last 10 messages
        if len(sessions[session_id]['history']) > 10:
            sessions[session_id]['history'] = sessions[session_id]['history'][-10:]
        
        return jsonify({
            'response': result['response'],
            'session_id': session_id,
            'intent': result['intent'],
            'confidence': result['confidence']
        })
    
    except Exception as e:
        print(f"❌ Error processing chat: {str(e)}")
        return jsonify({
            'error': 'Internal server error',
            'message': 'Sorry, I encountered an error. Please try again.'
        }), 500

@app.route('/api/train', methods=['POST'])
def retrain_model():
    """
    Retrain model endpoint (for admin use)
    Requires admin key in header
    """
    admin_key = request.headers.get('X-Admin-Key')
    if admin_key != os.getenv('ADMIN_KEY', 'change-me-in-production'):
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        global model
        print("🔄 Retraining model...")
        model = UnirolsNLPModel()
        model.save_model()
        return jsonify({'message': 'Model retrained successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/sessions/<session_id>/history', methods=['GET'])
def get_session_history(session_id):
    """Get conversation history for a session"""
    if session_id not in sessions:
        return jsonify({'error': 'Session not found'}), 404
    
    return jsonify({
        'session_id': session_id,
        'history': sessions[session_id]['history']
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'False').lower() == 'true'
    
    print("=" * 60)
    print("🤖 UNIROLS NLP CHATBOT SERVER")
    print("=" * 60)
    print(f"📡 Server starting on http://localhost:{port}")
    print(f"🧠 NLP Model: Loaded")
    print(f"🔧 Debug Mode: {debug}")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=port, debug=debug)
