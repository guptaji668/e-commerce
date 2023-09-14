
import axios from "axios"
const ServerURL="http://localhost:5000"
 
const getData=async(url)=>{
    try{
      var response=await fetch(`${ServerURL}/${url}`)
      var result=await response.json()
      return(result)

    }catch(e){
        return(null)
    }

}




// ,{headers:{"content-type":"multipart/body"}}

 const postData=async(url,body)=>{
    try{
       
    var response= await axios.post(`${ServerURL}/${url}`,body)
     var result=await response.data 
     return(result)
    }
    catch(error)
    { console.log(error)
      
    return(false)
    }
     
    }
    

    const postDataImage=async(url,body)=>{
      try{
         
      var response= await axios.post(`${ServerURL}/${url}`,body,{headers:{"content-type":"multipart/body"}})
       var result=await response.data 
       return(result)
      }
      catch(error)
      { console.log(error)
        
      return(false)
      }
       
      }


    export {ServerURL,postData,getData,postDataImage}
    
    