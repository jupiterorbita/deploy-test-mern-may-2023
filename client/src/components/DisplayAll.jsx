import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const DisplayAll = (props) => {
    // state for this component
    const [notes, setNotes] = useState([])
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        // get all the stuff from the DB
        axios.get("http://localhost:8000/api/notes/")
            .then(res => {
                console.log(res.data)
                setNotes(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [trigger])

    // to delete
    const justDelete = (noteId) => {
        console.log(noteId)
        // go to the server with the id to delete
        axios.delete("http://localhost:8000/api/notes/" + noteId)
            .then(res => {
                console.log(res.data)
                // 1. filter
                const filteredNotes = notes.filter((eachNote) => {
                    if (eachNote._id === noteId) {
                        return false
                    } else {
                        return true
                    }
                })
                // short way
                // const filteredNotes2 = notes.filter(eachNote => eachNote._id !== noteId)

                // set new state
                setNotes(filteredNotes)

                // 2. re-trigger useEffect
                // setTrigger(!trigger)
            })
            .catch(err => console.log(err.response.data))
    }

    return (
        <div>
            {JSON.stringify(notes)}
            <hr />
            {
                notes.map((note) => {
                    return (
                        <div key={note._id}>
                            <h3>{note.isImportant ? "📌" : ""} -

                                {/* <Link to={`/notes/${note._id}`}> */}
                                <Link to={"/notes/"+note._id}>

                                    {note.title}
                                </Link>


                            </h3>
                            <p>
                                {note.content}
                            </p>
                            <p>
                                date: {note.createdAt}
                            </p>
                            <Link to={`/notes/${note._id}/edit`} >Edit</Link> --
                            <button onClick={() => justDelete(note._id)}>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DisplayAll