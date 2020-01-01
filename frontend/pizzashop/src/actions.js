import C, { url} from './constant'
import history from "./history";









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








export const addError = (message) => ({
	type:C.ADD_ERROR,
	payload:message
});

export const clearError = index =>
		({
			type:C.CLEAR_ERROR,
			payload:index
		});






export const proceedToCheckOut = ({cart = [], currency = 'dollar'}) => dispatch =>{
	dispatch({
		type: C.POST_ORDER
	});


	const data = cart.map(res => ({menu_id: res.id, quantity: res.quantity, price: res.price}));
	const token = localStorage.getItem('token');
	return fetch(url+'/orders' ,{
			method: 'POST', // or 'PUT'
			body: JSON.stringify({data, currency}), // data can be `string` or {object}!
			headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
		.then( response => response.json())
		.then(res => {
			dispatch({
				type:C.ORDER_PLACED,
				payload:res.data.items[0]
			});
			dispatch({
				type: C.EMPTY_CART_AFTER_ORDER_SUCCESS
			});

			dispatch({
				type: C.ADD_ORDER_HISTORY,
				payload: res.data.items[0]
			});

			history.push('/success');
		})
		.catch(error =>{
			dispatch(
				addError(error.message)
			);
			dispatch({
				type:C.POST_ORDER_FAIL
			})
		})
};




export  const  login =   (value) =>  async (dispatch)  => {

	dispatch({
		type: C.LOGIN_REQUEST
	});
	const data = {
		...value
	};

	try {
		const a = await fetch(url+`/login?email=${data.email}&password=${data.password}`, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
		} );
		const b = await a.json();
		console.log(b.success);

		if (!b.success) {
			throw new Error('Wrong Credentials')
		}

		localStorage.setItem('token', b.data.access_token);
		dispatch(
			fetchProducts('')
		);
		dispatch(
			fetchOrderHistory('')
		);
		dispatch({
			type: C.LOGIN_SUCCESS
		});

		history.push('/');




	}catch (e) {

		dispatch({
			type: C.LOGIN_FAILURE
		});

		dispatch(
			addError(e.message)
		);
	}


};




export const register = value => dispatch  => {

	const data = {
		...value
	};

	dispatch({
		type: C.REGISTER_REQUEST
	});

	return fetch(url+`/register`, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		}
	} )
		.then( response => response.json())
		.then(res => {
			if (!res.success) {

				const errorMessage = Object.keys(res.data.errors).map(err => res.data.errors[err]).join(',');
				throw new Error(errorMessage)
			}
			localStorage.setItem('token', res.data.access_token);
			dispatch({
				type: C.REGISTER_SUCCESS
			});

			dispatch(
				fetchProducts('')
			);
			dispatch(
				fetchOrderHistory('')
			);
			dispatch({
				type: C.LOGIN_SUCCESS
			});

			history.push('/');

		})
		.catch(error =>{

			dispatch({
				type: C.REGISTER_FAILURE
			});
			error.message.split(',').forEach(err => dispatch(
				addError(err)
			)
			);
			new Error(error)
		})
};

export const fetchProducts = value => dispatch => {
	dispatch({
		type: C.FETCH_PRODUCTS
	});
	const token = localStorage.getItem('token');

	return fetch(url+'/products', {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
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


export const fetchOrderHistory = value => dispatch => {
	dispatch({
		type: C.FETCH_ORDER_HISTORY
	});
	const token = localStorage.getItem('token');

	return fetch(url+'/orders', {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
		.then( response => response.json())
		.then(orderHistory => {
			dispatch({
				type:C.CHANGE_ORDER_HISTORY,
				payload:orderHistory.data.items
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