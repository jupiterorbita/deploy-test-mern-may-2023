const NotesController = require("../controllers/controller")

module.exports = app => {
    app.patch('/api/notes/:id', NotesController.update);
    app.delete('/api/notes/:id', NotesController.delete);
    app.get('/api/notes', NotesController.readAll);
    app.get('/api/notes/:id', NotesController.readOne);
    app.post('/api/notes', NotesController.create);
}