import React from 'react'
import { Grid,TextField ,Button} from '@mui/material'
import RootReducer from './RootReducer'
import {useDispatch} from 'react-redux'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function Reduxpractice(){
    var navigate=useNavigate()
    const dispatch=useDispatch()
    const[name,setName]=useState('')
    const[classss, setClasss]=useState('')
    const[addres,setAddres]=useState('')
    const[prize,setPrize]=useState('')

const handleSubmit=()=>{
 dispatch({'type':'ADD_PRODUCT','payload':[name,{name:name,address:addres,class:classss,prize:prize}]})
 navigate('/storereduxdata')
}

    return(
        <div>
            <Grid container spacing={2}>
                <Grid xs={6} item>
                    <TextField onChange={(e)=>setName(e.target.value)} placeholder='name'/>
                </Grid>
                <Grid xs={6} item>
                    <TextField onChange={(e)=>setClasss(e.target.value)}  placeholder='class'/>
                </Grid>
                <Grid xs={6} item>
                    <TextField onChange={(e)=>setAddres(e.target.value)}  placeholder='addres'/>
                </Grid>
                <Grid xs={6} item>
                    <TextField onChange={(e)=>setPrize(e.target.value)}  placeholder='prize'/>
                </Grid>
                <Grid xs={12} item>
                   <Button onClick={handleSubmit}>ADD Product</Button>
                </Grid>
                

            </Grid>
        </div>
    )
}