import { useEffect, useState } from 'react'
import './css/Profile.css'
import axios from 'axios'
import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const Profile = () => {

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
    setForm({...form, "name":user.name, "email":user.email})
  }

  function closeModal() {
    setIsOpen(false);
  }

  let [user, setUser] = useState();

  let [editProfile, setProfile] = useState(false);

  let [form, setForm] = useState({
    "name":"",
    "email":""
  })
  const handleOnChange= (e)=>{
    const {name, value} = e.target;
    setForm({...form, [name]:value})
  }

  const handleSubmit = async(e)=>{
    try{
      e.preventDefault()
      // console.log(form)
      
        let update = await axios.put("http://localhost:5000/api/user/updateuser", form)
        console.log(update);
        setIsOpen(false)
        location.reload();
    }
    catch(err){
      console.log(err)
    }
  }

  async function getData(){
    let token = localStorage.getItem("token")
    if(token){
      let {data} = await axios.get("http://localhost:5000/api/user/singleuser",{headers: { 
      'Authorization': `Bearer ${token}`}})
      // console.log(data.data);
      setUser(data.data)
    }
  }

  let [file, setFile] = useState();

  const handleUpload = ()=>{
    const formData = new FormData();
    formData.append("file", file)
    let token = localStorage.getItem("token")
      if(token){
        axios.put("http://localhost:5000/api/user/editprofile", formData,{headers: { 
          'Authorization': `Bearer ${token}`}})
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }else{
        alert("Please login and continue...")
      }
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <div className="profile-page">
        {user &&
          <div>
          {/* <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" alt="" width={200} height={200}/> */}
          <img src={`http://localhost:5000/uploads/${user.profile}`} alt="" width={200} height={200}/>
          <button className='editProfile' onClick={()=>{setProfile(!editProfile)}}><i className='bx bxs-edit' ></i></button>
          
          {editProfile && 
            <div>
              <input type='file' name='profile' accept='profile/*'
              onChange={e=>setFile(e.target.files[0])} />
              <button onClick={handleUpload}>Update</button>
            </div>
          }
          </div>
        }
        
        {!user && <h2 className='timeout'>Session timeout...!!! Please Login to continue...
          <Link title='login' to="/">Login</Link></h2>}
        {user && <div className="pro-details">
                    <h2>Name &nbsp;&nbsp;&nbsp; : {user.name}</h2>
                    <h2>Email Id : {user.email}</h2>
                    <h2>Role &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {user.role}</h2>
                    <button onClick={openModal}>Edit profile</button>
                </div>}
  
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <form>
            <h2>Edit Profile</h2>
            <button className='close' onClick={closeModal}>❌</button>
            <input type="text" name="name" value={form.name}
            onChange={handleOnChange} placeholder='name'/>
            <input type="email" name="email" value={form.email}
            onChange={handleOnChange} placeholder='email' />
            
            <button className='submit' onClick={handleSubmit}>Update</button>
          </form>
        </Modal>

    </div>
  )
}

export default Profile