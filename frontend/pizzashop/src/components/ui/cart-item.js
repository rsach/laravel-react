
import { PropTypes } from 'prop-types';
import '../../stylesheets/index.scss';

import React from 'react'


const CartItem = ({ item = {}, currency = ''}) => {







    return (
        <div className="flex flex-space-between">
            <div className="image-container">
                <img id="image" alt={(item || {}).name} className="cart-image" src={(item || {}).picture} />
                <p  id="name" className="product-font">{(item || {}).name}</p>


            </div>
            <div className="flex flex-space-between">

                <div className="product-price">
                    <div className="flex">
                        <p id="quantity" className="product-font">{(item || {}).quantity} pc</p>
                        <p className="product-font">x</p>


                        <p id="price" className="product-font">{currency === 'dollar' ? '$' : '€'} {(item || {}).price}</p>
                        <p id="total" className="product-font total-margin"> : {currency === 'dollar' ? '$' : '€'} {(item || {}).quantity*(item || {}).price}</p>

                    </div>




                </div>


            </div>


        </div>
    )
};


CartItem.propTypes = {
    item: (props) => (!(typeof props.item === 'object')) ?
        new Error('Item must be an object') :
        null,
    currency: PropTypes.string

};

export default CartItem