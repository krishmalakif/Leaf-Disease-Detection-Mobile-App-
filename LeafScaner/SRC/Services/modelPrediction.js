import fs from 'fs';
import axios from 'axios';
import env from '../Config/env.js';

const diseaseTreatments = {
    'Apple scab': 'Apply fungicide containing chlorothalonil or myclobutanil. Ensure proper air circulation and avoid overhead watering.',
    'Black rot': 'Remove infected leaves and apply a copper-based fungicide. Practice crop rotation to prevent recurrence.',
    'Cedar apple rust': 'Use resistant varieties and apply fungicide during flowering. Clean up fallen leaves to reduce spores.',
    'healthy': 'No treatment needed. Continue regular monitoring and care for optimal growth.',
    'Powdery mildew': 'Use sulfur or potassium bicarbonate fungicide. Increase air circulation around plants.',
    'Cercospora leaf spot Gray leaf spot': 'Improve air circulation, avoid overhead watering, and apply appropriate fungicides.',
    'Common rust': 'Use resistant varieties and apply fungicides as needed. Rotate crops to reduce disease spread.',
    'Northern Leaf Blight': 'Rotate crops and use resistant varieties. Remove infected leaves to minimize spread.',
    'Grape Black rot': 'Prune affected vines and use disease-free planting material. Maintain proper irrigation.',
    'Esca (Black Measles)': 'Remove and destroy infected plants. Implement good management practices for grapevines.',
    'Leaf blight (Isariopsis Leaf Spot)': 'Ensure good air circulation and apply appropriate fungicides.',
    'Haunglongbing (Citrus greening)': 'Remove and destroy infected plants. Implement good management practices for citrus trees.',
    'Bacterial spot': 'Use resistant varieties and apply copper-based bactericides.',
    'Early blight': 'Apply fungicides and rotate crops. Remove and destroy infected plant debris.',
    'Late blight': 'Apply fungicides at first sign of symptoms and practice crop rotation.',
    'Leaf scorch': 'Improve air circulation and maintain proper irrigation practices.',
    'Leaf Mold': 'Improve air circulation and apply appropriate fungicides.',
    'Septoria leaf spot': 'Rotate crops and apply fungicides as necessary.',
    'Spider mites Two-spotted spider mite': 'Use insecticidal soap or neem oil. Ensure proper irrigation to avoid stress on plants.',
    'Target Spot': 'Use fungicides and maintain proper air circulation.',
    'Tomato Yellow Leaf Curl Virus': 'Remove and destroy infected plants. Control whiteflies that spread the virus.',
    'Tomato mosaic virus': 'Remove and destroy infected plants. Control aphids that spread the virus.',
};

const formatPrediction = (prediction) => {
    const parts = prediction.trim().split('___');
    let plantName = parts.slice(0, -1).join(' ');
    let diseaseName = parts[parts.length - 1];

    const typeMatch = plantName.match(/\((.*?)\)/);
    if (typeMatch) {
        plantName = `${plantName.replace(/\s*\(.*?\)\s*/, '').trim()} ${typeMatch[1]}`.trim();
    }

    diseaseName = diseaseName.replace(/_/g, ' ').trim();

    return {
        plantName,
        diseaseName,
        treatment: diseaseTreatments[diseaseName] || 'No treatment available.',
    };
};

const predictImage = async (imagePath) => {
    try {
        const base64Image = `data:image/jpeg;base64,${fs.readFileSync(imagePath).toString('base64')}`;
        const response = await axios.post(`${env.flaskUrl}/predict`, { image: base64Image }, { timeout: env.flaskTimeoutMs });

        if (!response.data?.predictions) {
            throw new Error('No predictions returned from API.');
        }

        return formatPrediction(response.data.predictions);
    } catch (error) {
        const apiError = error?.response?.data?.error || error?.response?.data?.message;
        throw new Error(apiError || error.message || 'Error communicating with Flask API');
    }
};

export { predictImage };
