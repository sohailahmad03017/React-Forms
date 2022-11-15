import { Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { setSelectionRange } from '@testing-library/user-event/dist/utils'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import STextField from '../Components/FormComponents/STextField'
import { checkUser, getData, getDataFull } from '../config/firebaseMethods'

export default function StudentDetail() {

  const location = useLocation();
  const [studentDetail, setStudentDetail] = useState({});
  const [email,setEmail] = useState('');

  useEffect(()=>{
    checkUser().then((success)=>{
      
      getDataFull(`users/${success}`).then((e)=>setEmail(e.email))
    }
    ).catch((error)=>console.log(error))
    
  },[])

  useEffect(() => {
    getData('Students')
      .then((data) => {
        let dat = data.find((e, i) => e.email == email)
        setStudentDetail(dat)
      })
      .catch((err) => console.log(err))
  }, [email])


  return (
    <div style={{ marginTop: '50px' }}>

      <Typography variant='h4' sx={{ textAlign: 'center', background: 'cornflowerblue', padding: '10px', color: 'white', fontWeight: '500' }}>Student Profile</Typography>

      {studentDetail && studentDetail.id &&
        <Grid container spacing={3} sx={{ paddingTop: '15px', display:'flex' }} >

        <Grid item xl={4} lg={4} md={4} sm={12} xs={12} sx={{}}>

          <div style={boxStyling}>

            <img src='https://cdn-icons-png.flaticon.com/512/1154/1154987.png' width='200px' ></img>

            <Typography variant='h5' sx={{ marginTop: '30px' }} >{studentDetail.firstName} {studentDetail.lastName}</Typography>


            <Typography variant='h7' sx={{ margin: '10px 0px' }} >{studentDetail.id ? <> {studentDetail.registrationDate.slice(6, 10)}{studentDetail.course.slice(0, 3)}{studentDetail.id.slice(10, 15)} </> : null}</Typography>

            <Typography variant='h7' >{studentDetail.course}</Typography>

          </div>
        </Grid>

        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
          <div style={boxStyling}>
            <Grid container spacing={3}>


              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Typography variant='h4' sx={{ textAlign: 'center' }} >Personal Details</Typography>
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <b>First Name: </b> {studentDetail.firstName}
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <b>Last Name: </b> {studentDetail.lastName}
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <b>Course: </b> {studentDetail.course}
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <b>Section: </b> {studentDetail.section}
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <b>Email: </b> {studentDetail.email}
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <b>Contact Number: </b> {studentDetail.contactNo}
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <b>CNIC: </b> {studentDetail.CNIC}
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <b>Date of Birth: </b> {studentDetail.dateOfBirth}
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <b>Father Name: </b> {studentDetail.fatherName}
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <b>Father CNIC: </b> {studentDetail.fatherCNIC}
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <b>Father Contact No: </b> {studentDetail.fatherContactNo}
              </Grid>

              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <b>Emergency Contact No: </b> {studentDetail.emergencyContactNo}
              </Grid>

            </Grid>
          </div>
        </Grid>

      </Grid>}

      {/* </Container> */}
    </div>
  )
}

const boxStyling = {
  display: 'flex', alignItems: 'center', flexDirection: 'column', background: 'white', padding: '20px',
  borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
}