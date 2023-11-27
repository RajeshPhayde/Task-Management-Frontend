// import React from 'react'

import axios from "axios";
import { useState } from "react"

const AddTask = () => {

    const [taskData, setTaskData] = useState({
        tName:"",
        description :"",
        dueDate: "",
        priority : "low"
    })
    const handleChange= (e)=>{
        const {name, value} = e.target;
        setTaskData({...taskData, [name]:value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            console.log(taskData);
            let token = localStorage.getItem("token")
            let response = await axios.post("http://localhost:5000/api/task/addtask", taskData,{headers: { 
                'Authorization': `Bearer ${token}`}})
            console.log(response)
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <div className="addTask">
        <form onSubmit={handleSubmit}>
            <h2>Add Task</h2>
            <label>Title: <input type="text" 
            name="tName" onChange={handleChange} required/></label>
            <label>
                Description:
                <textarea name="description" id="" cols="30" rows="10"
                onChange={handleChange} required></textarea>
            </label>
            <label>Due date:<input type="date" name="dueDate"
            onChange={handleChange} required/></label>
            <fieldset>
                <legend>Priority</legend>
                <label>
                    <input type="radio" name="priority"
                    value='high' 
                    onChange={handleChange}
                    checked = {taskData.priority === "high"} 
                    /> high
                </label>
                
                <label>
                    <input type="radio" name="priority"
                    value='low' 
                    onChange={handleChange}
                    checked = {taskData.priority === "low"} 
                    /> low
                </label>
            </fieldset>
            <input className='btn' type="submit" value="Submit" />
        </form>
    </div>
  )
}

export default AddTask