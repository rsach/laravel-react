import C, { url} from './constant'


export const addDay = (resort,date , powder=false , backcountry=false) => {
	return {
		type: C.ADD_DAY,
		payload:{
			resort,date,powder,backcountry
		}
	}

}



export const removeDay = (date) =>{
	return {
		type: C.REMOVE_DAY,
		payload: date
	}
};


export const addToCart = (product) =>{
	return {
		type: C.ADD_TO_CART,
		payload: product
	}
};

export const removeFromCart = (product) =>{
	return {
		type: C.REMOVE_FROM_CART,
		payload: product
	}
};


export const decreaseQuantity = (product) =>{
	return {
		type: C.DECREASE_QUANTITY_OF_PRODUCT_FROM_CART,
		payload: product
	}
};

export const increaseQuantity = (product) =>{
	return {
		type: C.INCREASE_QUANTITY_OF_PRODUCT_FROM_CART,
		payload: product
	}
};
export const changeCurrency = (currency) =>{
	return {
		type: C.CHANGE_CURRENCY,
		payload: currency
	}
};





export const setGoal = (goal) => {
	return {
		type: C.SET_GOAL,
		payload:goal
	}
};


export const addError = (message) => ({
	type:C.ADD_ERROR,
	payload:message
});

export const clearError = index =>
		({
			type:C.CLEAR_ERROR,
			payload:index
		});


export const changeSuggestions = suggestions => 
		({
			type: C.CHANGE_SUGGESTIONS,
			payload:suggestions
		});


export const clearSuggestions = () => 
		({
			type: C.CLEAR_SUGGESTIONS
		});


export const randomGoals = () => (dispatch,getState) => {
	if(!getState().resortNames.fetching){
		dispatch({
			type: C.FETCH_PRODUCTS
		});


		setTimeout(() => {
			dispatch({
				type:C.CANCEL_FETCHING
			})
		},1500)
	}
};



export const proceedToCheckOut = (cart) => dispatch =>{
	dispatch({
		type: C.POST_ORDER
	});

	const data = cart.map(res => ({menu_id: res.id, quantity: res.quantity, price: res.price}));
	const token = localStorage.getItem('token');
	fetch(url+'/orders' ,{
		method: 'POST', // or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
		.then( response => response.json())
		.then(suggestions => {
			dispatch({
				type:C.CHANGE_SUGGESTIONS,
				payload:suggestions
			})
		})
		.catch(error =>{
			dispatch(
				addError(error.message)
			);
			dispatch({
				type:C.CANCEL_FETCHING
			})
		})
};


export const suggestResortNames = value => dispatch => {
	dispatch({
		type: C.FETCH_PRODUCTS
	});

	fetch(url+'/products')
		.then( response => response.json())
		.then(suggestions => {
			dispatch({
				type:C.CHANGE_SUGGESTIONS,
				payload:suggestions
			})
		})
		.catch(error =>{
			dispatch(
					addError(error.message)
				);
			dispatch({
				type:C.CANCEL_FETCHING
			})
		})
};

export const login = value  => {

	const data = {
		email: 'rahul.sachdeva@live.com',
		password: '12345fsfsd'
	};

	fetch(url+`/login?email=${data.email}&password=${data.password}`, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(data), // data can be `string` or {object}!
	} )
		.then( response => response.json())
		.then(res => {
			localStorage.setItem('token', res.data.access_token);

		})
		.catch(error =>{

			new Error(error)
		})
};

export const fetchProducts = value => dispatch => {
	dispatch({
		type: C.FETCH_PRODUCTS
	});

	fetch(url+'/products')
		.then( response => response.json())
		.then(products => {
			dispatch({
				type:C.CHANGE_PRODUCTS,
				payload:products.data.items
			})
		})
		.catch(error =>{
			dispatch(
					addError(error.message)
				);
			dispatch({
				type:C.CANCEL_FETCHING
			})
		})
};