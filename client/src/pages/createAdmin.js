import React, { useState } from 'react'
import axios from 'axios';
import { apiURL } from '../env';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const CreateAdmin = () => {
  const departments = ["UNITY" , "DEVELOPMENT" , "GRAPHICS"]
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [superadmin, setSuperadmin] = useState(false);
  const [showRes , setShowRes] = useState(false)
    const [res,setRes] = useState("")
  const onSubmit = async(e)=>{
    e.preventDefault()

        let data = {
            name,
            email,
            department,
            superadmin
        }

         let response = await axios.post(`${apiURL}/api/admin/create`, data )
         setShowRes(true)
        setRes(response.data.message.msg)
        setName("")
        setEmail("")
        setDepartment("")
        setSuperadmin(false)
  }
  return (
    <div>

                {showRes ? <h4>{res}</h4> : <h1>Create New Admin</h1>}
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

                    {/* department */}
                    <div className="form-group">
                        <label>Department</label>
                        <select
                            className="form-control"
                            value={department}
                            onChange={(e) => {
                                setDepartment(e.target.value);
                            }}
                        >
                            {departments.map((current) => {
                                return (
                                    <option key={current} value={current}>
                                        {current}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                  {/*Superadmin  */}

                  <div className="form-group">

<input type="checkbox" onClick={() => setSuperadmin(prevadmin => !prevadmin)}></input>
                        <label>Super Admin</label>

                    </div>


                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create Ticket"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
  )
}

export default CreateAdmin