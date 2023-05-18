import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ShowOne = (props) => {

    const { id } = useParams()

    // state vars for this component
    const [title, setTitle] = useState("")
    const [isImportant, setIsImportant] = useState(true)

    // go to the db to get that one thing
    useEffect(() => {
        axios.get("http://localhost:8000/api/notes/" + id)
            .then(res => {
                console.log(res.data)
                setTitle(res.data.title)
                setIsImportant(res.data.isImportant)

            })
            .catch(err => console.log(err.response.data))
    }, [id])

    return (
        <>
            <h2>{title}</h2>
            <p>is this important? {isImportant ? "yes" : "no"}</p>
        </>
    )
}

export default ShowOne