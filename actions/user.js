import * as firebase from 'firebase'

import { db } from '../config/Firebase.js'
import {searchFood,vitamins_minarels} from '../api/foodsApi'

// define types
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_FOOD_NAME = 'UPDATE_FOOD_NAME'
export const UPDATE_VALUE = 'UPDATE_VALUE'
export const UPDATE_FOODS_LIST = 'UPDATE_FOODS_LIST'
export const UPDATE_API_NUTRIENT_LIST = 'UPDATE_API_NUTRIENT_LIST'
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'
export const SHOW_DATA = 'SHOW_DATA'
export const FILTER_NUTRIENTS = 'FILTER_NUTRIENTS'
export const ADD_FOODS_LIST='ADD_FOODS_LIST'
export const SET_DATA ='SET_DATA'
export const GET_DATA = 'GET_DATA'
export const DELETE_FOOD_ITEM = 'DELETE_FOOD_ITEM'
export const DELETE_NUTRIENT_VALUE = 'DELETE_NUTRIENT_VALUE'
export const ADD_NUTRIENT_VALUE_LIST = 'ADD_NUTRIENT_VALUE_LIST' 


// actions
export const updateEmail = email => {
	return {
		type: UPDATE_EMAIL,
		payload: email
	}
}
export const updatePassword = password => {
	return {
		type: UPDATE_PASSWORD,
		payload: password
	}
}
export const updateFood_Name = food =>{
	return {
		type: UPDATE_FOOD_NAME,
		payload: food
	}
}
export const update_Value = value =>{
	return {
		type: UPDATE_VALUE,
		payload:value
	}
}

export const update_Foods_List = list =>{
	return {
		type: UPDATE_FOODS_LIST,
		payload: list
	}
}
export const addFood = () =>{
	return (dispatch,getState) =>{
		const {food_Name,nutrient_Value,foods_List} = getState().food
		const foodItem = {
			food_Name,
			nutrient_Value
		}
		foods_List.push(foodItem)
		dispatch({type:ADD_FOODS_LIST,payload:foods_List})
		
	}
}
export const login = () => {
	return async (dispatch,getState) => {
		try {
            const { email, password } = getState().user
            await firebase.auth().signInWithEmailAndPassword(email,password)
            .then((userCredentials) => {
                this.props.navigaiton.navigate('Home')
			    dispatch({type: LOGIN, payload: userCredentials.user})

            }).catch(error => console.log(error))
		} catch (e) {
			alert(e)
		}
	}
}

export const getUser = uid => {
	return async (dispatch, getState) => {
		try {
			const user = await db
				.collection('users')
				.doc(uid)
				.get()

			dispatch({ type: LOGIN, payload: user.data() })
		} catch (e) {
			alert(e)
		}
	}
}

export const signup = () => {
    const docRef = db.collection('users')

	return async (dispatch,getState) => {
		try {
            const {email,password} = getState().user
            await firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((userCredentials) => {
                if(userCredentials.user.uid){
                    const user = {
                        uid: userCredentials.user.uid,
                        email: userCredentials.user.email
                    }
                    docRef.doc(userCredentials.user.email).set(user)
                }
                this.props.navigaiton.navigate('Home')
                dispatch({type: SIGNUP, payload: userCredentials.user})
            })
            .catch(error => console.log(error))
			}
		catch (e) {
			alert(e)
		}
	}
}
export const handleFilter = () =>{
	return async(dispatch,getState) =>{
		const{api_Nutrient_List}= getState().food
		console.log("---------> "+api_Nutrient_List.length)
		let filteredList = []
		let temp_List = []
		api_Nutrient_List.forEach(element => {
			temp_List = element.filter(e =>{
				return vitamins_minarels.includes(e.nutrientName)
			})
			filteredList = filteredList.concat(temp_List)
		})
		console.log(filteredList.length+"----------------tt--- ")
		dispatch({type:FILTER_NUTRIENTS,payload:filteredList})
	}
}
export const setData = () =>{
	return async (dispatch,getState) =>{
		const {filtered_Nutrients_List} = getState().food
		const docRef = db.collection('users').doc(firebase.auth().currentUser.email).collection('foods')
		const nutrient_Doc_Ref = db.collection('users').doc(firebase.auth().currentUser.email)
		.collection('nutrients')
		const user_data = { 
            db_user_nutrient: filtered_Nutrients_List,
            created: firebase.firestore.FieldValue.serverTimestamp()
		}
		filtered_Nutrients_List.forEach(e => {
			const increment = firebase.firestore.FieldValue.increment(e.value)
			nutrient_Doc_Ref.doc(e.nutrientName).set({
				nutrientName: e.nutrientName,
				nutrient_Value: increment,
				unitName: e.unitName
			},{merge:true})
		})
		docRef.add(user_data)
		dispatch({type:SET_DATA,payload:[]})
		dispatch({type:UPDATE_API_NUTRIENT_LIST,payload:[]})
	}
}
export const getData = () =>{
	return (dispatch,getState) =>{
		const docRef = db.collection('users').doc(firebase.auth().currentUser.email).collection('foods')
		let list = []

		docRef.get().then((doc)=>{
			console.log("we got it ------")
			doc.docs.forEach(e =>{
				list = list.concat(e.data().db_user_nutrient)
			})
			dispatch({type:GET_DATA,payload:list})
		}).catch(e =>console.log(e))
	}
}
export const showData = ()=>{
	return async(dispatch,getState) =>{
		const {foods_List,api_Nutrient_List} = getState().food

		for(let i = 0;i<foods_List.length;i++){
			await searchFood(foods_List[i].food_Name,(nutrients) =>{
				console.log("search ----> ")
				api_Nutrient_List.push(nutrients.foods[0].foodNutrients.map(e =>
					({
					nutrientName: e.nutrientName,
					value: (e.value)*(parseInt(foods_List[i].nutrient_Value/100)),
					unitName: e.unitName,
					nutrientId: e.nutrientId,
					foodName: nutrients.foods[0].description
					})
				))
				console.log(api_Nutrient_List.length+"----")
			})
		}
		dispatch({type:SHOW_DATA,payload:api_Nutrient_List})
	}
}

export const handleCalculate = ()=>{
	return async(dispatch,getState)=>{
		const {foods_List,food_Name,api_Nutrient_List} = getState().food
		foods_List.push(food_Name)
		searchFood(food_Name,(nutrients) =>{
			api_Nutrient_List.push(nutrients.foods[0].foodNutrients.map(e =>
				({
				nutrientName: e.nutrientName,
				value: e.value,
				unitName: e.unitName,
				nutrientId: e.nutrientId,
				foodName: nutrients.foods[0].description
				})
			))
			dispatch({type:SHOW_DATA,payload:api_Nutrient_List})
		})
	}
}
export const deleteFood = food_name =>{
	return (dispatch,getState) => {
		const {foods_List} = getState().food
		var temp_List = []
		for(let i=0,count= 0;i<foods_List.length;i++){
			if(foods_List[i].food_Name != food_name){
				temp_List[count] = foods_List[i]
				count++
			}
		}
		dispatch({type:DELETE_FOOD_ITEM,payload:temp_List})
	}
}