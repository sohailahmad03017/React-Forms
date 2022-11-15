import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import SSelect from '../Components/FormComponents/SSelect'
import STextField from '../Components/FormComponents/STextField';
import CircularProgress from '@mui/material/CircularProgress';
import { sendDataWithId, signUpUser } from '../config/firebaseMethods';
import { dateExtract } from '../config/core/basic';
import Navbar from '../Components/Navbar/Navbar';

export default function StudentRegistration() {

  let [model, setModel] = useState({});
  let [isLoading, setIsLoading] = useState(false);
  let [isSubmitted, setIsSubmitted] = useState(false);
  
  //For Sign Up
  let [signUpData,setSignUpData] = useState({});

  const fillData = (key, data) => {
    model[key] = data;
    setModel({...model})
  }

  const submitForm = () => {
    setIsLoading(true)

    // Entitites that are not visible to users
    model.registrationDate = dateExtract(new Date());
    model.isFeeSubmitted = false;
    model.isApproved = false;
    model.isActive = false;

    signUpUser(signUpData)

    sendDataWithId('Students', model)
    .then((success) => {
      setIsLoading(false);
      setIsSubmitted(true);
    })
    .catch((error)=>{
      setIsLoading(false);
    })
  }
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
            to: 'login',
            label: 'Login'
          },
        ]} />
    <div style={flexCenter}>

      {
        isLoading? <CircularProgress size={100} />:

        <Container maxWidth='lg'>

        <Box sx={{ background: '#EDEDED' }} >

          <Typography variant='h5' align='center' sx={{ background: 'cornflowerblue', color: 'white', padding: '10px' }}>
            Student Registration Form
          </Typography>

          <Box sx={{ padding: '20px' }}>

            {isSubmitted && <Box sx={{fontSize:'25px', color:'green', textAlign:'center', margin:'50px 0px'}}>Congratulations! Form Submitted </Box>}

            <Grid container spacing={5}>

              <Grid item lg={4} md={4} sm={6} xm={12} xs={12}>
                <STextField onChange={(e) => {
                  fillData('firstName', e.target.value)
                  setSignUpData({...signUpData, name: e.target.value})
                  setIsSubmitted(false)
                  }} label='First Name' fullWidth={true}></STextField>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xm={12} xs={12}>
                <STextField onChange={(e) => fillData('lastName', e.target.value )} label='Last Name' required={false}></STextField>
              </Grid>
              
              <Grid item lg={4} md={4} sm={6} xm={12} xs={12}>
                <STextField onChange={(e) => fillData('CNIC', e.target.value)} label='CNIC No' type='number' placeholder='3530332093931'></STextField>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xm={12} xs={12}>
                <SSelect label='Select Course' sourceArr={['Web & App Development', 'Graphic Designing']} func={fillData} selectKey='course' />
              </Grid>

              <Grid item lg={4} md={4} sm={6} xm={12} xs={12}>
                <SSelect label='Select Section' sourceArr={['A','B']} func={fillData} selectKey='section' />
              </Grid>

              <Grid item lg={4} md={4} sm={6} xm={12} xs={12}>
                <STextField onChange={(e) => fillData('contactNo', e.target.value)} label='Contact No' type='number' placeholder='923084708676'></STextField>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xm={12} xs={12}>
                <STextField onChange={(e) => fillData('fatherName', e.target.value )} label='Father Name'></STextField>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xm={12} xs={12}>
                <STextField onChange={(e) => fillData('fatherCNIC', e.target.value)} label='Father CNIC No' type='number' placeholder='3530332093931' required={false}></STextField>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xm={12} xs={12}>
                <STextField onChange={(e) => fillData('fatherContactNo', e.target.value)} label='Father Contact No' type='number' placeholder='923084708676'></STextField>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xm={12} xs={12}>
                <STextField onChange={(e) => fillData('emergencyContactNo', e.target.value)} label='Emergency Contact No' type='number' placeholder='923084708676'></STextField>
              </Grid>
              
              <Grid item lg={4} md={4} sm={6} xm={12} xs={12}>
                <STextField onChange={(e) => {
                  fillData('email', e.target.value )
                  setSignUpData({...signUpData, email: e.target.value})}
                  } label='Email' type='email'></STextField>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xm={12} xs={12}>
                <STextField onChange={(e) => {
                  fillData('password', e.target.value )
                  setSignUpData({...signUpData, password: e.target.value, category:'student'})
                  }} label='Password' type='password'></STextField>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xm={12} xs={12}>
                <p style={{marginBottom:'5px'}}>Date of Birth</p>
                <STextField onChange={(e) => fillData('dateOfBirth', e.target.value )} label='' type='date' ></STextField>
              </Grid>

            </Grid>

            <Box sx={{textAlign:'center'}} >
              <Button variant='contained' onClick={submitForm} >Submit Form</Button>
            </Box>

          </Box>

        </Box>
      </Container>

      }
      
    </div>
    </>
  )
}

const flexCenter = {
  display: 'flex', justifyContent: 'center', padding: '30px 0px'
}