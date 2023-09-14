

import {DropzoneArea} from 'material-ui-dropzone'



import React from "react";
import { Grid,TextField,Button,Avatar,} from "@mui/material";
import { useState,useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getData,postData,ServerURL,postDataImage } from "../../Services/FetchNodeServices";

import Swal from "sweetalert2";



export default function ProductImage(props){


    const[uploadFiles,setUploadFile]=useState([])

 
   
    const handleImage=(files)=>{
    setUploadFile(files)
    }

   
    
    



    const[categoryList,setCategoryList]=useState([])
    const[categoryId,setCategoryId]=useState('')
    const [subcategoryList,setSubcategoryList]=useState([])
    const [subcategoryId,setSubCategoryId]=useState('')
    const[BrandId,setBrandId]=useState('')
    const[ProductId,setProductId]=useState('')
    const[brandList,setBrandList]=useState([])
    const[productList,setProductList]=useState([])



   

      
       const clearValues=()=>{
        setBrandId(null)

        setCategoryId('')
        setSubCategoryId('')
        setProductId(null)
       
       
  
       }


       const handleSubmit=async()=>{
        var formdata=new FormData()
        formdata.append('cid',categoryId)
        formdata.append('sid',subcategoryId)
        formdata.append('bid',BrandId)
        formdata.append('pid',ProductId)
        uploadFiles.map((file,index)=>{
            formdata.append("image"+index,file)//yha image var nam h kuch bi le skte h 

        })
     
        var response= await postDataImage('saveimage/submitproductimage',formdata)
     console.log("xxxxxxxx",response)
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

    const fetchAllProduct=async(id)=>{
        var body={"bid":id}
       var response=await postData('product/displayallproductbybrandid',body)
    setProductList(response.data)

    }

    const fillProductByBrand=()=>{
        return(
        productList.map((item)=>{
            //  alert(item.categoriesname)
           return(<MenuItem value={item.productid}>{item.productname}</MenuItem>) 
            //alert(item.categoriesid)
          
            })
        )
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
        fetchAllProduct(event.target.value)
       
       
       }

       const handleProductChange=(event)=>{
        setProductId(event.target.value)
        
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







        // return (
        //     <div>
        //         <Button onClick={handleOpen}>
        //           Add Image
        //         </Button>
        //         <DropzoneDialog
        //             open={open}
        //             onSave={handleSave}
        //             acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        //             showPreviews={true}
        //             maxFileSize={5000000}
        //             filesLimit={6}
        //             onClose={handleClose}
        //         />
        //     </div>
        // );


        return(
            <div style={{alignItem:'center',justifyContent:'center',display:'flex',marginTop:50}}>
                <div style={{width:640,height:620,background:'#f6e58d',padding:10,borderRadius:10}}>
                    <div>
                        <text style={{color:'black',fontSize:24}}>PRODUCT INTERFACE</text>
                        <span></span>
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
        <FormControl fullWidth>
        <InputLabel >Select-Product</InputLabel>
        <Select
        value={ProductId}
         label="Select-Product"
         onChange={handleProductChange}
        >
        {fillProductByBrand()}
        
                  </Select>
                   </FormControl>


      </Grid>

        <Grid item xs={12}>
           
        <DropzoneArea
                //   open={open}
            onChange={handleImage}
               acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            //    showPreviews={true}
               maxFileSize={5000000}
               filesLimit={6}
            // onClose={handleClose}
              />



        </Grid>
                        
        
                        <Grid item xs={6}>
                <Button onClick={handleSubmit} variant="contained" fullWidth>
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