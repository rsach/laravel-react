
import PropTypes from 'prop-types';
import '../../stylesheets/index.scss';
import React from 'react'



const Product = ({product,onAddToCart=f=>f,removeFromCart=f=>f,increaseQuantity=f=>f,decreaseQuantity=f=>f, cart = []}) => {



    const cartData = cart.filter(res => res.id === product.id);




    return (
        <div className="product">
            <div className="image-container">
                <img id="image" alt={(product || {}).name} className="image" src={(product || {}).picture} />
                <p id="price">{(product || {}).price}</p>

            </div>
            <div className="flex flex-space-between">
                <p id="name">{(product || {}).name}</p>
                {

                    (cartData || []).length > 0 ?
                        (<div id="added">

                            <input id="quantity" disabled value={cartData[0].quantity}/>
                            <button id="increase" onClick={() => increaseQuantity(cartData[0])}>+</button>
                            {
                                cartData[0].quantity> 1 ?
                                    (<button id="decrease" onClick={() => decreaseQuantity(cartData[0])}>-</button>):
                                    (<button id="removeFromCart" onClick={() => removeFromCart(product)}>-</button>)
                            }


                        </div>

                        )

                     : (
                         <button id="addToCart" onClick={() => onAddToCart(product)}>ADD TO CART</button>
                    )}
            </div>


        </div>
    )
};


Product.propTypes = {
    onAddToCart:PropTypes.func,
    removeFromCart:PropTypes.func,
    increaseQuantity:PropTypes.func,
    decreaseQuantity:PropTypes.func,

    product: (props) => (!(typeof props.product === 'object')) ?
        new Error('Product must be an object') :
        null,


};

export default Product