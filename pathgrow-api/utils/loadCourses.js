const fs = require('fs');
const xlsx = require('xlsx');

// Fungsi untuk memuat data kursus dari file Excel
const loadCourses = (filePath) => {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Mengembalikan array dari objek kursus
        return data.map((course) => ({
            title: course.course_title,
            subject: course.subject,
            source: course.url, // Bisa diubah jika URL adalah sumber
            price: course.price,
        }));
    } catch (error) {
        console.error('Gagal memuat file kursus:', error);
        throw new Error('Error loading courses.');
    }
};

module.exports = { loadCourses };
