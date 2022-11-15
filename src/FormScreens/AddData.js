import { Button, CircularProgress, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import STextField from '../Components/FormComponents/STextField'
import SMGrid from '../Components/SGrid';
import { getData, sendDataWithId } from '../config/firebaseMethods';

export default function AddData() {

    const [model, setModel] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const uploadData = () => {
        setIsLoading(true)

        sendDataWithId('cities', model)
            .then((success) => {
                setIsLoading(false)
                getDataItems('cities')
            })
            .catch((err) => {
                setIsLoading(false);
            })
    }

    const getDataItems = (nodeName) => {
        getData(nodeName)
            .then((data) => setData(data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getDataItems('cities')

    }, [])

    return (
        <Container maxWidth='lg' style={{ margin:'50px 0px' }}>

            <Grid container spacing={4} sx={{margin:'30px 0px'}}>

                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant='h4' sx={{ background: 'cornflowerblue', padding: '10px', color: 'white' }} >Add City</Typography>
                </Grid>

                <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                    <STextField label='City Id' onChange={(e) => {
                        model.cityId = e.target.value
                        console.log(model)
                    }}></STextField>
                </Grid>

                <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                    <STextField label='Full Name' onChange={(e) => {
                        model.fullName = e.target.value
                        console.log(model)
                    }}></STextField>
                </Grid>

                <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                    <STextField label='Display Name' onChange={(e) => {
                        model.displayName = e.target.value
                        console.log(model)
                    }}></STextField>
                </Grid>

                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ textAlign: 'center' }}>
                    <Button variant='contained' onClick={uploadData} >{isLoading ? <CircularProgress /> : 'Upload'}</Button>
                </Grid>

                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ textAlign: 'center' }}>
                    {data && data.length > 0 && <SMGrid dataSource={data} Cols={[
                        {
                            key:'cityId',
                            displayName: 'City Id'
                        },
                        {
                            key:'fullName',
                            displayName: 'Full Name'
                        },
                        {
                            key:'displayName',
                            displayName: 'Display Name'
                        },
                    ]} />}
                </Grid>

            </Grid>
        </Container>
    )
}
