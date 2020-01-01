import C from '../constant'
import { combineReducers } from 'redux'








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

export const orderHistory = (state=[] , action) => {

	switch(action.type){
		case C.CLEAR_ORDER_HISTORY:
			return [];
		case C.CHANGE_ORDER_HISTORY:
			return action.payload;
		case C.ADD_ORDER_HISTORY:
			return [ ...state, action.payload];

		default:
			return state
	}

};


export const isAuthenticated = (state=false,action ) =>{

	switch(action.type){
		case C.LOGIN_SUCCESS:
			return true;
		case C.LOGIN_FAILURE:
		case C.LOGOUT:
			return false;

		default:
			return state
	}

};



export const cart = (state = [], action ) => {
	switch(action.type){
		case C.ADD_TO_CART:
			return [
					...state,
					addToCart(null,action)
				];

		case C.REMOVE_FROM_CART:
			return state.filter( product => product.id !== action.payload.id);

		case C.EMPTY_CART_AFTER_ORDER_SUCCESS:
			return [];
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
	errors,
	products: combineReducers({
		fetching,
		products
	}),
	cart,
	currency,
	orderHistory,
	isAuthenticated
})