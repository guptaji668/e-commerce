import React from "react";
import MaterialTable from "@material-table/core";
import{useState,useEffect,} from "react"
import { ServerURL,getData,postData } from "../../Services/FetchNodeServices";
import { Avatar } from "@mui/material";
import {useNavigate} from'react-router-dom'
import { Grid,TextField,} from "@mui/material";

import List from '@mui/icons-material/List';

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Swal from "sweetalert2";


export default function DisplayProduct(props){


    const navigate=useNavigate()

    const[productList,setProductList]=useState([])


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

    const [open, setOpen] = useState(false);
    var [oldIcon,setOldIcon]=useState('')
    var [buttonStatus,setButtonStatus]=useState({upload:true})
    var [prevIcon,setPrevIcon]=useState('')

    const[productId,setProductId]=useState('')
  


    const fetchAllProducts=async()=>{
        var response=await getData('product/fetchproducts')
        setProductList(response.data)

        }


useEffect(function(){
    fetchAllProducts()
},[])


///////////show products///////////

function displayProducts(){
      
    return(
        <div style={{display:'flex',justifyContent:'center',margin:20}}>
            <div style={{width:"98%",height:"30%"}}>
            <MaterialTable
            style={{background:'gray',fontSize:16,fontWeight:'bolder'}}
        title="List of product"
        columns={[
            {title:' Product Id',field:'productid'},
       {title:'Category Id',field:'categoryid'},
       {title:'SubcategoryId',field:'subcategoryid'},
       {title:' Brand Id',field:'brandid'},
        {title:'Product Name',field:'productname'},
        {title:'Description',field:'description'},
        {title:'price',field:'price'},
        {title:'offerprice',field:'offerprice'},
        {title:' offer Type',field:'offertype'},
        {title:' Stock',field:'stock'},
        {title:' status',field:'status'},
        {title:'saleStatus',field:'salestatus'},
        {title:'ratings',field:'ratings'},
        {title:'brand Icon',field:'picture', render:(rowdata)=><Avatar src={`${ServerURL}/images/${rowdata.picture}`}style={{ width:50,height:50}}/>},
        {title:'Brand Status',field:'status'},
    ]}
        
        data={productList}
        actions={[
            {
              icon:'edit',
              tooltip: 'Edit product',
              onClick: (event, rowData)=>handleOpen(rowData)
            },
            {
              icon: 'add',
              tooltip: 'Add product',
              isFreeAction: true,
              onClick: (event) => navigate('/product')//navigate laga dia h
            }
          ]}
        
        
        >

        </MaterialTable>

            </div>
         
        </div>
       
    )
}






// ////////////////End Products///////////////////////////////


// /////////////Edit Box//////////////////////

const handlePicture=(event)=>{
    setIcon({filename:URL.createObjectURL(event.target.files[0]),byte:event.target.files[0]})
    setButtonStatus({upload:false})
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



const handleOpen=(rowData) =>{
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setBrandId(rowData.brandid)
    setProductName(rowData.productname)
    setDescription(rowData.description)
    setPrice(rowData.price)
    setOfferPrice(rowData.offerprice)
    setOfferType(rowData.offertype)
    setStock(rowData.stock)
    setStatus(rowData.status)
    setSaleStatus(rowData.salestatus)
    setRating(rowData.ratings)
    setProductId(rowData.productid)
    
    setOldIcon(rowData.picture)
    setIcon({filename:`${ServerURL}/images/${rowData.picture}`,byte:''})
    setPrevIcon(`${ServerURL}/images/${rowData.picture}`)
       setOpen(true)
      };
    

      const handleClose = () => {
        setOpen(false);
      };


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

      const handleDiscard=(rowData)=>{
        setIcon({filename:prevIcon,bytes:''})
        setButtonStatus({upload:true})
        }
        
    
        const saveEditPicture=async()=>{
            var formdata=new FormData()
            formdata.append('pic',icon.byte)
            formdata.append('pid',productId)
            formdata.append('oldicon',oldIcon)
           var response=await postData('product/editpicture',formdata)
        
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
           
           fetchAllProducts()
           
        
           }


           const handleSubmit=async()=>{
            var body={"pname":productName,"des":description,"price":price,"ofer":offerPrice,"ofertype":offerType,"stock":stock,"status":status,"salestatus":SaleStatus,"rating":rating,"pid":productId,}
               var response= await postData('product/editdata',body)
            
               if(response.status)
               {
                Swal.fire({
                  icon: 'success',
                  title: 'Done',
                  text: 'Products update Successfully'
                  
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
            fetchAllProducts()
            
          
             }
             const handleDeleteData=async()=>{
                var body={"pid":productId,"oldicon":oldIcon}
                var response=await postData('product/deletedata',body)
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
              fetchAllProducts()
            
             
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
    <div style={{width:680,height:680,background:'#f6e58d',padding:10,borderRadius:10}}>
        <div>
            <text style={{color:'black',fontSize:24}}>PRODUCT INTERFACE</text>
            <span><List onClick={()=>navigate('/displayproduct')}/></span>
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
<TextField value={productName} label="productName" fullWidth onChange={(e)=>setProductName(e.target.value)}></TextField>
</Grid>

<Grid xs={4} item>
<TextField value={description}  label="Description" onChange={(e)=>setDescription(e.target.value)} fullWidth></TextField>
</Grid>

<Grid xs={4} item>
<TextField value={price}  label="Price" onChange={(e)=>setPrice(e.target.value)} fullWidth></TextField>
</Grid>
<Grid xs={4} item>
<TextField value={offerPrice} label="OfferPrice" onChange={(e)=>setOfferPrice(e.target.value)} fullWidth></TextField>
</Grid>

<Grid xs={4} item>
<TextField value={offerType}  label="OfferType"onChange={(e)=>setOfferType(e.target.value)} fullWidth></TextField>
</Grid>
<Grid xs={4} item>
<TextField value={stock}  label="stock" onChange={(e)=>setStock(e.target.value)} fullWidth></TextField>
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
<TextField value={SaleStatus}  label="SaleStatus" onChange={(e)=>setSaleStatus(e.target.value)} fullWidth></TextField>
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
            {showHidePictureButton()}
            </Grid>

            <Grid item xs={6}  >
            <Avatar
           alt="Category Icon"
            src={icon.filename}
           
            sx={{ width:200, height:80 }}
           />
            </Grid>

            <Grid item xs={6}>
    <Button onClick={handleSubmit} variant="contained" fullWidth>
        Edit Data
     </Button>   
    
    
    </Grid>

        <Grid item xs={6}>
          
            <Button  onClick={handleDeleteData} variant="contained" fullWidth>
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


















// /////////////////End edit box//////////////////








    return(<div>
{displayProducts()}

<div>
    {showDialog()}
</div>
    </div>)
}