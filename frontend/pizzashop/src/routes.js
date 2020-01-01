import React from 'react'
import {  Router, Route, Switch } from 'react-router'
import {Redirect} from 'react-router-dom';




import ProductList from "./components/containers/ProductList";

import Cart from "./components/containers/cart";
import history  from "./history";

import ShowErrors from "./components/containers/ShowErrors";

import PrivateRoute from "./guardedRoute";
import Login from "./components/containers/Login";
import Register from "./components/containers/Register";
import SuccessOrder from "./components/ui/SuccessOrderPage";
import OrderHistory from "./components/containers/OrderHistory";




const routes = (
	<Router history={history} >

		<div className="app">
			<ShowErrors />

			<Switch>


				<Route exact  path="/login" component={Login} />
				<Route exact  path="/register" component={Register}/>



				<PrivateRoute path="/checkout">
					<Cart/>

				</PrivateRoute>

				<PrivateRoute path="/pastOrders">

					<OrderHistory></OrderHistory>
				</PrivateRoute>
				<PrivateRoute path="/success">
					<SuccessOrder/>

				</PrivateRoute>

				<PrivateRoute path="/">
					<ProductList />
				</PrivateRoute>



				<Redirect from="*" to="/" />
			</Switch>




		</div>




	</Router>
);

export default routes

