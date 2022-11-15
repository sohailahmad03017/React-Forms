import { Button, CircularProgress, Grid, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useState } from 'react'
import SSelect from '../Components/FormComponents/SSelect'
import Switch from '@mui/material/Switch';
import STable from '../Components/STable';
import { sendData, sendDataWithId } from '../config/firebaseMethods';

export default function ResultUpdate() {

  let [model, setModel] = useState({});
  let [showResult, setShowResult] = useState(false)
  let [result, setResult] = useState([
    {
      totalMarks: 100,
      obtainedMarks: 95,
      studentName: 'Abuzar Thanvi',
      section: 'B',
    },
    {
      totalMarks: 100,
      obtainedMarks: 85,
      studentName: 'Rehmat Ali',
      section: 'B',
    },
    {
      totalMarks: 100,
      obtainedMarks: 93,
      studentName: 'Ali Abbas',
      section: 'B',
    },
    {
      totalMarks: 100,
      obtainedMarks: 90,
      studentName: 'Sohail Ahmad',
      section: 'B',
    },
    {
      totalMarks: 100,
      obtainedMarks: 75,
      studentName: 'Sami Ullah',
      section: 'B',
    },
  ])
  const [Theadings, setTheadings] = useState(['Student Name', 'Total Marks', 'Obtained Marks', 'Section']);
  const [isLoading, setIsLoading] = useState(false)

  let selected = (key, value) => {
    model[key] = value;
    setModel({ ...model });
  }

  let sendResult = () => {
    setIsLoading(true)
    model.showResult = showResult;
    model.result = result;
    model.tableHeadings = Theadings;

    sendDataWithId('results', model).then((success) => {
      setIsLoading(false)
    }).catch((error)=> {
      setIsLoading(false);
    })
  }
  return (
    <div>

      <Container maxWidth='lg' sx={{ margin: '50px 0px' }}>

        <Box sx={{ background: '#EDEDED' }} >

          <Typography variant='h5' align='center' sx={{ background: 'cornflowerblue', color: 'white', padding: '10px' }}>
            Result Update
          </Typography>

          <Box sx={{ padding: '20px' }}>


            <Grid container spacing={5}>


              <Grid item lg={6} md={6} sm={6} xm={12}>
                <SSelect label='Select Course' sourceArr={['Web & App Development', 'Graphic Designing', 'Digital Literacy']} selectKey='course' func={selected} />
              </Grid>

              <Grid item lg={4}>
                <Switch onChange={(e) => {
                  setShowResult(e.target.checked);
                }} ></Switch>
              </Grid>

              <Grid item lg={2}>
                {model.course && <Button variant='contained' onClick={sendResult}>{isLoading? <CircularProgress color='success'/> : 'Upload'}</Button>}
              </Grid>

            </Grid>

          </Box>

        </Box>

      </Container>


      <Container maxWidth='lg'>
        {model.course && <STable rowsData={result} tableHeadings={Theadings} />}
      </Container>

    </div>
  )
}
