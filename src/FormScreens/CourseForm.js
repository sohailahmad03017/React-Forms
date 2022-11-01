import React, { useEffect, useState } from 'react'
import Input from '../Components/Input'
import { Container,Grid , Typography } from '@mui/material'
import BButton from '../Components/BButton'
import Dropdown from '../Components/Dropdown'
import CheckBox from '../Components/CheckBox'
import { sendData } from '../config/firebaseMethods'
import { getDatabase, ref, onValue} from "firebase/database";

export default function AdminCourses() {
  const db = getDatabase()
  let[obj , setObj] = useState({});
  let[duration , setDuration] = useState(["8 months","10 months","12 months" , "14 months " , "16 months"])
  let[quiz , setQuiz] = useState([6 , 8 , 10 ,12 , 14 , 16])
  let[show , setShow] = useState(false)
  let[data , setData] = useState([])


  let fillObject = (key , val)=>{
obj[key] = val;
setObj({...obj})
  }
  let add=()=>{
    sendData(obj , "courses")
    .then((success)=>{
      console.log(success)
    })
    .catch((error)=>{
      console.log(error)
    }) 
  }
  let showBox=()=>{
    setShow(true)
  } 
  let getData = ()=>{
    const starCountRef = ref(db, "courses/" );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
     setData(Object.values(data))
    })
  }
  useEffect(()=>{
    getData()
  },[])
  
  return (
    <div>
       <Container maxWidth="sm" sx={{ textAlign: "center"}}>
                <Grid container spacing={3} >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography m={3} variant="h4">Courses Detail</Typography>
                {data && data.length > 0 ? data.map((obj)=>{
                 return<div> <Grid sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }}  item xs={12} md={12} sm={12} lg={12} ><Typography component="div"  variant="h6">Course Name : {obj.courseName}</Typography>
                 <Typography component="div" variant="p">Course Duration : {obj.courseDuration}</Typography>
                 <Typography component="div" variant="p">No Of Quizes : {obj.noOfQuiz}</Typography>
                 <Typography component="div" variant="p">Course Fee : {obj.courseFee}</Typography> <Typography component="div" variant="p">Lead Trainer Id : {obj.trainerId}</Typography>
                </Grid></div>
                }):""}
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12} >
                  <BButton onClick={showBox} label="Add New Course"/>
                  </Grid>
               
         </Grid>
      </Container>
      {show? <Container maxWidth="sm" sx={{ textAlign: "center"}}>
                <Grid container spacing={3} sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography m={3} variant="h4">Add New Course</Typography>
                  <  Input required="required" type="text" value={obj.courseName} onChange={(e)=>fillObject( "courseName" , e.target.value)} label="Course Name"/>
                  <  Dropdown value={obj.courseDuration} dataSource={duration} onChange={(e)=>fillObject( "courseDuration" , e.target.value)}  label="Course Duration"/>
                  <  Dropdown value={obj.noOfQuiz} dataSource={quiz} onChange={(e)=>fillObject( "noOfQuiz" , e.target.value)}  label="No of Quiz"/>
                  < Input value={obj.courseFee} onChange={(e)=>fillObject( "courseFee" , e.target.value)}  label="Fee"/>
                  <  Input value={obj.trainerId} onChange={(e)=>fillObject( "trainerId" , e.target.value)}  label="Lead Trainer Id"/>
                  <Input type="text" label="Assisstant Trainer"/>
                  <CheckBox required="required"  value={obj.isFormOpen} onChange={(e)=>fillObject( "isFormOpen" , e.target.value)} checked="true"  label="Is Form Open"/>
                  </Grid>
                 
                  <Grid item xs={12} md={12} sm={12} lg={12} >
                  <BButton onClick={add} label="Add"/>
                  </Grid>
               
         </Grid>
      </Container> : ""
      }
     
    </div>
  )
}
