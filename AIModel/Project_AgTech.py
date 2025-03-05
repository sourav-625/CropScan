import numpy as np
import pandas as pd
import streamlit as st
import cv2
import os
from tensorflow.keras import layers, models
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
from PIL import Image
import time

# Parameters
image_size = 40
n_samples = 1000

# Function to preprocess images
def preprocess_image(image_path):
    image = Image.open(image_path).convert("L")
    image = image.resize((image_size, image_size))
    image_array = np.array(image, dtype=np.float32)
    image_array = (image_array - 20) / (35 - 20)  # Normalize
    return image_array[np.newaxis, ..., np.newaxis]

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

# CNN Model
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

# Generate random dataset for training
thermal_image_data = np.random.uniform(20, 35, (n_samples, image_size, image_size))
thermal_image_data_expanded = (thermal_image_data[..., np.newaxis] - 20) / (35 - 20)
cnn_model.fit(thermal_image_data_expanded, np.random.randint(0, 2, n_samples), epochs=5, batch_size=32, validation_split=0.2)

cnn_features = cnn_model.predict(thermal_image_data_expanded)

def calculate_temperature_features(image):
    temp_mean = np.mean(image)
    temp_variance = np.var(image)
    grad_x = np.diff(image, axis=1)
    grad_y = np.diff(image, axis=0)
    temp_gradient = np.sum(np.abs(grad_x)) + np.sum(np.abs(grad_y))
    return [temp_mean, temp_variance, temp_gradient]

# Generate labels
pest_infested = np.random.randint(0, 2, n_samples)
irrigation_needed = np.random.randint(0, 2, n_samples)
humidity_issue = np.random.randint(0, 2, n_samples)

# Train the Multi-Target Model
rf_multi = RandomForestClassifier(n_estimators=100, random_state=42)
multi_target_model = MultiOutputClassifier(rf_multi)

# Streamlit UI
st.title("Crop Health Analysis with Thermal Imaging")
directory_path = st.text_input("Enter the directory path containing images:")

if directory_path and os.path.exists(directory_path):
    image_files = sorted([os.path.join(directory_path, f) for f in os.listdir(directory_path) if f.endswith((".jpg", ".png", ".jpeg"))])
    
    if st.button("Analyze Crop Health"):
        st.text("Processing images... Please wait.")
        time.sleep(2)
        
        previous_image = None
        features_list = []
        for img_path in image_files:
            image = preprocess_image(img_path)
            
            cnn_features_img = cnn_model.predict(image).reshape(1, -1)
            temp_features_img = np.array([calculate_temperature_features(np.squeeze(image))])
            
            if previous_image is not None:
                hist_features = np.array([compute_histogram_features(previous_image, np.squeeze(image))])
            else:
                hist_features = np.zeros((1, 6))  # No histogram features for first image
            
            combined_features = np.hstack([cnn_features_img, temp_features_img, hist_features])
            features_list.append(combined_features)
            previous_image = np.squeeze(image)
        
        features_array = np.vstack(features_list)
        predictions = multi_target_model.predict(features_array)
        
        st.subheader("Analysis Results:")
        for i, img_path in enumerate(image_files):
            y_pred_pest, y_pred_irrigation, y_pred_humidity = predictions[i]
            st.write(f"📷 Image: {os.path.basename(img_path)}")
            st.write(f"🌱 Pest Status: **{'Infested' if y_pred_pest else 'Healthy'}**")
            st.write(f"💧 Irrigation Need: **{'Needed' if y_pred_irrigation else 'Sufficient'}**")
            st.write(f"🌡️ Humidity Condition: **{'High Humidity Issue' if y_pred_humidity else 'Optimal'}**")
            st.write("---")
