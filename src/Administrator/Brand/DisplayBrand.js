
import react from 'react'
import MaterialTable from "@material-table/core";
import{useState,useEffect,} from "react"
import { ServerURL,getData,postData } from "../../Services/FetchNodeServices";
import { Avatar } from "@mui/material";
import {useNavigate} from'react-router-dom'
import { Grid,TextField,} from "@mui/material";
import React from "react";


import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Swal from "sweetalert2";




export default function DisplayBrand(props){
    const navigate=useNavigate()

    const[subCategoryList,setSubCategoryList]=useState([])

    const[categoryList,setCategoryList]=useState([])

    const[icon,setIcon]=useState({filename:'/assets/pic2.jpg',byte:''})
    var  [subcategoryName,setSubCategoryName]=useState('')
   
    var [categoryId, setCategoryId] = useState("");

    var [oldIcon,setOldIcon]=useState('')
    var [buttonStatus,setButtonStatus]=useState({upload:true})
    var [prevIcon,setPrevIcon]=useState('')
  

    const[brandList,setBrandList]=useState([])
    const[brandId,setBrandId]=useState('')

    const[brandName,setBrandName]=useState('')
    const[status,setStatus]=useState('')
    const [subcategoryId,setSubCategoryId]=useState("")
    const [open, setOpen] = useState(false);
    const[subList,setSubList]=useState([])


    const fetchAllBrands=async()=>{
    var response=await getData('brand/displayallbrands')
    setBrandList(response.data)
    
    }

    const fetchAllSubCategory=async(id)=>{
        var body={"cid":id}
        var response=await postData('brand/fetchsubcategory',body)
        setSubCategoryList(response.data)
    
         
        }



        const fetchAllCategory=async()=>{
            var response=await getData('category/displayallcategory')
            setCategoryList(response.data)
         
        
             
            }


        useEffect(function(){
         
           fetchAllBrands()
           
        },[])


/**88888888888888888888888888dialigggggggggggggggggggggggg */

const handleDeleteData=async()=>{
    var body={bid:brandId,oldicon:oldIcon}
    var response=await postData('brand/deletedata',body)
    if(response.status)
     {
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Delete Successfully'
        
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
  
   setOpen(false)
  fetchAllBrands()

 
   }
   



const handleDiscard=(rowData)=>{
setIcon({filename:prevIcon,bytes:''})
setButtonStatus({upload:true})
}


const showHidePictureButton=()=>{

    return(
      <div>
       {buttonStatus.upload?<>
        <Button fullWidth variant="contained" component="label">
          Upload
           <input  onChange={handlePicture}  hidden accept="image/*" multiple type="file"  />
        </Button></>:<><Button onClick={saveEditPicture}  color="primary">save</Button><Button onClick={handleDiscard} color="secondary">Discard</Button></>}
        </div>
        /* if else conditon ki jagy ternary oepetor upload ki value by defult humne true fi h to uploaad run hoga : (else) me nh jayega */
    )
  
  }





const handlePicture=(event)=>{
    setIcon({filename:URL.createObjectURL(event.target.files[0]),byte:event.target.files[0]})
    setButtonStatus({upload:false})
  }


  const handleChange=(event)=>{
    
    setCategoryId(event.target.value)  
   
    fetchAllSubCategory(event.target.value)
  
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

const saveEditPicture=async()=>{
    var formdata=new FormData()
    formdata.append('pic',icon.byte)
    formdata.append('bid',brandId)
    formdata.append('oldicon',oldIcon)
   var response=await postData('brand/editpicture',formdata)

   if(response.status)
   {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'icon update Successfully'
      
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
   setButtonStatus({upload:true})
   setOpen(false)
   
   fetchAllBrands()
   

   }

   const handleSubmit=async()=>{
    var body={"bid":brandId,"bname":brandName,"status":status}
       var response= await postData('brand/editdata',body)
    
       if(response.status)
       {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Brand update Successfully'
          
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
       setOpen(false)
    fetchAllBrands()
    
  
     }

     const handleSubCategoryChange=(event)=>{
        setSubCategoryId(event.target.value)
       
       }
    
    
    const fillSubCategoryDropDownByCategoryid=()=>{
        return(
            subCategoryList.map((item)=>{
            //  alert(item.categoriesname)
           return(<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>) 
            //alert(item.categoriesid)
          
            })
        )
    }
    


/**gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg */




useEffect(function(){
    fetchAllCategory()
   
    
 },[])

const handleOpen=(rowData) =>{
setCategoryId(rowData.categoryid)
setSubCategoryId(rowData.subcategoryid)

setBrandName(rowData.brandname)
setStatus(rowData.status)
setBrandId(rowData.brandid)
setOldIcon(rowData.icon)
setIcon({filename:`${ServerURL}/images/${rowData.icon}`,byte:''})
setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
   setOpen(true)
  };








const showDialog=()=>{
    return(
  
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>

        <div style={{alignItem:'center',justifyContent:'center',display:'flex',marginTop:50}}>
        <div style={{width:650,height:400,background:'#f6e58d',padding:10,borderRadius:10}}>
            <div>
                <text style={{color:'black',fontSize:24}}>Edit Brands</text>
            </div>
            <div style={{marginTop:20,}}>
            <Grid container spacing={2}>

                <Grid xs={6} item>
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
   <TextField fullWidth label="Brand" value={brandName} onChange={(event)=>setBrandName(event.target.value)} />

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
                
                <Grid xs={6}item>

                {showHidePictureButton()}
                </Grid>
                
             

                <Grid item xs={6}  >
                <Avatar
               alt="SubCategory Icon"
               src={icon.filename}
               variant="rounded"
                sx={{ width:220, height:120 }}
               />
                </Grid>

                <Grid item xs={6}>
        <Button onClick={handleSubmit} variant="contained" fullWidth>
            Edit Data
         </Button>   
        
        
        </Grid>

            <Grid item xs={6}>
              
                <Button  variant="contained" fullWidth onClick={handleDeleteData} >
                Delete Data
                </Button>    

              
            </Grid>
                


            </Grid>
           
           </div>
        </div>

    </div>

      
        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleClose} autoFocus>
          Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
  
  
  }




  const handleClose = () => {
    setOpen(false);
  };






/*endddddddddddddddddddddddddddddddddddd*/

        function displayBrands(){
      
            return(
                <div style={{display:'flex',justifyContent:'center',margin:20}}>
                    <div style={{width:"70%",height:"20%"}}>
                    <MaterialTable
                    style={{background:'gray',fontSize:20,fontWeight:'bolder'}}
                title="List of Brands"
                columns={[
             {title:' Brand Id',field:'brandid'},
               {title:'Category Id',field:'categoryid'},
               {title:'SubcategoryId',field:'subcategoryid'},
                {title:'Brand Name',field:'brandname'},
                {title:'brand Icon',field:'icon', render:(rowdata)=><Avatar src={`${ServerURL}/images/${rowdata.icon}`}style={{ width:100,height:50}}/>},
                {title:'Brand Status',field:'status'},
            ]}
                
                data={brandList}
                actions={[
                    {
                      icon:'edit',
                      tooltip: 'Edit Brand',
                      onClick: (event, rowData)=>handleOpen(rowData)
                    },
                    {
                      icon: 'add',
                      tooltip: 'Add brand',
                      isFreeAction: true,
                      onClick: (event) => navigate('/brand')//navigate laga dia h
                    }
                  ]}
                
                
                >
        
                </MaterialTable>

                    </div>
                 
                </div>
               
            )
        }







    return(
        <div>
         {displayBrands()}

                <div>
             {showDialog()}
          
            </div>

        </div>
       
    )
}