const tf = require('@tensorflow/tfjs-node');

// Fungsi untuk preprocessing input data
const preprocessInput = (inputData) => {
    return tf.tensor2d([
        [
            inputData.gender,
            inputData.absence_days,
            inputData.extracurricular_activities,
            inputData.weekly_self_study_hours,
            inputData.math_score,
            inputData.history_score,
            inputData.physics_score,
        ],
    ]);
};

module.exports = { preprocessInput };
