const express = require('express');
const { loadCourses } = require('../utils/loadCourses');
const router = express.Router();

// Memuat data kursus sekali saat server dimulai
const courses = loadCourses('./data/courses.xlsx');

// Route untuk Rekomendasi Kursus
router.post('/recommend-courses', (req, res) => {
    const { career } = req.body;

    // Relasi Karir dengan Subjek Kursus
    const careerToSubject = {
        'Data Scientist': ['Data Science', 'Programming'],
        'Software Engineer': ['Programming'],
        'Designer': ['Design'],
    };

    const relevantSubjects = careerToSubject[career];
    if (!relevantSubjects) {
        return res.status(404).send('Karir tidak ditemukan.');
    }

    // Filter Kursus Berdasarkan Subjek
    const recommendedCourses = courses.filter((course) =>
        relevantSubjects.includes(course.subject)
    );

    res.send(recommendedCourses);
});

module.exports = router;
