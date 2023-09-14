import React from "react";
import { Grid,TextField,Button,Avatar,} from "@mui/material";
import { useState,useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getData,postData,ServerURL } from "../../Services/FetchNodeServices";
import List from '@mui/icons-material/List';
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom'
import DisplayBrand from "./DisplayBrand";



export default function Brand(props){
    const navigate=useNavigate()


    const handleDisplayBrand=()=>
    {
        props.setViewContainer(<DisplayBrand/>)
    }

    const [subcategoryList,setSubcategoryList]=useState([])
    const [subcategoryId,setSubCategoryId]=useState('')
   
    const[categoryList,setCategoryList]=useState([])
    const[icon,setIcon]=useState({filename:'/assets/pic2.jpg',byte:''})
    var [categoryId, setCategoryId] = useState("");

    const[brnadName,setBrandName]=useState('')
    const[status,setStatus]=useState('')


    const handlePicture=(event)=>{
        setIcon({filename:URL.createObjectURL(event.target.files[0]),byte:event.target.files[0]})
      }

const fetchAllCategory=async()=>{
    var response=await getData('category/displayallcategory')
    setCategoryList(response.data)
 
    }


const fetchAllSubcategory=async(id)=>{
    var body={"cid":id}
var response=await postData('brand/fetchsubcategory',body)
setSubcategoryList(response.data)

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



    const fillSubCategoryDropDownByCategoryid=()=>{
        return(
            subcategoryList.map((item)=>{
            //  alert(item.categoriesname)
           return(<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>) 
            //alert(item.categoriesid)
          
            })
        )
    }

    
   
    const handleChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubcategory(event.target.value)
        
       }

       const handleSubCategoryChange=(event)=>{
        setSubCategoryId(event.target.value)
       
       }

       


       const handleSubmit=async()=>{
        var formdata=new FormData()
        formdata.append('cid',categoryId)
        formdata.append('subid',subcategoryId)
        formdata.append('bname',brnadName)
        formdata.append('pic',icon.byte)
        formdata.append('status',status)
        var response= await postData('brand/submitbrand',formdata)
     
        if(response.status)
        {
         Swal.fire({
           icon: 'success',
           title: 'Done',
           text: 'Brand Submitted Successfully'
           
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

    setBrandName(null)
    setStatus(null)
    setCategoryId('')
    setSubCategoryId('')
   
    setIcon({filename:'/assets/pic2.jpg',byte:''})
}


useEffect(function(){
    fetchAllCategory()
   
   
},[])

    return(
    <div style={{alignItem:'center',justifyContent:'center',display:'flex',marginTop:50}}>
        <div style={{width:600,height:400,background:'#f6e58d',padding:10,borderRadius:10}}>
            <div>
                <text style={{color:'black',fontSize:24}}>BRAND INTERFACE</text>
                <span><List onClick={()=>navigate('/displaybrand')}/><button onClick={handleDisplayBrand}>list</button></span>
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

<FormControl fullWidth>
<InputLabel >Select-SubCategory</InputLabel>
<Select
value={subcategoryId}
 label="Select-SubCategory"
 onChange={handleSubCategoryChange}
>
{fillSubCategoryDropDownByCategoryid()}

          </Select>
           </FormControl>



</Grid>
<Grid xs={6} item>

   <TextField fullWidth label="Brand" onChange={(event)=>setBrandName(event.target.value)} />

</Grid>

<Grid xs={6} item>
<FormControl fullWidth>
<InputLabel >Status</InputLabel>
<Select 
value={status}
label="Status"
onChange={(event)=>setStatus(event.target.value)}
>
<MenuItem value="Top Brand">Top Brand</MenuItem>
<MenuItem value="Tranding">Tranding</MenuItem>
<MenuItem value="Popular">Popular</MenuItem>

</Select>

</FormControl>

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