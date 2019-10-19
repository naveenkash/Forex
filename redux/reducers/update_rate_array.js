const initialState = {
    head_update_array:
    []
  };
  
  export default (state = initialState, action) => {
    //   console.log(action.payload);
      
    switch (action.type) {
        
      case 'UPDATE_RATE_ARRAY':
        return {
            ...state,
            head_update_array: action.payload
        };
      default:
        return state;
    }
  };