import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import CourseForm from '../FormScreens/CourseForm';
import Dashboard from '../FormScreens/Dashboard';
import Home from '../FormScreens/Home';
import Login from '../FormScreens/Login';
import QuizForm from '../FormScreens/QuizForm';
import QuizStudent from '../FormScreens/QuizStudent';
import Result from '../FormScreens/Result';
import ResultUpdate from '../FormScreens/ResultUpdate';
import StudentProfile from '../FormScreens/StudentProfile';
import StudentRegistration from '../FormScreens/StudentRegistration';
import TrainerRegistration from '../FormScreens/TrainerRegistration';

export default function AppRouter() {

  const [links, setLinks] = useState([
    {
      to: 'studentRegistration',
      label: 'Student Registration'
    },
    {
      to: 'trainerRegistration',
      label: 'Trainer Registration'
    },
    {
      to: 'dashboard',
      label: 'Dashboard'
    },
  ])


  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='studentRegistration' element={<StudentRegistration />} />
          <Route path='dashboard/*' element={<Dashboard />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='studentProfile/*' element={<StudentProfile />} />
          <Route path='result' element={<Result/>}></Route>
        </Routes>

      </BrowserRouter>
    </>

  )
}
