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
import DisplayProduct from "./displayallproduct";



export default function Product(props){
    const navigate=useNavigate()

    const handleDisplayProduct=()=>{
        props.setViewContainer(<DisplayProduct/>)
    }

    const[icon,setIcon]=useState({filename:'/assets/blogo2.png',byte:''})
    const[status,setStatus]=useState('')
    const[rating,setRating]=useState('')
    const[productName,setProductName]=useState('')
    const[description,setDescription]=useState('')
    const [price,setPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const[offerType,setOfferType]=useState('')
    const [stock,setStock]=useState('')
    const[SaleStatus,setSaleStatus]=useState('')



    const[categoryList,setCategoryList]=useState([])
    const[categoryId,setCategoryId]=useState('')
    const [subcategoryList,setSubcategoryList]=useState([])
    const [subcategoryId,setSubCategoryId]=useState('')
    const[BrandId,setBrandId]=useState('')
    const[brandList,setBrandList]=useState([])



    const handlePicture=(event)=>{
        setIcon({filename:URL.createObjectURL(event.target.files[0]), byte:event.target.files[0]})
      }



      const handleSubmit=async()=>{
        var formdata=new FormData()
        formdata.append('cid',categoryId)
        formdata.append('sid',subcategoryId)
        formdata.append('bid',BrandId)
        formdata.append('productname',productName)
        formdata.append('description',description)
        formdata.append('price',price)
        formdata.append('offerprice',offerPrice)
        formdata.append('offertype',offerType)
        formdata.append('stock',stock)
        formdata.append('status',status)
        formdata.append('salestatus',SaleStatus)
        formdata.append('ratings',rating)
        formdata.append('pic',icon.byte)
     
        var response= await postData('product/submitproduct',formdata)
     
        if(response.status)
        {
         Swal.fire({
           icon: 'success',
           title: 'Done',
           text: 'products Submitted Successfully'
           
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
        setBrandId(null)
        setStatus(null)
        setCategoryId('')
        setSubCategoryId('')
        setProductName(null)
        setDescription(null)
        setPrice(null)
        setOfferPrice(null)
        setOfferType(null)
        setStock(null)
        setRating('')
       
        setIcon({filename:'/assets/pic2.jpg',byte:''})
       }



    const fetchAllSubcategory=async(id)=>{
        var body={"cid":id}
    var response=await postData('product/fetchsubcategory',body)
    setSubcategoryList(response.data)
    
    }

    const fetchAllBrand=async(id)=>{
        var body={"sid":id}
       var response=await postData('product/fetchbrand',body)
    setBrandList(response.data)

    }

    const fillBrandDropdownBySubcategory=()=>{
        return(
            brandList.map((item)=>{
            //  alert(item.categoriesname)
           return(<MenuItem value={item.brandid}>{item.brandname}</MenuItem>) 
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
    
    const handleSubCategoryChange=(event)=>{
        setSubCategoryId(event.target.value)
        fetchAllBrand(event.target.value)
       
       }

       const handleBrandChange=(event)=>{
        setBrandId(event.target.value)
       }
    
   
    const fetchAllCategory=async()=>{
        var result=await getData('product/fetchallcategory')
        var response=result.data
        setCategoryList(response)

    }

    const fillCategoryDropDown=()=>{
       return (categoryList.map((item)=>{
           return <MenuItem value={item.categoriesid}>{item.categoriesname}</MenuItem>
        }))
    }

    const handleChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubcategory(event.target.value)
    }
    useEffect(function(){
        fetchAllCategory()
    },[])



   
    return(
    <div style={{alignItem:'center',justifyContent:'center',display:'flex',marginTop:50}}>
        <div style={{width:640,height:620,background:'#f6e58d',padding:10,borderRadius:10}}>
            <div>
                <text style={{color:'black',fontSize:24}}>PRODUCT INTERFACE</text>
                <span><List onClick={()=>navigate('/displayproduct')}/><button onClick={handleDisplayProduct}>list</button></span>
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


<Grid item xs={6}>

<FormControl fullWidth>
<InputLabel >Select-Brand</InputLabel>
<Select
value={BrandId}
 label="Select-Brand"
 onChange={handleBrandChange}
>
{fillBrandDropdownBySubcategory()}

          </Select>
           </FormControl>



</Grid>
<Grid xs={6} item>
    <TextField label="productName" fullWidth onChange={(e)=>setProductName(e.target.value)}></TextField>
</Grid>

<Grid xs={4} item>
    <TextField label="Description" onChange={(e)=>setDescription(e.target.value)} fullWidth></TextField>
</Grid>

<Grid xs={4} item>
    <TextField label="Price" onChange={(e)=>setPrice(e.target.value)} fullWidth></TextField>
</Grid>
<Grid xs={4} item>
    <TextField label="OfferPrice" onChange={(e)=>setOfferPrice(e.target.value)} fullWidth></TextField>
</Grid>

<Grid xs={4} item>
    <TextField label="OfferType"onChange={(e)=>setOfferType(e.target.value)} fullWidth></TextField>
</Grid>
<Grid xs={4} item>
    <TextField label="stock" onChange={(e)=>setStock(e.target.value)} fullWidth></TextField>
</Grid>


<Grid xs={4} item>
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

<Grid xs={4} item>
    <TextField label="SaleStatus" onChange={(e)=>setSaleStatus(e.target.value)} fullWidth></TextField>
</Grid>
<Grid xs={4} item>

<FormControl fullWidth>
<InputLabel >Ratings</InputLabel>
<Select 
value={rating}
label="Ratings"
onChange={(event)=>setRating(event.target.value)}
>
<MenuItem value="1 star">1</MenuItem>
<MenuItem value="2 star">2</MenuItem>
<MenuItem value="3 star">3</MenuItem>

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
               
                sx={{ width:300, height:100 }}
               />
                </Grid>

                <Grid item xs={6}>
        <Button  onClick={handleSubmit} variant="contained" fullWidth>
            Submit
         </Button>   
        
        
        </Grid>

            <Grid item xs={6}>
              
                <Button  onClick={clearValues} variant="contained" fullWidth>
                    Reset
                </Button>    

              
            </Grid>
                


            </Grid>
           
           </div>
        </div>

    </div>)
}