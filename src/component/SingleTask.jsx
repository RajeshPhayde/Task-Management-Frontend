// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";

const SingleTask = () => {

    const [allTasks, setAllTasks] = useState();

    const getTasks = async ()=>{
        try{
            // let response = await axios.get(`http://localhost:5000/api/task/usertask`)
            // // console.log(response.data)
            // console.log(response.data.data)
            // setAllTasks(response.data.data)

            let token = localStorage.getItem("token")
            if(token){
                let res = await axios.get("http://localhost:5000/api/task/usertask",{headers: { 
                'Authorization': `Bearer ${token}`}})
                console.log(res);
                setAllTasks(res.data.data)
                // .then(res => console.log(res))
                // .catch(err => console.log(err))
            }else{
                alert("Please login and continue...")
            }

        }
        catch(err){
            console.log(err)
        }
    }
    const deleteTask = async (id)=>{
        try{ 
            console.log(id)
            let deleteTask = await axios.delete(`http://localhost:5000/api/task/deletetask/${id}`)
            // let deleteTask = await axios.delete(`http://localhost:5000/api/task/deletetask/:${id}`)
            console.log(deleteTask)
            location.reload();
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getTasks();
    },[])

  return (
    <div>
        {allTasks &&  allTasks.map((v)=>{
            return( <div key={v._id}>
                        <h3>Task Name:  {v.tName}</h3>
                        <h3>Description: {v.description}</h3>
                        <h3>priority: {v.priority}</h3>
                        <h3>dueDate: {v.dueDate}</h3>
                        <button>COMPLETED</button>
                        <button onClick={()=>{deleteTask(v._id)}}>Delete</button>
                    <hr /><hr />
                    </div>)
        })
        }
        {!allTasks && <h2>No Tasks Available</h2>}
    </div>
  )
}

export default SingleTask