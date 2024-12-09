const express = require('express');
const { preprocessInput } = require('../utils/preprocess');
const { loadCareerModel } = require('../utils/loadModels');

const router = express.Router();
let careerModel;

// Memuat model saat server dimulai
(async () => {
    try {
        careerModel = await loadCareerModel();
    } catch (error) {
        console.error('Error loading career model:', error.message);
    }
})();

// Route untuk Prediksi Karir
router.post('/predict-career', async (req, res) => {
    if (!careerModel) {
        return res.status(500).send('Model belum dimuat.');
    }

    const inputData = req.body;

    try {
        // Preprocessing Input
        const inputTensor = preprocessInput(inputData);

        // Prediksi Karir
        const prediction = careerModel.predict(inputTensor);
        const probabilities = prediction.arraySync()[0];
        const careerLabels = ['Data Scientist', 'Software Engineer', 'Designer']; // Sesuaikan dengan model
        const result = careerLabels.map((career, index) => ({
            career,
            probability: (probabilities[index] * 100).toFixed(2) + '%',
        }));

        res.send(result);
    } catch (error) {
        res.status(500).send('Terjadi kesalahan saat memproses prediksi.');
    }
});

module.exports = router;
