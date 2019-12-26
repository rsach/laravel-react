
import { PropTypes } from 'prop-types';
import '../../stylesheets/index.scss';

import React from 'react'


const CartItem = ({ item = {}, currency = ''}) => {





    console.log(currency)


    return (
        <div className="flex flex-space-between">
            <div className="image-container">
                <img alt={item.name} className="cart-image" src={item.picture} />
                <p className="product-font">{item.name}</p>


            </div>
            <div className="flex flex-space-between">

                <div className="product-price">
                    <div className="flex">
                        <p className="product-font">{item.quantity} pc</p>
                        <p className="product-font">x</p>


                        <p className="product-font">{currency === 'dollar' ? '$' : '€'} {item.price}</p>
                        <p className="product-font total-margin"> : {currency === 'dollar' ? '$' : '€'} {item.quantity*item.price}</p>

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