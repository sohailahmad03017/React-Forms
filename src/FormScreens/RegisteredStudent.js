import React, { useEffect, useState } from 'react'
import { getData } from '../config/firebaseMethods'
import { Button, CircularProgress, Grid } from '@mui/material'
import { Box, Container } from '@mui/system'

export default function RegisteredStudent() {

    const [studentsData, setStudentsData] = useState([]);
    const [isGetting, setIsGetting] = useState(false);

    const getRegisteredStudents = () => {
        setIsGetting(true);
        getData('Students')
            .then((success) => {
                setStudentsData([...success]);
                setIsGetting(false);
            })
            .catch((error) => {
                console.log(error)
                setIsGetting(false);
            })
    }

    useEffect(() => getRegisteredStudents(), []);

    const calcAge = (dateOfBirth) => {
        const year = dateOfBirth.slice(0, 4);
        console.log(year)
    }

    return (
        <div style={{}}>

            {
                !isGetting && <h1 align='center' style={{ background: 'cornflowerblue', padding: '5px', color: 'white', margin: '40px 0px' }} >Registered Students</h1>
            }

            {
                isGetting ? <CircularProgress size={100} sx={{ margin: '50px 300px' }} /> :

                    studentsData && studentsData.length > 0 ?
                        studentsData.map((data, index) => {
                            return (

                                <div key={index} style={{ margin: '50px 0px' }}>

                                    <div style={{ boxShadow: '5px 5px 10px gray', padding: '20px', fontSize: '16px' }} >

                                        <h1 align='center' style={{ marginBottom: '20px', background:'gray', color:'white' }}>{data.firstName}</h1>

                                        <Grid container spacing={2}>

                                            <Grid item md={4} xs={12}>
                                                <b>Student ID :  </b>{'WEB' + data.id.slice(10, 15)}
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <b>First Name :  </b>{data.firstName}
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <b>Last Name :  </b>{data.lastName}
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <b>Course :  </b>{data.course}
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <b>Section :  </b>{data.section}
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <b>Email :  </b>{data.email}
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <b>CNIC :  </b>{data.CNIC}
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <b>Date of Birth :  </b>{data.dateOfBirth}
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <b>Age : </b> {new Date().getFullYear() - data.dateOfBirth.slice(0, 4)}
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <b>Contact No :  </b>{data.contactNo}
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <b>Father Name :  </b>{data.fatherName}
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <b>Father CNIC:  </b>{data.fatherCNIC}
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <b>Father Contact No :  </b>{data.fatherContactNo}
                                            </Grid>

                                            <Grid item md={4} xs={12}>
                                                <b>Emergency Contact No :  </b>{data.emergencyContactNo}
                                            </Grid>







                                        </Grid>

                                    </div>

                                </div>
                            )
                        }) : 'No Registered Students' 
                        // <Button variant='contained' onClick={getRegisteredStudents} >Show Registered Student</Button>
            }
        </div>
    )
}
