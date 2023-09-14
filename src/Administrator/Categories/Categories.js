import React from "react";
import { useState } from "react";
import { Grid,TextField,Button,Avatar } from "@mui/material";
import { getData,postData,ServerURL } from "../../Services/FetchNodeServices";
import Swal from "sweetalert2";
import List from '@mui/icons-material/List';
import {useNavigate} from 'react-router-dom'
import DisplayAllCategories from "./DisplayAllCategories";

export default function Categories(props){
const navigate=useNavigate()


const handleDisplayAllCategory=()=>{
    props.setViewContainer(<DisplayAllCategories/>)
}

    const [categoryName,setCategoryName]=useState('')
    const[icon,setIcon]=useState({filename:'/assets/pic2.jpg',byte:''})

    const handlePicture=(event)=>{
      setIcon({filename:URL.createObjectURL(event.target.files[0]),byte:event.target.files[0]})
    }

   
    const handleSubmit=async()=>{
        var formData=new FormData()
        
        formData.append('categoryname',categoryName)
       
        formData.append('icon',icon.byte)
        var response= await postData('category/submitcategory',formData)
     
        if(response.status)
        {
         Swal.fire({
           icon: 'success',
           title: 'Done',
           text: 'Category Submitted Successfully'
           
         })
     
        }
        else
        {
         Swal.fire({
           icon: 'error',
           title: 'Oops...',
           text: 'Something went wrong!',
         
         })
     
        }
     
      }





    const handleReset=()=>{
        setCategoryName('')
        setIcon({filename:'/assets/pic2.jpg',byte:''})
    }

  


    return(
    <div style={{alignItem:'center',justifyContent:'center',display:'flex',marginTop:70}}>
        <div style={{width:600,height:320,background:'#f6e58d',padding:10,borderRadius:10}}>
            <div>
                <text style={{color:'black',fontSize:24}}>CATEGORY INTERFACE</text><span style={{fontSize:24,margin:10}}><List onClick={()=>handleDisplayAllCategory()} /><List onClick={()=>navigate("/displayallcategory")} /></span>
            </div>
            <div style={{marginTop:20,}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField  fullWidth label="CategoryName" value={categoryName} onChange={(event)=>setCategoryName(event.target.value)} style={{background:'#fff'}}/>
                </Grid>
                
                <Grid item xs={6} style={{marginTop:20}} >
                <Button  fullWidth style={{background:"#f0932b",color:'#fff'}}  component="label" >
                     Upload Image
                <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
               </Button>
                </Grid>

                <Grid item xs={6}  >
                <Avatar
               alt="Category Icon"
               src={icon.filename}
               variant="rounded"
                sx={{ width:220, height:120 }}
                 />
                </Grid>

                <Grid item xs={6}>
        <Button onClick={handleSubmit}  variant="contained" fullWidth>
            Submit
         </Button>   
        
        
        </Grid>

            <Grid item xs={6}>
              
                <Button onClick={handleReset}  variant="contained" fullWidth >
                    Reset
                </Button>    

              
            </Grid>
                


            </Grid>
           
           </div>
        </div>

    </div>)
}