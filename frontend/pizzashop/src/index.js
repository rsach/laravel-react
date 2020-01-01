
import React from 'react'
import { render } from 'react-dom'
import routes from './routes'
import sampleData from './initialState'
import storeFactory from './store'
import { Provider } from 'react-redux'
import {addError, fetchOrderHistory, fetchProducts} from './actions'
import C from "./constant";


// import initialState from './initialState.json'


const initialState = 	(localStorage["redux-store"]) ?
						JSON.parse(localStorage["redux-store"]) :
						sampleData;


const saveState = () => 
					localStorage["redux-store"] = JSON.stringify(store.getState());


const handleError = error => {
	store.dispatch(
			addError(error.message)
		)
};


const store = storeFactory(initialState);
store.subscribe(saveState);

if (localStorage.getItem('token')) {
	store.dispatch(
		fetchOrderHistory('')
	)

	store.dispatch(
		fetchProducts('')
	)
	store.dispatch(
		{
			type: C.LOGIN_SUCCESS,

		}
	)
}

window.React = React;
window.store = store;

window.addEventListener("error", handleError);

render(
	<Provider store={store}>
		{routes}
	</Provider>,
	document.getElementById('root')
);


