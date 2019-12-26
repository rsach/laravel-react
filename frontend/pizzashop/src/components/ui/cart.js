
import  PropTypes  from 'prop-types';
import '../../stylesheets/index.scss';

import CartItem from "./cart-item";
import React from 'react'




const Cart = ({proceedToCheckOut=f=>f, changeCurrency=f=>f,cart = [], currency}) => {





    console.log(currency);


    return (


        <div className="product-list flex flex-column">
            <div className="flex flex-end">

                <p className="product-font">Currency: </p>
                <select className="proceed-to-checkout" onChange={(e) => changeCurrency(e.target.value)}>
                    <option value="dollar">U.S. Dollar</option>
                    <option value="euro">Euro</option>
                </select>

            </div>

            {
                cart.map((item,i) =>
                    <CartItem key={i} currency={currency} item={item} />
                )
            }


            <div className="flex flex-end">

                <button className="proceed-to-checkout" onClick={() => proceedToCheckOut(cart)}>Proceed to checkout</button>

            </div>

        </div>
    )
};


Cart.propTypes = {
    proceedToCheckOut:PropTypes.func,
    changeCurrency:PropTypes.func,
    cart: (props) => (!(typeof props.product === 'object')) ?
        new Error('Product must be an object') :
        null,
    currency: PropTypes.string

};

export default Cart