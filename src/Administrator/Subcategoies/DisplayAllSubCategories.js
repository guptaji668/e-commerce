
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




export default function DisplayAllSubCategories(props){
    const navigate=useNavigate()

    const[subCategoryList,setSubCategoryList]=useState([])

    const[categoryList,setCategoryList]=useState([])
    const [open, setOpen] = useState(false);
    const[icon,setIcon]=useState({filename:'/assets/pic2.jpg',byte:''})
    var  [subcategoryName,setSubCategoryName]=useState('')
    var [subcategoryID,setSubCategoryID]=useState('')
    var [categoryId, setCategoryId] = useState("");

    var [oldIcon,setOldIcon]=useState('')
    var [buttonStatus,setButtonStatus]=useState({upload:true})
    var [prevIcon,setPrevIcon]=useState('')

    const fetchAllSubCategory=async()=>{
        var response=await getData('subcategory/displayallsubcategory')
        setSubCategoryList(response.data)
    
         
        }

        const fetchAllCategory=async()=>{
            var response=await getData('category/displayallcategory')
            setCategoryList(response.data)
        
             
            }


        useEffect(function(){
            fetchAllSubCategory()
           fetchAllCategory()
           
        },[])


/**88888888888888888888888888dialigggggggggggggggggggggggg */

const handleDeleteData=async()=>{


    var body={cid:subcategoryID,oldicon:oldIcon}
     var response=await postData('subcategory/deletedata',body)
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
   fetchAllCategory()
   // dubara refresh ho jaye table
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

 const handleOpen=(rowData) =>{

    setSubCategoryName(rowData.subcategoryname)
    setSubCategoryID(rowData.subcategoryid)
    setCategoryId(rowData.categoryid)
    setOldIcon(rowData.icon)
    setIcon({filename:`${ServerURL}/images/${rowData.icon}`,byte:''})
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
    setOpen(true);
 

  };

const handleClose = () => {
    setOpen(false);
  };

  const handleChange=(event)=>{
    setCategoryId(event.target.value)
  
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
    formdata.append('cid',subcategoryID)
    formdata.append('oldicon',oldIcon)
   var response=await postData('subcategory/editpicture',formdata)

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
   
   fetchAllSubCategory()
   }

   const handleSubmit=async()=>{
      var body={'cname':subcategoryName,'cid':subcategoryID}
       var response= await postData('subcategory/editdata',body)
    
       if(response.status)
       {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Category update Successfully'
          
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
    fetchAllSubCategory()
     }




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
        <div style={{width:600,height:320,background:'#f6e58d',padding:10,borderRadius:10}}>
            <div>
                <text style={{color:'black',fontSize:24}}>SUBCATEGORY INTERFACE</text>
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
                    <TextField  fullWidth label="SubCategoryName" value={subcategoryName} onChange={(event)=>setSubCategoryName(event.target.value)} style={{background:'#fff'}}/>
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




/*endddddddddddddddddddddddddddddddddddd*/

        function displaySubCategories(){
      
            return(
                <div style={{display:'flex',justifyContent:'center',margin:20}}>
                    <div style={{width:"70%",height:"20%"}}>
                    <MaterialTable
                    style={{background:'gray',fontSize:25,fontWeight:'bolder'}}
                title="List of SubCategories"
                columns={[
                    {title:'SubCategory Id',field:'subcategoryid'},{title:'Category Id',field:'categoryid'},
               
                {title:'SubCategory Name',field:'subcategoryname'},
                {title:'subCategory Icon',field:'icon', render:(rowdata)=><Avatar src={`${ServerURL}/images/${rowdata.icon}`}style={{ width:100,height:50}}/>},
            ]}
                
                data={subCategoryList}
                actions={[
                    {
                      icon:'edit',
                      tooltip: 'Edit SubCategory',
                      onClick: (event, rowData)=>handleOpen(rowData)
                    },
                    {
                      icon: 'add',
                      tooltip: 'Add SubCategory',
                      isFreeAction: true,
                      onClick: (event) => navigate('/subcategory')//navigate laga dia h
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
 {displaySubCategories()}

                <div>
             {showDialog()}
          
            </div>

        </div>
       
    )
}