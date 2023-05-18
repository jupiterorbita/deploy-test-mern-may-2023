// import mongoose to build the model 
const mongoose = require('mongoose');

// the model - the rules the entries need to follow
const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        minlength: [2, "title must have at least 2 chars"]
    },
    content: {
        type: String,
        required: [true, "content is required"],
        minlength: [2, "content must have at least 2 chars"]
    },
    isImportant: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note
