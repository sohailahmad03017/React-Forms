import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import SDrawer from '../Components/SDrawer'
import SideNavBar from '../Components/SideNavBar/SideNavBar'
import { checkUser, getData, getDataFull } from '../config/firebaseMethods'

export default function () {

  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    checkUser().then((success) => {
      
      getDataFull(`users/${success}`)
      .then((data)=>{
        if(data.category == 'admin'){
          setIsShow(true)
          navigate('courseForm')
        }
        else{
          navigate('/login')
        }
      })
      
    }).catch((error) => navigate("/login"))
  }, [])
  return (
    <div>
      {isShow ?
        <SDrawer />
        : <div style={flexCenter}>
          <img src='https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif' width='300px'></img>
        </div>
      }
    </div>
  )
}

const flexCenter = {
  width:'100%',
  height:'100vh',
  display:"flex",
  justifyContent:'center',
  alignItems:"center"
}