from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__, static_folder='../frontend/out', static_url_path='')
CORS(app)  # still useful if you ever call from a different origin

# Load model
MODEL_PATH = 'model.pkl'
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError("Model not found. Run train_model.py first.")
with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

# API endpoint
@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = np.array([
            float(data['MedInc']),
            float(data['HouseAge']),
            float(data['AveRooms']),
            float(data['AveBedrms']),
            float(data['Population']),
            float(data['AveOccup']),
            float(data['Latitude']),
            float(data['Longitude'])
        ]).reshape(1, -1)
        pred = model.predict(features)[0] * 100000
        return jsonify({'predicted_price': round(pred, 2)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Serve static files from Next.js 'out' folder
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)