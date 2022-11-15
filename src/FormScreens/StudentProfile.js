import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import SMDrawer from '../Components/SMDrawer'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { checkUser, getDataFull, signOutUser } from '../config/firebaseMethods'
import StudentDetail from './StudentDetail'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import QuizStudent from './Quiz';

export default function StudentProfile() {

  const location = useLocation();

  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    checkUser().then((success) => {

      getDataFull(`users/${success}`)
        .then((data) => {
          if (data.category == 'student') {
            setIsShow(true)
            navigate('studentDetail',{
              state: location.state
            })
          }
          else {
            navigate('/login')
          }
        })

    }).catch((error) => navigate("/login"))
  }, [])
  
  const navigate = useNavigate()
  
  const logOutUser = () => {
    signOutUser().then((success)=>{
      navigate('/login')
    })
  }

  const routeLinks = [
    {
      to: () => navigate('studentDetail'),
      label: 'Personal Detail',
      icon: () => <PermContactCalendarIcon/>
    },
    {
      to: () => navigate('quiz'),
      label: 'Take Quiz',
      icon: () => <PsychologyAltIcon/>
    },
  ]

  const dataRoutes = () => {
    return (
      <Routes>
        <Route path='studentDetail' element={<StudentDetail />}></Route >
        <Route path='quiz' element={<QuizStudent />}></Route >
      </Routes>
    )
  }

  return (
    <>
      {isShow ? <div>
        < SMDrawer dataRoutes={dataRoutes} routeLinks={routeLinks} logOutUser={logOutUser}> </SMDrawer >
      </div >
        : <div style={flexCenter}>
          <img src='https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif' width='300px'></img>
        </div>
      }
    </>
  )
}

const flexCenter = {
  width: '100%',
  height: '100vh',
  display: "flex",
  justifyContent: 'center',
  alignItems: "center"
}