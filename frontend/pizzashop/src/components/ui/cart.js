
import PropTypes  from 'prop-types';
import '../../stylesheets/index.scss';

import CartItem from "./cart-item";
import React from 'react'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

let c = 'dollar';

const Cart = ({proceedToCheckOut=f=>f, changeCurrency=f=>f,cart = [], currency}) => {




    c = currency;

    console.log(currency);


    return (


        <div>
            <MuiThemeProvider>
                <div>
                    <AppBar className="fixed" title="Place Order">
                        <Select
                            labelId="demo-simple-select-label"
                            id="currency"
                            value={c}
                            onChange={(e) => {changeCurrency(e.target.value); c = e.target.value} }
                        >
                            <MenuItem value="dollar">U.S. Dollar</MenuItem>
                            <MenuItem value="euro">Euro</MenuItem>
                        </Select>
                    </AppBar>
                    <div className="product-list flex flex-column">


                        {
                            (cart || []).map((item,i) =>
                                <CartItem key={i} currency={currency} item={item} />
                            )
                        }


                        <div className="flex flex-end">

                            <Button id="checkout" className="proceed-to-checkout" onClick={() => proceedToCheckOut({cart, currency})} variant="contained" color="primary">
                                Proceed to checkout
                            </Button>
                            {/*<button className="proceed-to-checkout" onClick={() => proceedToCheckOut(cart)}>Proceed to checkout</button>*/}

                        </div>

                    </div>
                </div>
            </MuiThemeProvider>
        </div>
    )
};


Cart.propTypes = {
    proceedToCheckOut:PropTypes.func,
    changeCurrency:PropTypes.func,
    cart: (props) => (!(Array.isArray(props.cart))) ?
        new Error('items must be an array') :
        null,
    currency: PropTypes.string

};

export default Cart