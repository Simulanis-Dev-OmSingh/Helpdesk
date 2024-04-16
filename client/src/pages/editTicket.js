import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { apiURL } from '../env'
import { useSelector } from 'react-redux';
const EditTicket = () => {

    const user = useSelector(state => state.user)
    const priorities = ["LOW", "MEDIUM", "HIGH"];
    const statuses = ["NEW", "INPROGRESS", "SOLVED"];
    const types = ["BUG", "SALES"];


    const [status, setStatus] = useState()
    const [priority, setPriority] = useState()
    const [assigned, setAssigned] = useState()
    const [date, setDate] = useState()
    const [type, setType] = useState("Not Defined")
    const [queryData, setQueryData] = useState({})
    const [userData, setUserData] = useState({})




    const location = useLocation()
    const uuid = location.state.uuid



    const fetchQueryData = async () => {
        let { data } = await axios.get(`${apiURL}/api/ticket/get-query`, {
            params: { uuid },
            headers: {
                authorization: `Bearer ${user.token}`
            }
        })

        setQueryData(data.data)
        
        setDate(data.data.createdAt.slice(0, 10).split("-").reverse().join("/"))
        setStatus(data.data.status)
        setUserData(data.data.user)


        //     {data} = await axios.get(`${apiURL}/api/admin/get-admin`, { params: { adminid } ,
        //     headers:{
        //         authorization : `Bearer ${user.token}`
        //       }
        //     })
        //     setAdminData(data.data)

        //     setAssigned(data.data )


        //      {data} = await axios.get(`${apiURL}/api/admin/get-allAdmin` ,{
        //         headers:{
        //         authorization : `Bearer ${user.token}`
        //       }})
        //     setAllAdminData(data.data)

    }


    useEffect(() => {
        fetchQueryData()
    }, [])


    const onSubmit = async (e) => {
        e.preventDefault()
        let data = {
            "uuid": queryData.uuid,
            priority,
            status,
            type

        }
        let res = await axios.post(`${apiURL}/api/ticket/update-ticket`, {
            data, headers: {
                authorization: `Bearer ${user.token}`
            }
        })

    }

    return (
        <>
            <div>
                <h1>EditTicket</h1>
                <div className='d-flex flex-column'>
                    <form onSubmit={onSubmit} >

                        {/* QUERY ID  */}
                        
                        <div className="form-group">
                            <label>query Id: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={queryData.uuid}
                                
                                disabled
                            />
                        </div>


                        {/* TITLE */}
                        <div className="form-group">
                            <label>Title: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={queryData.title}
                                disabled
                            />
                        </div>
                        {/* DESCRIPTION */}
                        <div className="form-group">
                            <label>Description: </label>
                            <textarea className="form-control" value={queryData.description} disabled></textarea>
                        </div>


                        {/* PRIORITY */}
                        <div className="form-group">
                            <label>Priority</label>
                            <select
                                className="form-control"
                                value={priority}
                                onChange={(e) => {
                                    setPriority(e.target.value);
                                }}
                            >
                                {priorities.map((priority) => {
                                    return (
                                        <option key={priority} value={priority}>
                                            {priority}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>



                        {/* STATUS */}

                        <div className="form-group">
                            <label>Status: </label>
                            <select
                                className="form-control"
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                }}
                            >
                                {statuses.map((status) => {
                                    return (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    );
                                })}
                            </select>

                        </div>


                        {/* TYPE */}

                        <div className="form-group">
                            <label>Type: </label>
                            <select required
                                className="form-control"
                                value={type}
                                onChange={(e) => { setType(e.target.value) }}>
                                {
                                    types.map((types) => {
                                        return <option key={types}
                                            value={types}>{types}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>

                        {/* Department */}

                                                <div className="form-group">
                            <label>Type: </label>
                            <select required
                                className="form-control"
                                value={type}
                                onChange={(e) => { setType(e.target.value) }}>
                                {
                                    types.map((types) => {
                                        return <option key={types}
                                            value={types}>{types}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>


                        {/* ASSIGNED TO */}
                        <div className="form-group">
                            <label>Assigned To: </label>
                            <input
                                type="text"
                                className="form-control"
                                // value={`${assigned.department} , ${assigned.email}`}
                                // onChange={(e) => setUserEmail(e.target.value)}
                            />

                            {/* <select
                            className="form-control"
                            value={`${adminData.name} (${adminData.email})`}
                            onChange={(e) => {

                                setStatus(e.target.value);
                            }}
                        >
                            {Object.values(allAdminData).map((status) => {
                                return (
                                    <option key={status} value={status}>
                                        {`${status.name} (${status.email})`}
                                    </option>
                                );
                            })}
                        </select> */}
                        </div>

                        <div className="form-group">
                            <label>Name: </label>
                            <input
                                type="email"
                                className="form-control"
                                value={userData.name} query
                                disabled
                            />
                        </div>


                        <div className="form-group">
                            <label>Email: </label>
                            <input
                                type="email"
                                className="form-control"
                                value={userData.email}
                                disabled
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone </label>
                            <input
                                type="text"
                                className="form-control"
                                value={userData.phone}
                                disabled
                            />
                        </div>

                        <div className="form-group">
                            <label>CreatedAt </label>
                            <input
                                type="text"
                                className="form-control"
                                value={date}
                                disabled
                            />
                        </div>





                        <div className="form-group">
                            <input
                                type="submit"
                                value="Update Ticket"
                                className="btn btn-primary"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditTicket