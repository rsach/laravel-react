import React from 'react'
import {  Router, Route, Switch } from 'react-router'




import ProductList from "./components/containers/ProductList";

import Cart from "./components/containers/cart";
import history  from "./history";
import Menu from "./components/ui/Menu";
import ShowErrors from "./components/containers/ShowErrors";
import {Whoops404} from './components/index';


const routes = (
	<Router history={history} >

		<div className="app">
			<ShowErrors />

			<Switch>

				<Route exact  path="/" component={ProductList} />
				<Route exact  path="/checkout" component={Cart}/>
				<Route path="*" component={Whoops404} />
			</Switch>


			<Menu/>


		</div>




	</Router>
);

export default routes

