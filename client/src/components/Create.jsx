import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Create = (props) => {

    const nav = useNavigate()

    // state vars for the form
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isImportant, setIsImportant] = useState(true)

    // DB errors array
    const [errors, setErrors] = useState([]);

    // form submit
    const createNote = (e) => {
        e.preventDefault()
        // console.log(title, content, isImportant)
        // create the obj to be sent to the DB
        const objToBeSent = {
            title,
            content,
            isImportant
        }

        // now send to the server -> DB
        axios.post("http://localhost:8000/api/notes", objToBeSent)
            .then(res => {
                console.log(res.data)
                // go to a page
                // nav("/")
                nav("/notes/" + res.data._id)
            })
            .catch(err => {
                console.log(err.response.data)
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    return (
        <fieldset>
            <legend>Create.jsx</legend>
            state vars for this component: <br />
            title: {JSON.stringify(title)} <br />
            content: {JSON.stringify(content)} <br />
            isImportant: {JSON.stringify(isImportant)} <br />
            {/* FORM */}
            <form onSubmit={createNote}>
                <p>
                    title:
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </p>
                <p>
                    content:
                    <textarea onChange={e => setContent(e.target.value)}>{content}</textarea>
                </p>
                <p>
                    is this important? 🆘:
                    <input type="checkbox" checked={isImportant} onChange={e => setIsImportant(e.target.checked)} />
                </p>

                <p></p>
                <button>create</button>
            </form>
            <div>
                {errors.map((err, index) => <p key={index}>{err}</p>)}
            </div>
        </fieldset>
    )
}

export default Create