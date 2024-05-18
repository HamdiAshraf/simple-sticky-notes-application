const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, 'title is too short'],
        maxLength: [50, 'title is too long']

    },

    description: {
        type: String,
        required: true,
        minLength: [7, 'description is too short'],

        maxLength: [120, 'description is too long']
    }
})


module.exports = mongoose.model('Note', NoteSchema);