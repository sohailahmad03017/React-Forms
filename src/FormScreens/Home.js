import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import SignIn from '../Components/SignIn'

function Home() {
  return (
    <>
    <Navbar links={[
          {
            to: 'studentRegistration',
            label: 'Student Registration'
          },
          {
            to: 'result',
            label: 'Result'
          },
          {
            to: 'dashboard',
            label: 'Dashboard'
          },
        ]} />

    </>
  )
}

export default Home