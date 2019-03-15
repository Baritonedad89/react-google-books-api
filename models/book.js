const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    image: {
        type: String,
        
    },
    link: {
        type: String,
        required: true,
    }

})









const Book = mongoose.model('book', BookSchema);

module.exports = Book; 