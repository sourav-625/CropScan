# CropScan IR: Smart Crop Monitoring System Using Thermal Imaging

CropScan is an experimental AI-based agricultural monitoring tool that leverages **thermal imaging** and **machine learning** to analyze crop health conditions including:
- 🌿 Pest infestation and disease detection
- 💧 Irrigation need estimation
- 🌫️ Humidity-related stress prediction
- 🌾 Harvest time prediction

Built with a **MERN stack** (MongoDB, Express.js, React.js, Node.js) and integrated with a custom **CNN + Random Forest ML model**, this system offers a unified pipeline from image acquisition to intelligent decision-making.

---

## 🚀 Features

- 📷 Accepts thermal images as input
- 🧠 Extracts statistical, gradient, and histogram-based temperature features
- 🔍 Uses CNN for image-based pattern recognition
- 📊 Classifies pest, irrigation, and humidity conditions via multi-output random forest
- 🌐 Integrated API layer using Flask and Node.js backend

---

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express
- **Database**: MongoDB (Atlas)
- **ML Inference**: Python Flask (CNN + RandomForestClassifier)
- **Libraries**: OpenCV, TensorFlow/Keras, NumPy, scikit-learn

---

## 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sourav-625/CropScan.git
   cd CropScan
   ```
2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```
3. **Set up a Python virtual environment**
   ```bash
   cd ../model
   python -m venv venv
   source venv/bin/activate
   ```
4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
5. **Install frontend dependencies**
   ```bash
   cd ../
   npm install
   ```
## Run The Application

To Run the application first run the model.py and then start the react app (**NOTICE:** *You must have python 3.7 or higher installed in your system*)
```bash
python ./model/model.py
npm start
```
Now you can view the react app opened in your browser on [http://127.0.0.1:3000/](http://127.0.0.1:3000/)

## 📬 Contributing

We welcome contributions from researchers, engineers, and agritech developers.
Please feel free to open issues or submit a pull request after forking this repository and committing your changes on a separate branch.



> ⚠️ Disclaimer
> This project is currently in its experimental and theoretical stage.
> The ML model and its predictions are based on synthetically generated or simulated data.
> It has not been validated in real-world agricultural environments.
> Before real deployment, it must be rigorously tested, verified by agricultural scientists, and certified by experts in crop science and thermal imaging.
> It is not recommended for critical decision-making in production-level agriculture without professional review.
