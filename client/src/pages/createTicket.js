import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { apiURL } from '../env';

const CreateTicket = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [origin, setOrigin] = useState("");
    const [priority, setPriority] = useState("");
    const [showRes , setShowRes] = useState(false)
    const [res,setRes] = useState("")
    const location = useLocation()
    useEffect(() => {
        let url = window.location.href.split("/")[2]
        setOrigin(url)
        setPriority("HIGH")
    }, [])
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(name, email, contact, title, description, origin, priority)
        let data = {
            name,
            email,
            contact,
            title,
            description,
            origin,
            priority
        }
        console.log(data)
         let response = await axios.post(`${apiURL}/api/ticket/create`,{data})
         setShowRes(true)
        console.log(response.data.message.msg)
        setRes(response.data.message.msg)
        setName("")
        setEmail("")
        setContact("")
        setTitle("")
        setDescription("")
    }
    console.log(res)



    return (
        <>
            <div>
                
                {showRes ? <h4>{res}</h4> : <h1>Create Ticket</h1>}
                <form onSubmit={onSubmit} >
                    {/* name */}
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}

                        />
                    </div>

                    {/* Email  */}
                    <div className="form-group">
                        <label>Email </label>
                        <input
                            type="text"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* contact */}
                    <div className="form-group">
                        <label> Contact Number: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}

                        />
                    </div>
                    {/* TITLE */}
                    <div className="form-group">
                        <label>Title: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}

                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }} ></textarea>
                    </div>




                    {/* TYPE */}










                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create Ticket"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateTicket