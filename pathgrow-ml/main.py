import os
import pandas as pd
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model

# Inisialisasi Flask
app = Flask(__name__)

# Path model
model_path = './career_model/career_model.h5'

# Muat model neural network
nn_model = load_model(model_path)

# Kolom sesuai X_train
X_train_columns = [
    'gender', 'absence_days', 'weekly_self_study_hours',
    'math_score', 'history_score', 'physics_score',
    'chemistry_score', 'biology_score', 'english_score', 'geography_score',
    'part_time_job', 'extracurricular_activities', 'average_score'
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Ambil data dari request
        input_data = request.json
        print("Input data received:", input_data)  # Debugging line

        # Buat DataFrame dari input
        df = pd.DataFrame([input_data])

        # Pastikan urutan kolom sesuai dengan X_train
        if not all(col in df.columns for col in X_train_columns):
            missing_cols = list(set(X_train_columns) - set(df.columns))
            raise ValueError(f"Missing required columns: {missing_cols}")

        df = df[X_train_columns]

        # Prediksi probabilitas
        probabilities = nn_model.predict(df)[0]

        # Asumsi bahwa kelas output adalah ['Engineer', 'Doctor', 'Other']
        class_labels = ['Lawyer', 'Doctor', 'Government Officer', 'Artist',
       'Social Network Studies', 'Software Engineer', 'Teacher',
       'Business Owner', 'Scientist', 'Banker', 'Writer', 'Accountant',
       'Designer', 'Construction Engineer', 'Game Developer',
       'Stock Investor', 'Real Estate Developer']

        # Gabungkan hasil dengan nama kelas
        prediction_result = {class_labels[i]: float(probabilities[i]) * 100 for i in range(len(class_labels))}

        return jsonify({'success': True, 'prediction': prediction_result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)