const initialState = [true, true, true, true];

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_RATE_ARRAY":
      return action.payload;
    default:
      return state;
  }
};
