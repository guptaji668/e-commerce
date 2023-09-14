
import React from "react";
import './Home.css'
import  {makeStyles}  from "@mui/material";
import { ServerURL,getData,postData } from "../Services/FetchNodeServices";
import { useState,useEffect } from 'react';
import Header from "./Header";
import SliderOwn from "./Slider";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

//    const useStyle=makeStyles({
//     suvdiv:{
//         width:'250px',
//         height:'300px',
//         padding:'10px',
//         border:'1px solid #000',
//         borderRadius:'5px',
//         margin:10,
//         display:'flex',
//         justifyContent:'center',
//         alignItems:'center',
//     },
// })

var settings={
    dots:false,
    arrows:true,
    infinite:true,
    speed:1000,
    slidesToShow:4,
    slidesToScroll:1

}
export default function Home(props){
    // const classes=useStyle()
    const[categories,setCategories]=useState([])
const[subCategories,setSubCategories]=useState([])


// const fetchAllSubCategory=async(cid)=>{
//     var body={categoryid:cid}
//   var response=await postData('user/fetchallsubcategorybycategory',body)
//   setSubCategories(response.data)
//   }

  const fetchAllCategory=async()=>{
    var response=await getData("user/displayallcategory")
    setCategories(response.data)
    }

    const showCategoryImage=()=>{
  
        return( categories.map((item,index)=>{
              return(
               
                    <div className="suvdiv">
                        <div style={{paddig:20,margin:20,}}>
                        <img src={`${ServerURL}/images/${item.icon}`} style={{width:250,height:150}}/>
                        <div  className="cname">

                        {item.categoriesname}
                        </div>
                  
                        </div>
                 
            
               </div>
              )
          }))
      }

      useEffect(function(){
        fetchAllCategory();
    },[])
    
      


    return(
    <div style={{display:'flex', flexDirection:'column' }}>
        <Header/>
        <SliderOwn/>
        <div className="div">

<div style={{width:'100%'}}>
    <Slider {...settings}>
    {showCategoryImage()}
    </Slider>

</div>
        
       
      

        </div>
       
   
         
    
    </div>)
}