import { combineReducers } from 'redux'
import { 
    LOGIN,
    SIGNUP,
    UPDATE_EMAIL,
    UPDATE_PASSWORD,
    UPDATE_FOOD_NAME,
    UPDATE_VALUE,
    UPDATE_FOODS_LIST,
    UPDATE_API_NUTRIENT_LIST,
    SHOW_DATA,
    ADD_FOODS_LIST,
    ADD_NUTRIENT_VALUE_LIST,
    FILTER_NUTRIENTS,
    SET_DATA,
    GET_DATA,
    DELETE_FOOD_ITEM,
    DELETE_NUTRIENT_VALUE
} from '../actions/user'



const user = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload
        case SIGNUP:
            return action.payload
        case UPDATE_EMAIL:
            return { ...state, email: action.payload }
        case UPDATE_PASSWORD:
            return { ...state, password: action.payload }
        default:
            return state
    }
}
const food_State = {
    api_Nutrient_List:[],
    food_Name:"",
    nutrient_Value:'',
    foods_List: [],
    snapShot:[],
    filtered_Nutrients_List: []
}

const food = (state = food_State,action) =>{
    switch(action.type){
        case SHOW_DATA:
            return {...state,api_Nutrient_List:[...action.payload]}
        case UPDATE_API_NUTRIENT_LIST:
            return {...state,api_Nutrient_List:[...action.payload]}
        case UPDATE_FOODS_LIST:
            return {...state,foods_List:[...action.payload]}
        case UPDATE_FOOD_NAME:
            return {...state,food_Name:action.payload}
        case UPDATE_VALUE:
            return {...state,nutrient_Value:action.payload}
        case ADD_FOODS_LIST:
            return {...state,foods_List:[...action.payload]}
        case FILTER_NUTRIENTS:
            return {...state,filtered_Nutrients_List:[...action.payload]}
        case SET_DATA:
            return {...state,foods_List:[...action.payload]}
        case GET_DATA:
            return {...state,snapShot:[...action.payload]}
        case DELETE_FOOD_ITEM:
            return {...state,foods_List:[...action.payload]}
        case DELETE_NUTRIENT_VALUE:
            return{...state,nutrient_Value_List:[...action.payload]}
        case ADD_NUTRIENT_VALUE_LIST:
            return {...state,nutrient_Value_List:[...action.payload]}
        default:
            return state
    }
}


const rootReducer = combineReducers({
    user,
    food
})

export default rootReducer