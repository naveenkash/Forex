import update_rate_array from './update_rate_array';
import {combineReducers} from 'redux';
// console.log(auth);

const rootReducer = combineReducers({
    crypto_head_update:update_rate_array
})
export default rootReducer