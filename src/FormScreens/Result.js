import { Box, Button, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import { useEffect } from 'react'
import SSelect from '../Components/FormComponents/SSelect'
import STextField from '../Components/FormComponents/STextField'
import Navbar from '../Components/Navbar/Navbar'
import STable from '../Components/STable'
import { getData } from '../config/firebaseMethods'

export default function Result() {

    const [rawResult,setRawResult] = useState([]);
    const [resultToShow, setResultToShow] = useState([]);
    const [courseNames, setCourseNames] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedCourseResults, setSelectectedCourseResults] = useState([]);
    const [result,setResult] = useState({});

    const [name,setName] = useState('');
    const [noData, setNoData] = useState(false);
    const [searchedResult, setSearchedResult] = useState([]);

    const searchResult = () =>{

      const data =  result.result.filter((e,i)=> e.studentName.toLowerCase().includes(name.toLowerCase()))
      setSearchedResult([...data]);

      data.length == 0 ? setNoData(true) : setNoData(false)
    }

    const selectCourse = (key,value) => {
      key = value;
      setSelectedCourse(key);
    }

    const getResult = () => {
        getData('results')
        .then((data)=>{
            setRawResult([...data])
        })
      
    }
    
    useEffect(()=>{
        getResult();
    },[])
    
    useEffect(()=>{
        let arr = rawResult.filter((e,i) => e.showResult == true)
        setResultToShow([...arr]);
        
        let courses = new Set(arr.map((e,i)=>e.course))
        setCourseNames([...courses])
    },[rawResult])

    useEffect(()=>{
      const res = resultToShow.find((e,i)=>e.course == selectedCourse)
      setResult(res)
    },[selectedCourse])


  return (
    <>
    <Navbar links={[
          {
            to: 'studentRegistration',
            label: 'Student Registration'
          },
          {
            to: 'result',
            label: 'Result'
          },
          {
            to: 'login',
            label: 'Login'
          },
        ]} />

        <Container maxWidth='lg' sx={{margin:"40px auto"}}>
            <Grid container spacing={5}>
                
                <Grid item lg={12} md={12} sm={12}  xs={12}>
                    <Typography variant='h4' sx={{background:'cornflowerblue', padding:'10px', color:'white', textAlign:'center'}}>
                        Result
                    </Typography>
                </Grid>

          

                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <SSelect label='Course Name' sourceArr={courseNames} selectKey={selectedCourse} func={selectCourse}></SSelect>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                   {
                    result && result.course && <Box sx={{display:"flex"}}>
                      <STextField onChange={(e)=>setName(e.target.value)} label='Search by Name' ></STextField>
                      <Button variant='contained' onClick={searchResult} sx={{marginLeft:'5px'}} >Search</Button>
                    </Box>
                   }
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                   {
                    noData && <Typography variant='h4' sx={{background:'cornflowerblue', color:'white', textAlign:'center', padding:'10px'}}>
                      No Result Found
                    </Typography>
                   }
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                   {
                    searchedResult && searchedResult.length > 0 && <Typography variant='h4' sx={{background:'cornflowerblue', color:'white', textAlign:'center', padding:'10px'}}>
                      Searched Result
                    </Typography>
                   }
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                   {
                    searchedResult && searchedResult.length > 0 && <STable rowsData={searchedResult} tableHeadings={result.tableHeadings}></STable>
                   }
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                   {
                    result && result.course && <Typography variant='h4' sx={{background:'cornflowerblue', color:'white', textAlign:'center', padding:'10px'}}>
                      {result.course}
                    </Typography>
                   }
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                   {
                    result && result.course && <STable rowsData={result.result} tableHeadings={result.tableHeadings} ></STable>
                   }
                </Grid>

            </Grid>
        </Container>
    </>
  )
}
 