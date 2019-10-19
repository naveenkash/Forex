export const update_rate_array=(rateUpdateArray)=>{
   return dispatch =>{
    dispatch({
        type:'UPDATE_RATE_ARRAY',
        payload:rateUpdateArray
    })
   }
}