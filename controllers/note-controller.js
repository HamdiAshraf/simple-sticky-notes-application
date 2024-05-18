
const Note = require('../models/note')



exports.addNote = async (req, res, next) => {
    try {
        const { title, description } = req.body;


        if (!title || !description) {
            return res.render('index', { error: 'Title and description are required.' });
        }


        const newNote = new Note({
            title,
            description
        });
        await newNote.save();


        res.redirect('/getNotes');
    } catch (err) {
        if (err.name === 'ValidationError') {

            const errorMessages = Object.values(err.errors).map(error => error.message);

            return res.render('index', { errors: errorMessages });
        } else {

            console.error(err);
            res.render('error', { message: 'Error adding note' });
        }
    }
}




exports.getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({});
        res.render('notes', { list: notes })

    } catch (err) {
        console.log(err);
        res.redirect('/')
    }

}



exports.getUpdateNote = (req, res) => {
    try {
        const noteId = req.query.id;

        res.render('update', { noteId: noteId });
    } catch (err) {
        console.log(err);
        res.redirect('/err');
    }
}



exports.updateNote = async (req, res) => {
    try {
        const id = req.body.id;
        const title = req.body.title;
        const description = req.body.description;

        const updatedNote = await Note.findByIdAndUpdate(id, { title, description }, { new: true });

        if (updatedNote) {

            res.redirect('/getNotes');
        } else {

            res.status(404).send('Note not found');
        }
    } catch (err) {
        console.log(err);

        res.redirect('/');
    }
};


exports.deleteNote = async (req, res, next) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.redirect('/getNotes');
    } catch (err) {
        console.log(err);
        res.render('error', { message: 'Error deleting note' });
    }
}