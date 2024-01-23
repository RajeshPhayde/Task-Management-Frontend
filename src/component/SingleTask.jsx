// import React from 'react'
import './css/Tasks.css'
import axios from "axios";
import { useEffect, useState } from "react";

const SingleTask = () => {

    const [allTasks, setAllTasks] = useState();

    const [search, setSearch] = useState('');

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

    
    const handleComplete = async (id)=>{
        try{
            // const formData = new FormData();
            // formData.append("status", cTask)
            // console.log(formData)
            let token = localStorage.getItem("token")
            if(token){
                axios.put(`http://localhost:5000/api/task/taskcompleted/${id}`,
                {headers: {
                    'Authorization':`Bearer ${token}`
                }})
                .then(res=>console.log(res))
                .catch(err=>console.log(err))
                location.reload();
            }
            else{
                alert("Please login to continue...")
            }
        }
        catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=>{
        if(search.length){
            let filteredTask = allTasks.filter(v=>{return v.tName.toLowerCase().includes(search.toLowerCase())})
            // console.log(filteredTask)
            setAllTasks(filteredTask)
        }
        else{
            getTasks();
        }
    },[search])

    let [updatePriority, setUpdatePriority] = useState(false);
    const handlePriority = async()=>{
        if(!updatePriority){
            let high = allTasks.filter(v =>{ return v.priority.includes("high")})
            let low = allTasks.filter(v =>{ return v.priority.includes("low")})
            let tasks = [...high, ...low];
            setAllTasks(tasks)
            setUpdatePriority(!updatePriority);
        }
        else{
            getTasks();
            setUpdatePriority(!updatePriority);
        }
    }

  return (
    <>
        {!allTasks && <marquee><h2>No Tasks Available</h2></marquee>}

        {allTasks && 
            <div className='filterTask'>
                <input className='searchTask' onChange={(e)=>setSearch(e.target.value)} placeholder='Search Tasks'/>
                <button title='Filter by priority' onClick={()=>{handlePriority(updatePriority)}}>Priority</button>
            </div>}

        <div className="tasks">

            {allTasks &&  allTasks.map((v,i)=>{
                return( <div className='oneTask' key={v._id}>
                            {/* <h3>{i+1}</h3> */}
                            <h3>{i+1}). Task Name  :  {v.tName}</h3>
                            <h3>Description &nbsp;&nbsp;&nbsp;&nbsp;: {v.description}</h3>
                            <h3>priority  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {v.priority}</h3>
                            <h3>dueDate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {v.dueDate}</h3>
                            <h3 style={{textDecoration:"underline",marginLeft:"50px"}}>Due in {Math.round((new Date(v.dueDate).getTime()- new Date().getTime())/(1000 * 3600 * 24))} Days</h3>
                            <h3>Status &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {v.status} {v.status=="Completed" && <i className='bx bxs-check-circle' style={{color:'#0cd200'}} ></i>}</h3>
                            <div className="btns">
                                <button title='Mark as Completed' onClick={()=>{handleComplete(v._id)}}>COMPLETED</button>
                                <button onClick={()=>{deleteTask(v._id)}}>Delete Task</button>
                            </div>
                            
                        
                        </div>)
            })
            }
            
        </div>
    </>
    
    
  )
}

export default SingleTask