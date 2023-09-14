import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Categories from '../Categories/Categories';
import DisplayAllCategories from '../Categories/DisplayAllCategories';
import DisplayAllSubCategories from '../Subcategoies/DisplayAllSubCategories';
import DisplayBrand from '../Brand/DisplayBrand';
import DisplayProduct from '../products/displayallproduct';
import SubCategories from '../Subcategoies/SubCategories';
import Brand from '../Brand/Brand';
import Product from '../products/product';

export default function AdminListItems(props){

    const handleClick=(v)=>{
    props.setViewContainer(v)
    }

    return(
        <div>
             <React.Fragment>
    <ListItemButton onClick={()=>handleClick(<img src="assets/pic8.jpg" />)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton  onClick={()=>handleClick(<Categories setViewContainer={props.setViewContainer}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItemButton>
    <ListItemButton onClick={()=>handleClick(<SubCategories setViewContainer={props.setViewContainer}/>)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="SubCategory" />
    </ListItemButton>
    <ListItemButton onClick={()=>handleClick(<Brand setViewContainer={props.setViewContainer}/>)}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Brands" />
    </ListItemButton>
    <ListItemButton onClick={()=>handleClick(<Product setViewContainer={props.setViewContainer}/>)}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Product" />
    </ListItemButton>
  </React.Fragment>

  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Admin Profile" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Login" />
    </ListItemButton>
  </React.Fragment>

        </div>
    )
}
 
