import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Update = (props) => {

    const { id } = useParams()
    const nav = useNavigate()

    // state vars for the form
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isImportant, setIsImportant] = useState(true)

    // go to the db to get that one thing
    useEffect(() => {
        axios.get("http://localhost:8000/api/notes/" + id)
            .then(res => {
                console.log(res.data)
                setTitle(res.data.title)
                setContent(res.data.content)
                setIsImportant(res.data.isImportant)

            })
            .catch(err => console.log(err.response.data))
    }, [id])

    // update form
    // form submit
    const updateNote = (e) => {
        e.preventDefault()
        // console.log(title, content, isImportant)
        // create the obj to be sent to the DB
        const objToBeSent = {
            title,
            content,
            isImportant
        }

        // now send to the server -> DB
        axios.patch("http://localhost:8000/api/notes/" + id, objToBeSent)
            .then(res => {
                console.log(res.data)
                // go to a page
                nav("/")
            })
            .catch(err => console.log(err))
    }

    return (

        <form onSubmit={updateNote} >
            <p>
                title:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </p>
            <p>
                content:
                <input type="text" value={content} onChange={e => setContent(e.target.value)} />
                {/* <textarea onChange={e => setContent(e.target.value)}>{content}</textarea> */}
            </p>
            <p>
                is this important? 🆘:
                <input type="checkbox" checked={isImportant} onChange={e => setIsImportant(e.target.checked)} />
            </p>

            <p></p>
            <button>create</button>
        </form >
    )
}

export default Update