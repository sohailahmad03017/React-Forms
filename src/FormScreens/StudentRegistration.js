import React, { useEffect, useState } from 'react'
import { Container , Grid , Typography } from '@mui/material'
import Input from '../Components/Input'
import Dropdown from '../Components/Dropdown'
import BButton from '../Components/BButton'
import { sendDataWithId } from '../config/firebaseMethods'

export default function RegistrationForm() {
let[obj,setObj] = useState({})
let sec =  ["A", "B"];
let course = ["Graphic Designing" , "Web Development"]
let fillObject=(key,val)=>{
obj[key] = val;
setObj({...obj})
console.log(obj)

}
let submit = ()=>{
    sendDataWithId(obj, "students")
    .then((success)=>{
      console.log(success)
   })
   .catch((error)=>{
       console.log(error)
   })
}
  return (
    <div>
            <Container  maxWidth="md" sx={{ textAlign: "center" , marginY:"20px"}}>
                <Grid container spacing={3} sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography m={3} variant="h4">Registration Form</Typography>
                  </Grid>
                    <Grid item md={6} lg={6} sm={12} xs={12}>
                    <div style={{ textAlign: "center" }}>
                    <Input value={obj.firstName} onChange={(e)=>fillObject( "firstName" , e.target.value)} required="required" label="First Name" type="text"/>
                    <Input value={obj.lastName} onChange={(e)=>fillObject( "lastName" , e.target.value)}   label="Last Name" type="text"/> 
                    <Dropdown required="required" value={obj.courseName} label="Course Name" onChange={(e)=>fillObject( "courseName" , e.target.value)} dataSource = {course} /> 
                    <Dropdown required="required" value={obj.section} label="Section" onChange={(e)=>fillObject( "section" , e.target.value)} dataSource={sec}  />
                    <Input required="required" value={obj.contactNumber} onChange={(e)=>fillObject( "contactNumber" , e.target.value)} label="Contact Number" type="number"/>
                        <Input required="required"  value={obj.CNIC} onChange={(e)=>fillObject( "CNIC" , e.target.value)} label="CNIC" type="number"/>
                        </div>
                    </Grid>
                   
                    <Grid item md={6} lg={6} sm={12} xs={12}  >
                        <div style={{ textAlign: "center" }}> 
                        <Input  value={obj.age} onChange={(e)=>fillObject( "age" , e.target.value)} label="Age" type="number"/>
                        <Input  value={obj.dateOfBirth} onChange={(e)=>fillObject( "dateOfBirth" , e.target.value)}  type="date"/>
                        <Input required="required" value={obj.emergencyContact} onChange={(e)=>fillObject( "emergencyContact" , e.target.value)}  label="Emergency Contact" type="number"/>
                        <Input required="required" value={obj.fatherName} onChange={(e)=>fillObject( "fatherName" , e.target.value)}  label="Father Name" type="text"/>
                        <Input value={obj.fatherCNIC} onChange={(e)=>fillObject( "fatherCNIC" , e.target.value)}  label="Father CNIC" type="number"/> 

                        <Input required="required" value={obj.fatherContact} onChange={(e)=>fillObject( "fatherContact" , e.target.value)}  label="Father Contact" type="number"/>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12} >
                <BButton onClick={submit}  label= "Submit"/>
                  </Grid>
                </Grid>
               
              
            </Container> 
    </div>
  )
}
