// the controller does CRUD for the DB
// import the model here
const Note = require("../models/note")

// READ ALL
module.exports.readAll = (req, res) => {
    Note.find()
        .then((allDaNotes) => {
            res.json(allDaNotes)
        })
        .catch((err) => res.json(err));
}

// READ ONE
module.exports.readOne = (req, res) => {
    console.log(req.params)
    Note.findById(req.params.id)
        .then(oneSingleNote => {
            res.json(oneSingleNote)
        })
        .catch((err) => {
            res.json(err)
        });
}

// CREATE
module.exports.create = (req, res) => {
    Note.create(req.body)
        .then(newlyCreatedNote => {
            res.json(newlyCreatedNote)
        })
        .catch((err) => {
            // ! from now on we will respond to the client with status codes
            res.status(400).json(err)
        });
}

// UPDATE
module.exports.update = (req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch((err) => {
            res.json(err)
        });
}

// DELETE
module.exports.delete = (req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        });
}