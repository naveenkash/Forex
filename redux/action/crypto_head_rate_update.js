export const update_rate_array=(rateUpdateArray)=>{
   return dispatch =>{
       console.log(rateUpdateArray);
       
    dispatch({
        type:'UPDATE_RATE_ARRAY',
        payload:rateUpdateArray
    })
   }
}