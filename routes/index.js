var express = require('express');
const { addNote, deleteNote, updateNote, getNotes, getUpdateNote } = require('../controllers/note-controller')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/err', function (req, res, next) {
  res.render('error');
});


router.post('/addNote', addNote)


router.get('/getNotes', getNotes)

router.get('/update', getUpdateNote);


router.post('/update', updateNote);

router.post('/delete/:id', deleteNote);




module.exports = router;
