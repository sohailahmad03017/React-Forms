import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import SSelect from '../Components/FormComponents/SSelect'
import STextField from '../Components/FormComponents/STextField';
import CircularProgress from '@mui/material/CircularProgress';
import { getData, sendDataWithId } from '../config/firebaseMethods';
import { dateExtract } from '../config/core/basic';
import { set } from 'firebase/database';

export default function QuizForm() {

  let [model, setModel] = useState({});
  let [receivedCourses, setReceivedCourses] = useState([]);
  let [assistantTrainers, setAssistantTrainers] = useState([]);
  let [assistantTrainer, setAssistantTrainer] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let [isSubmitted, setIsSubmitted] = useState(false);

  let [quizNameSaved, setQuizNameSaved] = useState(false);
  let [finish, setFinish] = useState(false);
  let [questionsArr, setQuestionsArr] = useState([]);
  let [question, setQuestion] = useState({});
  let [questionStatement, setQuestionStatement] = useState('');
  let [option, setOption] = useState('');
  let [optionsArr, setOptionsArr] = useState([]);
  let [answer, setAnswer] = useState('');


  const fillData = (key, data) => {
    model[key] = data;
    setModel({ ...model })
  }


  //Sending data in database
  const uploadQuiz = () => {
    setIsLoading(true)

    sendDataWithId('Quizes', model)
      .then((success) => {
        setIsLoading(false);
        setIsSubmitted(true);
        setFinish(false)
        setQuizNameSaved(false)
        // receiveCourses();
      })
      .catch((error) => {
        setIsLoading(false);
      })
  }

  //Receiving Data from Database
  const receiveCourses = () => {
    getData('Result')
      .then((success) => {
        setReceivedCourses([...success])
      })
      .catch((error) => console.log(error));
  }

  // useEffect(() => {
  //   receiveCourses();
  // }, [])

  let addQuestion = () => {
    //Binding data in object
    question.question = questionStatement;
    question.answer = answer;
    question.options = optionsArr;
    //Adding question in questions Array
    setQuestionsArr([...questionsArr, question]);
    model.questions = [...questionsArr, question];
    //Cleaning States
    setQuestionStatement('');
    setAnswer('');
    setOptionsArr([]);
    setQuestion({});
  }

  let finishQuiz = () => {
    addQuestion();
    setOptionsArr([]);
    setFinish(true);
  }

  return (
    <div >

      {
        isLoading ? <CircularProgress size={100} /> :



          <Container maxWidth='lg' sx={{ margin: '50px 0px' }}>

            {isSubmitted ? <Box sx={{ fontSize: '25px', color: 'green', textAlign: 'center', margin: '50px 0px' }}>Congratulations! Quiz Added Successfully </Box> : null}

            {!finish ? <Box sx={{ background: '#EDEDED', paddingBottom: '50px' }} >

              <Typography variant='h5' align='center' sx={{ background: 'cornflowerblue', color: 'white', padding: '10px' }}>
                Add Quiz
              </Typography>

              <Box sx={{ padding: '20px' }}>

                {!quizNameSaved ?

                  <Grid container spacing={5}>
                    <Grid item lg={4} md={4} sm={6} xm={12}>
                      <SSelect label='Select Course' sourceArr={['Web & App Development', 'Graphic Designing', 'Digital Literacy', 'Wordpress', 'Digital Marketing']} func={fillData} selectKey='courseName' />
                    </Grid>

                    <Grid item lg={4} md={4} sm={6} xm={12}>
                      <STextField onChange={(e) => { fillData('quizName', e.target.value); setIsSubmitted(false) }} label='Quiz Name'></STextField>
                    </Grid>

                    <Grid item lg={4} md={4} sm={6} xm={12}>
                      <STextField onChange={(e) => fillData('quizDuration', e.target.value)} label='Quiz Duration (Minutes)' type='number' placeholder='100'></STextField>
                    </Grid>

                    <Grid item xm={12} md={12} lg={12} sm={12} sx={{ textAlign: 'center' }}>
                      <Button variant='contained' onClick={() => {
                        model.courseName && model.quizName && model.quizDuration && setQuizNameSaved(true)
                      }} >Save and Next Step</Button>
                    </Grid>

                  </Grid> :

                  <Grid container spacing={3}>


                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div ><b>Saved Questions: </b>{questionsArr.length}</div>
                    </Grid>

                    <Grid item lg={8} md={8} sm={8}>
                      <STextField value={questionStatement} onChange={(e) => setQuestionStatement(e.target.value)} label='Question'></STextField>
                    </Grid>

                    <Grid item lg={4} md={4} sm={6} xs={12} >

                      <Box sx={{ display: 'flex' }}>

                        <STextField onChange={(e) => setOption(e.target.value)}
                          value={option} label='Add Options'></STextField>

                        <Button onClick={() => {
                          (questionStatement != '') && (option != "") &&
                            setOptionsArr([...optionsArr, option])
                          setOption('')
                        }} variant='contained' sx={{ marginLeft: '5px' }} >Add</Button>

                      </Box>

                    </Grid>

                    {questionStatement && <Grid item lg={12} sm={12} md={12} xs={12}>
                      <Typography variant='h6' ><b> Question: </b> {questionStatement}</Typography>
                    </Grid>}

                    {optionsArr && optionsArr.length > 0 && optionsArr.map((data, index) => {
                      return (
                        <Grid key={index} item lg={6} sm={12} md={6} xs={12}>
                          <div style={optionStyling} onClick={() => setAnswer(data)} >{data}</div>
                        </Grid>
                      )
                    })}

                    {answer && <Grid item lg={12} sm={12} md={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <b>Correct:</b>  <div style={answerStyling} >{answer}</div>
                    </Grid>}

                    {answer && <Grid item xm={12} md={12} lg={12} sm={12} sx={{ textAlign: 'center' }}>
                      <Button variant='contained' onClick={addQuestion}  >Save Question</Button>
                      <Button variant='contained' onClick={finishQuiz} color='error' sx={{ marginLeft: '15px' }}>Save and Finish Quiz</Button>
                    </Grid>}


                  </Grid>
                }

              </Box>

            </Box> :

              <Box sx={{ background: '#EDEDED', paddingBottom: '50px' }}>

                <Typography variant='h5' align='center' sx={{ background: 'cornflowerblue', color: 'white', padding: '10px' }}>
                  Preview
                </Typography>

                <Grid container spacing={3} sx={{ padding: '20px' }}>

                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <Typography><b>Course Name: </b>{model.courseName}</Typography>
                  </Grid>

                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <Typography><b>Quiz Name: </b>{model.quizName}</Typography>
                  </Grid>

                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <Typography><b>Time Allowed: </b>{model.quizDuration} Minutes</Typography>
                  </Grid>

                  <Grid item lg={6} sm={6} md={6} xs={12}>
                    <Typography><b>Total Questions: </b>{model.questions.length}</Typography>
                  </Grid>
                </Grid>



                {model.questions && model.questions.length > 0 && model.questions.map((data, index) => {
                  return (
                    <Grid container spacing={3} key={index} sx={{ padding: '20px' }} >

                      <Grid item xl={12} md={12} sm={12} xs={12}>
                        <Typography variant='h6'><b>Q.{index + 1}: </b>{data.question}</Typography>
                      </Grid>

                      {data.options.map((value, index) => {
                        return (
                          <Grid key={index} item lg={6} sm={12} md={6} xs={12}>
                            <div style={optionStylingSimple}>{value}</div>
                          </Grid>
                        )
                      })}

                    </Grid>
                  )
                })}

                <Box sx={{ textAlign: 'center', margin: '20px ' }}>
                  <Button onClick={uploadQuiz} variant='contained'>Upload Quiz</Button>
                </Box>


              </Box>}

          </Container>

      }

    </div>
  )
}

const flexCenter = {
  display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px 0px'
}

const optionStyling = {
  background: 'gray', color: 'white', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer'
}

const optionStylingSimple = {
  background: 'gray', color: 'white', padding: '8px 20px', borderRadius: '20px'
}

const answerStyling = {
  background: 'green', color: 'white', padding: '8px 40px', borderRadius: '20px', marginLeft: '20px'
}