import C from '../constant'
import { combineReducers } from 'redux'

export const goal =  (state=10, action) => 
	(action.type === C.SET_GOAL) ?
	 parseInt(action.payload) :
	 state;




export const skiDay =  (state=null, action) => 
	(action.type === C.ADD_DAY) ?
	 action.payload :
	 state;


export const addToCart =  (state=null, action) =>
	(action.type === C.ADD_TO_CART) ?
		{...action.payload, quantity: 1} :
		state;




export const errors = (state=[],action) => {

		switch(action.type){
			case C.ADD_ERROR:
				return [
				...state,
				action.payload
				];

			case C.CLEAR_ERROR:
				return state.filter((message,i) => i !== action.payload);


			default:
				return state;
		}
	};



export const allSkiDays = (state = [], action ) => {
	switch(action.type){
		case C.ADD_DAY:
			const hasDay = state.some(skiDay => skiDay.date === action.payload.date);
			return (hasDay) ?
					state   :
					 [
						...state,
						skiDay(null,action) 
					];

		case C.REMOVE_DAY: 
			return state.filter( skiDay => skiDay.date !== action.payload);

		default:
			return state
	}

};


export const fetching = (state=false,action ) =>{

	switch(action.type){
		case C.FETCH_PRODUCTS:
			return true;
		case C.CANCEL_FETCHING:
			return false;

		default:
			return state
	}

};

export const currency = (state='dollar',action ) =>{

	switch(action.type){
		case C.CHANGE_CURRENCY:
			return action.payload;
		default:
			return state
	}

};


export const suggestions = (state=[] , action) => {

	switch(action.type){
		case C.CLEAR_SUGGESTIONS:
			return [];
		case C.CHANGE_SUGGESTIONS:
			return action.payload;

		default:
			return state
	}

};



export const products = (state=[] , action) => {

	switch(action.type){
		case C.CLEAR_PRODUCTS:
			return [];
		case C.CHANGE_PRODUCTS:
			return action.payload;

		default:
			return state
	}

};

export const allProducts = (state = [], action ) => {
	switch(action.type){
		case C.ADD_DAY:
			const hasDay = state.some(skiDay => skiDay.date === action.payload.date);
			return (hasDay) ?
				state   :
				[
					...state,
					skiDay(null,action)
				];

		case C.REMOVE_DAY:
			return state.filter( skiDay => skiDay.date !== action.payload);

		default:
			return state
	}

};



export const cart = (state = [], action ) => {
	switch(action.type){
		case C.ADD_TO_CART:
			const hasProduct = state.some(product => product.id === action.payload.id);
			return (hasProduct) ?
				state   :
				[
					...state,
					addToCart(null,action)
				];

		case C.REMOVE_FROM_CART:
			return state.filter( product => product.id !== action.payload.id);

		case C.DECREASE_QUANTITY_OF_PRODUCT_FROM_CART:
		case C.INCREASE_QUANTITY_OF_PRODUCT_FROM_CART:
			const product = state.filter(product => product.id === action.payload.id)[0];
			const newProduct = Object.assign({}, product);
			const rest  = state.filter( product => product.id !== action.payload.id);
			if (action.type === C.INCREASE_QUANTITY_OF_PRODUCT_FROM_CART) {
				newProduct.quantity += 1;

			} else if (action.type === C.DECREASE_QUANTITY_OF_PRODUCT_FROM_CART) {
				newProduct.quantity -= 1;
			}
			return [...rest, newProduct];
		default:
			return state
	}

};








export default combineReducers({
	allSkiDays,
	allProducts,
	goal,
	errors,
	resortNames: combineReducers({
		fetching,
		suggestions
	}),
	products: combineReducers({
		fetching,
		products
	}),
	cart,
	currency
})