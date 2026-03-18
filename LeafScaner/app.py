import os
import numpy as np
from flask import Flask, request, jsonify
from keras.models import load_model
from keras.utils import img_to_array
import base64
from PIL import Image
import io
from flask_pymongo import PyMongo
import tensorflow as tf

app = Flask(__name__)

app.config['MONGO_URI'] = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/leafscaner')
mongo = PyMongo(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.environ.get('MODEL_PATH', os.path.join(BASE_DIR, '..', 'New_Plant_Diseases_Dataset', 'trained_plant_disease_model.h5'))
DATASET_PATH = os.environ.get('DATASET_PATH', os.path.join(BASE_DIR, '..', 'New_Plant_Diseases_Dataset', 'valid'))

try:
    model = load_model(MODEL_PATH)
    print(f'Model loaded from: {MODEL_PATH}')
except Exception as e:
    print(f'Error loading model: {str(e)}')
    model = None

try:
    validation_set = tf.keras.utils.image_dataset_from_directory(
        DATASET_PATH,
        labels='inferred',
        label_mode='categorical',
        color_mode='rgb',
        batch_size=32,
        image_size=(128, 128),
        shuffle=True,
        seed=None
    )
    class_names = validation_set.class_names
    print(f'Loaded {len(class_names)} classes from: {DATASET_PATH}')
except Exception as e:
    print(f'Error loading validation dataset: {str(e)}')
    class_names = []

def prepare_image(image_data):
    try:
        if image_data.startswith('data:image'):
            image_data = image_data.split(',')[1]
        image_data = base64.b64decode(image_data)
        img = Image.open(io.BytesIO(image_data)).convert('RGB')
        img = img.resize((128, 128))
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    except Exception as e:
        print(f'Error preparing image: {str(e)}')
        return None

@app.get('/health')
def health():
    ready = model is not None and len(class_names) > 0
    return jsonify({
        'status': 'ok' if ready else 'degraded',
        'model_loaded': model is not None,
        'class_count': len(class_names),
    }), 200 if ready else 503

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500

        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'Image data is missing'}), 400

        input_array = prepare_image(data['image'])
        if input_array is None:
            return jsonify({'error': 'Image preparation failed'}), 500

        predictions = model.predict(input_array)
        predicted_index = np.argmax(predictions, axis=1).tolist()[0]
        predicted_class_name = class_names[predicted_index]

        mongo.db.images.insert_one({
            'processed': True,
            'predictions': predicted_class_name
        })

        return jsonify({'predictions': predicted_class_name})
    except Exception as e:
        print(f'Error in prediction: {str(e)}')
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)
