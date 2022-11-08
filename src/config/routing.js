import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import CourseForm from '../FormScreens/CourseForm';
import Dashboard from '../FormScreens/Dashboard';
import Home from '../FormScreens/Home';
import QuizForm from '../FormScreens/QuizForm';
import ResultUpdate from '../FormScreens/ResultUpdate';
import StudentRegistration from '../FormScreens/StudentRegistration';
export default function AppRouter() {

  const [links, setLinks] = useState([
    {
      to: 'studentRegistration',
      label: 'Student Registration'
    },
    {
      to: 'dashboard',
      label: 'Dashboard'
    }
  ])
  // const [links, setLinks] = useState([
  //   {
  //     to: '/',
  //     label: 'Registration',
  //   },
  //   {
  //     to: 'courseForm',
  //     label: 'Course'
  //   },
  //   {
  //     to: 'quizForm',
  //     label:'Quiz Questions'
  //   },
  //   {
  //     to:'resultUpdate',
  //     label:'Result Update'
  //   }
  // ])

  return (
    <>
      <BrowserRouter>

        <Navbar links={links} />

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='studentRegistration' element={<StudentRegistration />} />
          <Route path='dashboard/*' element={<Dashboard />}></Route>
        </Routes>

      </BrowserRouter>
    </>

  )
}
