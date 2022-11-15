import { Button, CircularProgress, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import STextField from '../Components/FormComponents/STextField'
import SSelect from '../Components/FormComponents/SSelect'
import { sendDataWithId } from '../config/firebaseMethods'
export default function TrainerRegistration() {

    const [model, setModel] = useState({});
    const [otherQualification, setOtherQualification] = useState('');
    const [otherQualifications, setOtherQualifications] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const fillData = (key, value) => {
        model[key] = value;
        setModel({ ...model })
    }

    const submitForm = () => {
        model.otherQualifications = otherQualifications;
        setIsLoading(true);

        sendDataWithId("trainersForm", model)
            .then((success) => {
                setIsSubmitted(true)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
        setModel({});
        setOtherQualifications([])
    }

    return (
        <>
            <Container maxWidth='lg' >

                <Typography variant='h4' sx={{ backgroundColor: 'cornflowerblue', margin: '50px 0px', padding: '10px', textAlign: 'center', fontWeight: '500', color: 'white' }}>
                    Trainer Registration Form
                </Typography>

                <Grid container spacing={5}>

                    {isSubmitted && <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ textAlign: 'center' }}>
                        <Typography variant='h4' sx={{ color: 'green' }}>Form Submitted Successfully</Typography>
                    </Grid>}

                    <Grid item xl={4} md={6} lg={4} sm={12} xs={12}>
                        <STextField label='First Name' onChange={(e) => {
                            fillData("firstName", e.target.value)
                            setIsSubmitted(false);
                        }}></STextField>
                    </Grid>

                    <Grid item xl={4} md={6} lg={4} sm={12} xs={12}>
                        <STextField label='Last Name' onChange={(e) => fillData("lastName", e.target.value)} value={model.lastName} ></STextField>
                    </Grid>

                    <Grid item xl={4} md={6} lg={4} sm={12} xs={12}>
                        <STextField label='CNIC' type='number' onChange={(e) => fillData("CNIC", e.target.value)} placeholder='3530385233161'></STextField>
                    </Grid>

                    <Grid item xl={4} md={6} lg={4} sm={12} xs={12}>
                        <STextField label='Qualification' onChange={(e) => fillData("qualification", e.target.value)}></STextField>
                    </Grid>

                    <Grid item xl={4} md={6} lg={4} sm={12} xs={12}>
                        <STextField label='Contact No' onChange={(e) => fillData("contactNo", e.target.value)}></STextField>
                    </Grid>

                    <Grid item xl={4} md={6} lg={4} sm={12} xs={12}>
                        <SSelect label="Courses Allowed" func={fillData} selectKey='courseAllowed' sourceArr={['Graphic Designing', 'Web and App Development']}></SSelect>
                    </Grid>

                    <Grid item xl={4} md={6} lg={4} sm={12} xs={12} sx={{ display: 'flex' }}>
                        <STextField label='Other Qualifications' onChange={(e) => setOtherQualification(e.target.value)} value={otherQualification}></STextField>
                        <Button onClick={() => {
                            setOtherQualifications([...otherQualifications, otherQualification])
                            setOtherQualification('');
                        }} variant='contained' sx={{ marginLeft: '5px' }}>Add</Button>
                    </Grid>

                    <Grid item xl={12} md={12} lg={12} sm={12} xs={12} >
                        {
                            otherQualifications && otherQualifications.length > 0 &&
                            <Typography variant='h6'>Other Qualifications</Typography>

                        }
                        {
                            otherQualifications && otherQualifications.length > 0 ?
                                otherQualifications.map((e, i) => {
                                    return (
                                        <Typography variant='body2' key={i}>{i + 1}. {e}</Typography>
                                    )
                                }) : null
                        }
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ textAlign: 'center' }}>
                        <Button variant='contained' onClick={submitForm} >{isLoading ? <CircularProgress /> : "Submit"}</Button>
                    </Grid>

                </Grid>
            </Container>

        </>
    )
}
