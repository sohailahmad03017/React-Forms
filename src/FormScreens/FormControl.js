import { Button, CircularProgress, Grid, Switch, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import STextField from '../Components/FormComponents/STextField'
import SSelect from '../Components/FormComponents/SSelect'
import { sendData, sendDataWithId } from '../config/firebaseMethods'

export default function FormControl() {

    const [model, setModel] = useState({});
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const fillData = (key, value) => {
        model[key] = value;
        setModel({ ...model })
    }

    const submitForm = () => {
        model.cities = cities;
        model.isFormOpen = isOpen;
        setIsLoading(true);

        sendData(model,'FormControl')
            .then((success) => {
                setIsSubmitted(true)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
            })

        setModel({});
        setCities([]);
    }

    return (
        <>
            <Container maxWidth='lg' >

                <Typography variant='h4' sx={{ backgroundColor: 'cornflowerblue', margin: '50px 0px', padding: '10px', textAlign: 'center', fontWeight: '500', color: 'white' }}>
                    Form Controls
                </Typography>

                <Grid container spacing={5}>

                    {isSubmitted && <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ textAlign: 'center' }}>
                        <Typography variant='h4' sx={{ color: 'green' }}>Form Submitted Successfully</Typography>
                    </Grid>}

                    <Grid item lg={6} md={6} sm={6} xm={12} xs={12}>
                        <STextField onChange={(e) => fillData('courseName', e.target.value)} label='Course Name'></STextField>
                    </Grid>

                    <Grid item xl={4} md={6} lg={4} sm={12} xs={12} sx={{ display: 'flex' }}>
                        <STextField label='Open In Cities' onChange={(e) => setCity(e.target.value)} value={city}></STextField>
                        <Button onClick={() => {
                            setCities([...cities, city])
                            setCity('');
                            console.log(cities)
                        }} variant='contained' sx={{ marginLeft: '5px' }}>Add</Button>
                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xm={12} xs={12}>
                        <p style={{ marginBottom: '5px' }}>Opening Date</p>
                        <STextField onChange={(e) => fillData('openingDate', e.target.value)} label='' type='date' ></STextField>
                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xm={12} xs={12}>
                        <p style={{ marginBottom: '5px' }}>Closing Date</p>
                        <STextField onChange={(e) => fillData('closingDate', e.target.value)} label='' type='date' ></STextField>
                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xm={12} xs={12}>
                        <b>Is Form Open: </b> <Switch onChange={(e) => {
                            setIsOpen(e.target.checked);
                        }} ></Switch>
                    </Grid>

                    <Grid item xl={12} md={12} lg={12} sm={12} xs={12} >
                        {
                            cities && cities.length > 0 &&
                            <Typography variant='h6'>Cities</Typography>
                        }
                        {
                            cities && cities.length > 0 ?
                                cities.map((e, i) => {
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
