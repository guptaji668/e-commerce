const initialState={
    product:{},
    

}

export default function RootReducer(State=initialState,action){
 switch(action.type){
    case 'ADD_PRODUCT':
        State.product[action.payload[0]]=action.payload[1]
        console.log("xxxxxxx",State.product)
        return({product:State.product}) 
    default :
    return(State)
           
 }

}