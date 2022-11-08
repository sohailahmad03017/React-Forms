import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import SSelect from '../Components/FormComponents/SSelect'
import STextField from '../Components/FormComponents/STextField';
import CircularProgress from '@mui/material/CircularProgress';
import { getData, sendDataWithId } from '../config/firebaseMethods';
import { dateExtract } from '../config/core/basic';
import RegisteredStudent from './RegisteredStudent';

export default function CourseForm() {

  let [model, setModel] = useState({});
  let [receivedCourses, setReceivedCourses] = useState([]);
  let [assistantTrainers, setAssistantTrainers] = useState([]);
  let [assistantTrainer, setAssistantTrainer] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let [isSubmitted, setIsSubmitted] = useState(false);

  const fillData = (key, data) => {
    model[key] = data;
    setModel({ ...model })
  }

  
  //Sending data in database
  const submitForm = () => {
    setIsLoading(true)
    model.assistantTrainers = assistantTrainers;
    setAssistantTrainers([]);

    sendDataWithId('Courses', model)
      .then((success) => {
        setIsLoading(false);
        setIsSubmitted(true);
        receiveCourses();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
  }

  //Receiving Data from Database
  const receiveCourses = () => {
    getData('Courses')
    .then((success)=>{
      setReceivedCourses([...success])
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    receiveCourses();
  },[])

  return (
    <div >

      {
        isLoading ? <CircularProgress size={100} /> :

          <Container maxWidth='lg' sx={{ margin: '50px 0px' }}>

            <Box sx={{ background: '#EDEDED' }} >

              <Typography variant='h5' align='center' sx={{ background: 'cornflowerblue', color: 'white', padding: '10px' }}>
                Add Course
              </Typography>

              <Box sx={{ padding: '20px' }}>

                {isSubmitted ? <Box sx={{ fontSize: '25px', color: 'green', textAlign: 'center', margin: '50px 0px' }}>Congratulations! Course Added Successfully </Box> : null}

                <Grid container spacing={5}>

                  <Grid item lg={4} md={4} sm={6} xm={12}>
                    <STextField onChange={(e) => {
                      fillData('courseName', e.target.value);
                      setIsSubmitted(false);
                    }
                    } label='Course Name' fullWidth={true}></STextField>
                  </Grid>


                  <Grid item lg={4} md={4} sm={6} xm={12}>
                    <SSelect label='Select Course Duration(months)' sourceArr={[8, 10, 12, 14, 16]} func={fillData} selectKey='courseDuration' />
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xm={12}>
                    <SSelect label='Form Status' sourceArr={['Open', 'Close']} func={fillData} selectKey='formStatus' />
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xm={12}>
                    <SSelect label='No. of Quizes' sourceArr={[2, 4, 5, 6, 8, 10]} func={fillData} selectKey='noOfQuizes' />
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xm={12}>
                    <STextField onChange={(e) => fillData('feeInRs', e.target.value)} label='Course Fee (Rs.)' type='number' placeholder='4999'></STextField>
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xm={12}>
                    <STextField onChange={(e) => fillData('leadTrainerId', e.target.value)} label='Lead Trainer ID'></STextField>
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xm={12} >
                    <Box sx={{ display: 'flex' }}>
                      <STextField onChange={(e) => setAssistantTrainer(e.target.value)}
                        value={assistantTrainer} label='Assistant Trainers'></STextField>
                      <Button onClick={(e) => {
                        setAssistantTrainers([...assistantTrainers, assistantTrainer]);
                        setAssistantTrainer('');
                      }} variant='contained' sx={{ marginLeft: '5px' }} >Add</Button>
                    </Box>

                    <Box sx={{ margin: '10px ' }}>
                      {
                        assistantTrainers && assistantTrainers.length > 0 ?
                          assistantTrainers.map((item, index) => <p key={index}>{index + 1}. {item}</p>) : 'No Assistant Trainers'
                      }
                    </Box>
                  </Grid>

                </Grid>

                <Box sx={{ textAlign: 'center' }}>
                  <Button variant='contained' onClick={submitForm} >Submit Form</Button>
                </Box>

              </Box>

            </Box>

          </Container>

      }

      <Container maxWidth='lg' sx={{ margin: '50px 0px' }}>

        <Box >

          <Typography variant='h5' align='center' sx={{ background: 'cornflowerblue', color: 'white', padding: '10px' }}>
            Registered Courses
          </Typography>

          {
            receivedCourses && receivedCourses.length > 0 ?
            receivedCourses.map((item,index)=>{
              return(
                <div key={index} style={{boxShadow:'5px 5px 10px gray', margin:'50px 0px', padding:'20px'}}>

                    <h2 align='center' style={{marginBottom:'50px'}}>{item.courseName}</h2>

                    <Grid container spacing={4}>

                        <Grid item md={6} xs={12}>
                            <b>Course Name: </b>{item.courseName}
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <b>Course Duration: </b>{item.courseDuration + '  Months'}
                        </Grid>
                        
                        <Grid item md={6} xs={12}>
                            <b>Form Status: </b>{item.formStatus}
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <b>No. of Quizes: </b>{item.noOfQuizes}
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <b>Course Fee: </b>{'Rs. ' + item.feeInRs}
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <b>Lead Trainer ID: </b>{item.leadTrainerId}
                        </Grid>

                        <Grid item md={12} xs={12}>
                            <b>Assistant Trainers: </b>{item.assistantTrainers.map((data,index)=>{
                              return(
                                <span key={index} style={{marginRight:'15px'}}>{index + 1}. {data} </span>
                              )
                            })}
                        </Grid>

                    </Grid>
                </div>
              )
            }): null 
          }

          

        </Box>

      </Container>

    </div>
  )
}

const flexCenter = {
  display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px 0px'
}