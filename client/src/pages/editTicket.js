import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { apiURL ,token} from '../env'

const EditTicket = () => {

    const priorities = ["LOW", "MEDIUM", "HIGH"];
    const statuses = ["NEW", "INPROGRESS", "SOLVED"];
    const types = [ "BUG","SALES"];
    const [status, setStatus] = useState()
    const [priority, setPriority] = useState()
    const [assigned, setAssigned] = useState()
    const [date , setDate ] = useState()
    const [type , setType ] = useState("Not Defined")
    const [queryData, setQueryData] = useState({})
    const [userData, setUserData] = useState({})
    const [adminData, setAdminData] = useState({})
    const [allAdminData ,setAllAdminData] = useState({})



    const location = useLocation()
    const uuid = location.state.uuid



    const fetchQueryData = async () => {
        let res = await axios.get(`${apiURL}/api/ticket/get-query`, {
             params: { uuid },
             headers:{
                authorization : `Bearer ${token}`
              }
            })
        setQueryData(res.data.data)

        setDate(res.data.data.createdAt.slice(0, 10).split("-").reverse().join("/"))
        let userid = res.data.data.userid
        let adminid = res.data.data.assignedTo
        setStatus(res.data.data.status)


        // res = await axios.get(`${apiURL}/api/ticket/get-user`, {
        //     params: { userid },
        //     headers:{
        //         authorization : `Bearer ${token}`
        //       }
        //      })
        setUserData(res.data.data)


        res = await axios.get(`${apiURL}/api/admin/get-admin`, { params: { adminid } ,
        headers:{
            authorization : `Bearer ${token}`
          }
        })
        setAdminData(res.data.data)

        setAssigned(res.data.data )


        res = await axios.get(`${apiURL}/api/admin/get-allAdmin` ,{
            headers:{
            authorization : `Bearer ${token}`
          }})
        setAllAdminData(res.data.data)

    }


    useEffect(() => {
        fetchQueryData()
        // fetchAdminsData()
    }, [])


    const onSubmit = async (e) => {
        e.preventDefault()
        let data = {
            "uuid" : queryData.uuid,
            priority,
            status,
            type

        }
        let res = await axios.post(`${apiURL}/api/ticket/update-ticket`,{data ,headers:{
            authorization : `Bearer ${token}`
          }})

    }


    return (
        <>
            <div>
                <h1>EditTicket</h1>
                <form onSubmit={onSubmit} >
{/* QUERY ID  */}
                    <div className="form-group">
                        <label>query Id: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={queryData.uuid}
                            // onChange={(e) => setUserEmail(e.target.value)}
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
                            // onChange={(e) => setUserEmail(e.target.value)}
                            disabled
                        />
                    </div>
{/* DESCRIPTION */}
                    <div className="form-group">
                        <label>Description: </label>
                        {/* <input
            type="text"
            className="form-control"
            value={queryData.description}
            style={{ width: "auto" }}
            // onChange={(e) => setUserEmail(e.target.value)}
            disabled
            /> */}
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
                              onChange={(e)=>{setType(e.target.value)}}>
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
                            disabled
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
                            value={userData.name}
                            // onChange={(e) => setUserEmail(e.target.value)}
                            disabled
                        />
                    </div>


                    <div className="form-group">
                        <label>Email: </label>
                        <input
                            type="email"
                            className="form-control"
                            value={userData.email}
                            // onChange={(e) => setUserEmail(e.target.value)}
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
            type="email"
            className="form-control"
            value={date}
            // onChange={(e) => setUserEmail(e.target.value)}
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
        </>
    )
}

export default EditTicket