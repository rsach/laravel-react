import { Link } from 'react-router-dom'
import HomeIcon from 'react-icons/lib/fa/home'

import {FaShoppingCart, FaArchive} from 'react-icons/lib/fa'
import React from 'react'

import '../../stylesheets/Menu.scss'

const Menu = () => 
		<nav className = "menu">
			<Link to="/" >
				<HomeIcon />
			</Link>
			<Link  to="/checkout">
				<FaShoppingCart />

			</Link>
			<Link  to="/pastOrders">
				<FaArchive />

			</Link>




		</nav>;

export default Menu