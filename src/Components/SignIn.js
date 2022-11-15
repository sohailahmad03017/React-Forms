import { Button, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getData, signInUser } from '../config/firebaseMethods'
import Navbar from './Navbar/Navbar'
import PasswordMUI from './PasswordMUI'

//Custom Styling
const flexCenter = {
  height: '90vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const signUpDiv = {
  padding: '20px',
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  border: '2px solid lightgray',
  margin: '10px',
  width: '400px',
  // boxShadow:'5px 5px 10px lightgray, -2px -2px 10px lightgray'
}

export default function SignIn() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState([
    {
      to: '/',
      label: 'Sign Up',
    },
    {
      to: 'login',
      label: 'Sign In'
    }
  ])

  const signIn = () => {
    setIsLoading(true)

    signInUser({ email, password })
      .then((success) => {

        setIsLoading(false);

        if (success.category == 'admin') {
          navigate('/dashboard', {
            state: success
          })
        }
        else if (success.category == 'student') {
          navigate('/studentProfile', {
            state: success
          })
        }

      })
      .catch((error) => {
        setMessage(true)
        setIsLoading(false);
      })
  }

  return (
    <>
      {/* <Navbar links={links}></Navbar> */}

      <div style={flexCenter}>

        {isLoading ?

          <img src='https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif' width='300px'></img> :

          <div style={signUpDiv}>

            {
              message ? <div style={{ color: 'red', margin: '15px 0px', textAlign: 'center' }}>Invalid Email Address or Password</div> : null
            }

            <Typography variant='h3' sx={{ textAlign: 'center', margin: '20px 0px' }}>Sign In</Typography>

            <TextField value={email} onChange={(e) => setEmail(e.target.value)} placeholder='ali@gmail.com' label="Email" variant="outlined" margin='normal' />

            <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" type='password' margin='normal' />

            <Button onClick={signIn} variant='contained' sx={{ padding: '12px', margin: '15px 0px' }}>Login</Button>

            {/* <div style={{textAlign:'center', margin:'15px 0px'}}>Don't have an account. <span onClick={() => navigate('/')} style={{color:'blue', cursor:'pointer'}}>Sign Up</span></div> */}

          </div>
        }

      </div>
    </>
  )
}

