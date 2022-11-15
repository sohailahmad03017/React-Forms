import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import SignIn from '../Components/SignIn'

export default function Login() {
    return (
        <div>
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
            to: 'login',
            label: 'Login'
          },
        ]} />

            <SignIn />
        </div>
    )
}
