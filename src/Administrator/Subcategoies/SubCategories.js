import React from "react";
import { Grid,TextField,Button,Avatar, responsiveFontSizes } from "@mui/material";
import { useState,useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getData,postData,ServerURL } from "../../Services/FetchNodeServices";
import List from '@mui/icons-material/List';
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom'
import DisplayAllSubCategories from "./DisplayAllSubCategories";
export default function SubCategories(props){
    const navigate=useNavigate()

const handleDisplaySubcategory=()=>{
    props.setViewContainer(<DisplayAllSubCategories/>)
}

    const [categoryName,setCategoryName]=useState('')
    const [subCategoryName,setSubCategoryName]=useState('')
    const[categoryList,setCategoryList]=useState([])
    const[icon,setIcon]=useState({filename:'/assets/pic2.jpg',byte:''})
    var [categoryId, setCategoryId] = useState("");


    const handlePicture=(event)=>{
        setIcon({filename:URL.createObjectURL(event.target.files[0]),byte:event.target.files[0]})
      }

const fetchAllCategory=async()=>{
    var response=await getData('category/displayallcategory')
    setCategoryList(response.data)

     
    }

    const fillCategoryDropDown=()=>{
        return(
            categoryList.map((item)=>{
            //  alert(item.categoriesname)
           return(<MenuItem value={item.categoriesid}>{item.categoriesname}</MenuItem>) 
            //alert(item.categoriesid)
          
            })
        )
    }
   
    const handleChange=(event)=>{
        setCategoryId(event.target.value)
      
       }

       const handleSubmit=async()=>{
        var formdata=new FormData()
        formdata.append('categoryid',categoryId)
        formdata.append('subcategoryname',subCategoryName)
        formdata.append('icon',icon.byte)
        var response= await postData('subcategory/submitsubcategory',formdata)
     
        if(response.status)
        {
         Swal.fire({
           icon: 'success',
           title: 'Done',
           text: 'SubCategory Submitted Successfully'
           
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
   
const clearValues=()=>{
    setSubCategoryName('')
    setIcon({filename:'/assets/pic2.jpg',byte:''})
}


useEffect(function(){
    fetchAllCategory()
   
   
},[])

    return(
    <div style={{alignItem:'center',justifyContent:'center',display:'flex',marginTop:50}}>
        <div style={{width:600,height:320,background:'#f6e58d',padding:10,borderRadius:10}}>
            <div>
                <text style={{color:'black',fontSize:24}}>SUBCATEGORY INTERFACE</text>
                <span><List onClick={()=>navigate('/displayallsubcategory')}/><button onClick={()=>handleDisplaySubcategory()}>list</button></span>
            </div>
            <div style={{marginTop:20,}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>

                <FormControl fullWidth>
            <InputLabel >Select-Category</InputLabel>
              <Select
                value={categoryId}
                 label="Select-Category"
                 onChange={handleChange}
              >
                {fillCategoryDropDown()}
             
                          </Select>
                           </FormControl>
       

              
                </Grid>
                
                <Grid item xs={6}>
                    <TextField  fullWidth label="SubCategoryName" value={subCategoryName} onChange={(event)=>setSubCategoryName(event.target.value)} style={{background:'#fff'}}/>
                </Grid>
                
                <Grid item xs={6} style={{marginTop:20}} >
                <Button fullWidth style={{background:"#f0932b",color:'#fff'}}  component="label" >
                     Upload Image
               
                <input hidden accept="image/*" multiple type="file"  onChange={handlePicture}  />
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
        <Button onClick={handleSubmit} variant="contained" fullWidth>
            Submit
         </Button>   
        
        
        </Grid>

            <Grid item xs={6}>
              
                <Button  variant="contained" fullWidth onClick={clearValues} >
                    Reset
                </Button>    

              
            </Grid>
                


            </Grid>
           
           </div>
        </div>

    </div>)
}