const tf = require('@tensorflow/tfjs-node');

// Fungsi untuk memuat model TensorFlow
const loadCareerModel = async () => {
    try {
        const model = await tf.loadLayersModel('file://career_model/model.json');
        console.log('Career model successfully loaded.');
        return model;
    } catch (error) {
        console.error('Failed to load career model:', error);
        throw new Error('Could not load career model.');
    }
};

module.exports = { loadCareerModel };
