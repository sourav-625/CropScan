from flask import Flask, jsonify
import numpy as np
import cv2
import pymongo
from tensorflow.keras import layers, models
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
from PIL import Image
from flask_cors import CORS
from io import BytesIO

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# MongoDB connection
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["crop_database"]  # Database name
collection = db["crop_images"]  # Collection name

# Parameters
image_size = 40

# Load trained CNN model
cnn_model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(image_size, image_size, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])
cnn_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Multi-output classifier for additional analysis
rf_multi = RandomForestClassifier(n_estimators=100, random_state=42)
multi_target_model = MultiOutputClassifier(rf_multi)

# Function to preprocess images
def preprocess_image(image):
    image = Image.open(BytesIO(image)).convert("L")  # Convert to grayscale
    image = image.resize((image_size, image_size))
    image_array = np.array(image, dtype=np.float32)
    image_array = (image_array - 20) / (35 - 20)  # Normalize
    return image_array[np.newaxis, ..., np.newaxis]  # Reshape to (1, 40, 40, 1)

# Function to compute histogram-based features
def compute_histogram_features(image1, image2):
    hist1 = cv2.calcHist([image1], [0], None, [256], [0, 256])
    hist2 = cv2.calcHist([image2], [0], None, [256], [0, 256])
    
    hist1 = cv2.normalize(hist1, hist1).flatten()
    hist2 = cv2.normalize(hist2, hist2).flatten()
    
    diff = np.sum(np.abs(hist1 - hist2))
    mean_diff = np.mean(np.abs(hist1 - hist2))
    std_diff = np.std(hist1 - hist2)
    chi_square = cv2.compareHist(hist1, hist2, cv2.HISTCMP_CHISQR)
    correlation = cv2.compareHist(hist1, hist2, cv2.HISTCMP_CORREL)
    bhatt = cv2.compareHist(hist1, hist2, cv2.HISTCMP_BHATTACHARYYA)
    
    return [diff, mean_diff, std_diff, chi_square, correlation, bhatt]

# Function to calculate temperature-based features
def calculate_temperature_features(image):
    temp_mean = np.mean(image)
    temp_variance = np.var(image)
    grad_x = np.diff(image, axis=1)
    grad_y = np.diff(image, axis=0)
    temp_gradient = np.sum(np.abs(grad_x)) + np.sum(np.abs(grad_y))
    return [temp_mean, temp_variance, temp_gradient]

@app.route('/analyze', methods=['GET'])
def analyze_crop_health():
    images = list(collection.find({}, {"_id": 0, "image_data": 1}))  # Fetch images from MongoDB
    if not images:
        return jsonify({"error": "No images found in the database"}), 400
    
    processed_images = [preprocess_image(img["image_data"]) for img in images]
    stacked_images = np.vstack(processed_images)  # Shape (num_images, 40, 40, 1)
    
    cnn_features = cnn_model.predict(stacked_images).reshape(len(processed_images), -1)
    
    temp_features = np.array([calculate_temperature_features(np.squeeze(img)) for img in processed_images])
    hist_features = np.array([compute_histogram_features(np.squeeze(processed_images[i-1]), np.squeeze(img)) if i > 0 else [0, 0, 0, 0, 0, 0] 
                              for i, img in enumerate(processed_images)])
    
    combined_features = np.hstack([cnn_features, temp_features, hist_features])
    predictions = multi_target_model.predict(combined_features)
    
    results = []
    for i, pred in enumerate(predictions):
        results.append({
            "image_index": i,
            "pest_status": "Infested" if pred[0] else "Healthy",
            "irrigation_need": "Needed" if pred[1] else "Sufficient",
            "humidity_condition": "High Humidity Issue" if pred[2] else "Optimal"
        })
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
