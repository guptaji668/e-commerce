import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { getData,postData,ServerURL } from '../Services/FetchNodeServices';
import { useState,useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person'
import './Home.css'


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {


  
const[categories,setCategories]=useState([])
const[subCategories,setSubCategories]=useState([])
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);//true yaa false ==boolean operator typecastting



const fetchAllSubCategory=async(cid)=>{
  var body={categoryid:cid}
var response=await postData('user/fetchallsubcategorybycategory',body)
setSubCategories(response.data)
}

const handleClick=(event)=>{
    setAnchorEl(event.currentTarget)
    fetchAllSubCategory(event.currentTarget.value)
}

const handleClose=()=>{
    setAnchorEl(null)
}

const fetchAllCategory=async()=>{
var response=await getData("user/displayallcategory")
setCategories(response.data)
}

const showMainMenu=()=>{
  
  return( categories.map((item,index)=>{
        return(
          <>
          {index<=3?
          
            <Button id="cbtn" value={item.categoriesid} onClick={handleClick} style={{color:"#000",alignItems:'center',margin:20,fontWidth:'bolder'}}>{item.categoriesname}</Button>

          :<></>}
          </>
        )
    }))
}

const showSubMenu=()=>{
  return(subCategories.map((item)=>{
      return(
        <MenuItem onClick={handleClose}>{item.subcategoryname}</MenuItem>
      )
  }))
}


useEffect(function(){
    fetchAllCategory();
},[])

const secondHeader=()=>{

  return( categories.map((item,index)=>{
    return(
      <>
      {index>3?
      
        <Button value={item.categoriesid} onClick={handleClick} style={{color:"#fff",alignItems:'center',margin:20,fontWidth:'bold'}}>{item.categoriesname}</Button>

      :<></>}
      </>
    )
}))
 
}




  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='inherit' position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
         
            <img src="assets/blogo.gif" width="100"/>
            <div style={{display:'flex',justifyContent:'center',width:'72%'}}>
            <Box style={{display:'flex', alignItems:'center'  }}>
            {showMainMenu()}
            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
      {showSubMenu()}
      </Menu>


            </Box>
            </div>
        
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Medicine…..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <div><ShoppingCartIcon style={{}}/></div>
          <div style={{padding:2}}>
            
            <PersonIcon  style={{marginLeft:30}}/>
          </div>

        </Toolbar>
      </AppBar>
      <div style={{height:50,width:'100vw',background:'#000',display:'flex',justifyContent:'center',alignItems:'center'}}>
      {secondHeader()}
      </div>
    </Box>
  );
}