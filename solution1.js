/*  Write a program and 
1. Get all the published backend courses, 
2. sort them by their name,
3. pick only their name and author,
4. and display them
*/


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    
// shape of an object
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();
