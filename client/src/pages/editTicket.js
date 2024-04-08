import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { apiURL } from '../env'

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
    const queryId = location.state.queryid
    
    
    
    const fetchQueryData = async () => {
        let res = await axios.get(`${apiURL}/api/ticket/get-query`, { params: { queryId } })
        setQueryData(res.data.message.response)
        
        setDate(res.data.message.response.createdAt.slice(0, 10).split("-").reverse().join("/"))
        let userid = res.data.message.response.userid
        let adminid = res.data.message.response.assignedTo
        setStatus(res.data.message.response.status)
        // console.log(res.data)
        
        res = await axios.get(`${apiURL}/api/ticket/get-user`, { params: { userid } })
        setUserData(res.data.message.response)


        res = await axios.get(`${apiURL}/api/admin/get-admin`, { params: { adminid } })
        setAdminData(res.data.message.response)
        // console.log(res.data.message.response)
        setAssigned(res.data.message.response )


        res = await axios.get(`${apiURL}/api/admin/get-allAdmin`)
        setAllAdminData(res.data.message.response)
        // console.log(res.data.message.response)
    }
    
          

    useEffect(() => {
        fetchQueryData()

    }, [])
    // console.log("ALL ADMIN Data",allAdminData , typeof(allAdminData))

    const onSubmit = async (e) => {
        e.preventDefault()
        let data = {
            "queryid" : queryData.queryid,
            priority,
            status,
            type

        }
        let res = await axios.post(`${apiURL}/api/ticket/update-ticket`,{data})
        console.log(res)
    }

    console.log("value",assigned)

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
                            value={queryData.queryid}
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
                                console.log("my" , e.target.value)
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
                        <label>Contact </label>
                        <input
                            type="text"
                            className="form-control"
                            value={userData.contact}
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