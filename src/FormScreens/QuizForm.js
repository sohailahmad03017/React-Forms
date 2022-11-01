import React, { useEffect , useState} from 'react'
import Input from '../Components/Input'
import { Container,Grid , Typography } from '@mui/material'
import BButton from '../Components/BButton'
import { sendData } from '../config/firebaseMethods'
import { getDatabase, ref, onValue} from "firebase/database";

export default function AdminQuiz() {
  const db = getDatabase()
  let[options , setOptions] = useState([])
  let[question , setQuestion] = useState("")
   let [correctOption , setCorrectOption] = useState("")
   let [greenSignal , setGreenSignal] = useState(false)
   let [redSignal , setRedSignal] = useState(false)
  let[data , setData] = useState([])
let fillOptionsArray =(i , val)=>{
options[i] = val;
setOptions([...options])
}
    let sendQuestions = ()=>{
      if(question!="" &&  options!="" && correctOption!="" && options.map((e)=>{
       return e==correctOption
      })){
        sendData({question , options , correctOption} , "questions")
        
        .then((success)=>{
       setGreenSignal(true)
       setRedSignal(false)
       setQuestion("")
       options[0] = ""
       options[1] = ""
       options[2] = ""
       options[3] = ""
       setCorrectOption("")
        })
        .catch((error)=>{
          setRedSignal(true)
          setGreenSignal(false)
        })
      }else{
        setRedSignal(true)
        setGreenSignal(false)
      }
  
    }
    let getData = ()=>{
      const starCountRef = ref(db, "questions/" );
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
      <Container maxWidth="md" sx={{ textAlign: "center"}}>
                <Grid container spacing={3} sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography m={3} variant="h4">Add New Question</Typography>
                <Input required="required" value={question} onChange={(e)=>setQuestion(e.target.value)} label="Question"/>
                  </Grid>
                  <Grid item xs={12} md={6} sm={12} lg={6} >
                  <  Input required="required" value={options[0]} onChange={(e)=>fillOptionsArray( 0 , e.target.value)} label="Option 1"/>
                  <  Input required="required" value={options[1]} onChange={(e)=>fillOptionsArray( 1 , e.target.value)}  label="Option 2"/>
                 
                  </Grid>
                  <Grid item xs={6} md={6} sm={12} lg={6} >
                  <  Input required="required" value={options[2]} onChange={(e)=>fillOptionsArray( 2 , e.target.value)}  label="Option 3"/>
                  <  Input required="required" value={options[3]} onChange={(e)=>fillOptionsArray( 3 , e.target.value)}  label="Option 4"/>
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} lg={3} ></Grid>
                  <Grid item xs={12} md={6} sm={12} lg={6} >
                  <  Input required="required" value={correctOption} onChange={(e)=>setCorrectOption(e.target.value)}  label="Correct Option"/>
                  {greenSignal? <p style={{color :"green"  , margin :"10px"}}>Question submitted Successfully</p> : null} 
                  {redSignal? <p style={{color :"red" , margin :"10px"}}>Question Not Submitted</p> : null} 
                  <BButton onClick={sendQuestions} label="Add"/>
                 
                  </Grid>
               
         </Grid>
            </Container> 
            <Container maxWidth="md" sx={{ textAlign: "center"}}>
                <Grid container spacing={3} sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography variant="h5">Previous Questions</Typography>
                 
                  </Grid>
               
         </Grid>
            </Container> 
    </div>
  )
}