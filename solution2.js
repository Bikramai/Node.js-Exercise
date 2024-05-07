/* write a program and
1. Get all the published frontend and backend courses,
2. sort them by their price in a descending order,
3. pick only their name and author,
and display them.
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
        // .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] }}) //1st method

        .find({ isPublished: true})
        .or([ { tags: 'frontend' }, { tags: 'backend' } ]) // 2nd methods either are same

        .sort('-price')
        .select('name author price');
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();
