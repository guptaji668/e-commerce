import MaterialTable from "@material-table/core";
import{useState,useEffect,} from "react"
import { ServerURL,getData,postData } from "../../Services/FetchNodeServices";
import { Avatar } from "@mui/material";
import {useNavigate} from'react-router-dom'
import { Grid,TextField,} from "@mui/material";
import React from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Swal from "sweetalert2";


export default function DisplayAllCategories(props){

const navigate=useNavigate()

    const[categoryList,setCategoryList]=useState([])
    const [open, setOpen] = useState(false);
    const[icon,setIcon]=useState({filename:'/assets/pic2.jpg',byte:''})
    var  [categoryName,setCategoryName]=useState('')
    var [categoryID,setCategoryID]=useState('')
    var [oldIcon,setOldIcon]=useState('')
    var [buttonStatus,setButtonStatus]=useState({upload:true})
    var [prevIcon,setPrevIcon]=useState('')

    /***************dialog************** */ 

    const handleDeleteData=async()=>{


        var body={cid:categoryID,oldicon:oldIcon}
         var response=await postData('category/deletedata',body)
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


    const saveEditPicture=async()=>{
     var formdata=new FormData()
     formdata.append('pic',icon.byte)
     formdata.append('cid',categoryID)
     formdata.append('oldicon',oldIcon)
    var response=await postData('category/editpicture',formdata)

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
    
    fetchAllCategory()
    }

    const handleSubmit=async()=>{
       var body={'cname':categoryName,'cid':categoryID}
        var response= await postData('category/editdata',body)
     
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
     fetchAllCategory()
      }







    const handlePicture=(event)=>{
        setIcon({filename:URL.createObjectURL(event.target.files[0]),byte:event.target.files[0]})
        setButtonStatus({upload:false})
      }
  
     const handleOpen=(rowData) =>{

        setCategoryName(rowData.categoriesname)
        setCategoryID(rowData.categoriesid)
        setOldIcon(rowData.icon)
        setIcon({filename:`${ServerURL}/images/${rowData.icon}`,byte:''})
        setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
        setOpen(true);
     

      };
    
    const handleClose = () => {
        setOpen(false);
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

            <div style={{alignItem:'center',justifyContent:'center',display:'flex',marginTop:70}}>
        <div style={{width:600,height:320,background:'#f6e58d',padding:10,borderRadius:10}}>
            <div>
                <text style={{color:'black',fontSize:24}}>EDIT CATEGORY </text>
            </div>
            <div style={{marginTop:20,}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField  fullWidth label="CategoryName" value={categoryName} onChange={(event)=>setCategoryName(event.target.value)} style={{background:'#fff'}}/>
                </Grid>
                
                <Grid item xs={6} style={{marginTop:20}} >
               
                    {showHidePictureButton()}


                </Grid>



                <Grid item xs={6}  >
                <Avatar
               alt="Category Icon"
               src={icon.filename}
               variant="rounded"
                sx={{ width:220, height:120 }}
                 />
                </Grid>

                <Grid xs={6} item>
                <Button onClick={handleSubmit} variant="contained" fullWidth>
                  Submit
                </Button> 

                </Grid>

                
            <Grid item xs={6}>
              
              <Button onClick={handleDeleteData}  variant="contained" fullWidth  >
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
          
   
// /-------------------------------------------------



    const fetchAllCategory=async()=>{
        var response=await getData('category/displayallcategory')
        setCategoryList(response.data)
    
         
        }
        useEffect(function(){
            fetchAllCategory() 
        },[])

       

        function displayCategories(){
      
            return(
                <div style={{display:'flex',justifyContent:'center',margin:20}}>
                    <div style={{width:"70%",height:"20%"}}>
                    <MaterialTable
                    style={{background:'gray',fontSize:25,fontWeight:'bolder'}}
                title="List of Categories"
                columns={[{title:'Category Id',field:'categoriesid'},
                {title:'Category Name',field:'categoriesname'},
                {title:'Category Icon',field:'icon', render:(rowdata)=><Avatar src={`${ServerURL}/images/${rowdata.icon}`}style={{ width:100,height:50}}/>},
            ]}
                
                data={categoryList}
                
                actions={[
                    {
                      icon:'edit',
                      tooltip: 'Edit Category',
                      onClick: (event, rowData)=>handleOpen(rowData)
                    },
                    {
                      icon: 'add',
                      tooltip: 'Add Category',
                      isFreeAction: true,
                      onClick: (event) => navigate('/category')//navigate laga dia h
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
           {displayCategories()}
            
             <div>
             {showDialog()}
          
            </div>

        </div>
       
    )
}