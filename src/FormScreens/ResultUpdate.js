import { Button, Grid, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useState } from 'react'
import SSelect from '../Components/FormComponents/SSelect'
import Switch from '@mui/material/Switch';
import STable from '../Components/STable';
import { sendDataWithId } from '../config/firebaseMethods';

export default function ResultUpdate() {

  let [model, setModel] = useState({});
  let [showResult, setShowResult] = useState(false)
  let [result, setResult] = useState([
    {
      totalMarks: 100,
      obtainedMarks: 95,
      studentName: 'Abuzar Thanvi',
      section:'B',
      course:'Web & App Development'
    },
    {
      totalMarks: 100,
      obtainedMarks: 85,
      studentName: 'Rehmat Ali',
      section:'B',
      course:'Web & App Development'
    },
    {
      totalMarks: 100,
      obtainedMarks: 93,
      studentName: 'Ali Abbas',
      section:'B',
      course:'Web & App Development'
    },
    {
      totalMarks: 100,
      obtainedMarks: 90,
      studentName: 'Sohail Ahmad',
      section:'B',
      course:'Web & App Development'
    },
    {
      totalMarks: 100,
      obtainedMarks: 75,
      studentName: 'Sami Ullah',
      section:'B',
      course:'Web & App Development'
    },
  ])
  const [Theadings, setTheadings] = useState(['Student Name', 'Total Marks', 'Obtained Marks', 'Section', 'Course Name']);

  let selected = (key, value) => {
    model[key] = value;
    setModel({ ...model });
  }

  let sendResult = () => {
    model[result] = result;
    // model[tableHeadings] = Theadings;
    console.log(model)

    // sendDataWithId()
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
                <SSelect label='Select Course' sourceArr={['Web & App Development']} selectKey='course' func={selected} />
              </Grid>

              <Grid item lg={4}>
                <Switch onChange={(e) => {
                  model.showResult = e.target.checked
                  setShowResult(e.target.checked);
                }} ></Switch>
              </Grid>

              <Grid item lg={2}>
                {model.course && showResult && <Button variant='contained' onClick={sendResult}>Upload</Button>}
              </Grid>

            </Grid>

          </Box>

        </Box>

      </Container>

      
      <Container maxWidth='lg'>
          {model.course && showResult && <STable rowsData={result} tableHeadings={Theadings}/>}
      </Container>

    </div>
  )
}
