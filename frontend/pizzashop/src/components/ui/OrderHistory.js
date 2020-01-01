
import '../../stylesheets/index.scss';


import React from 'react'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";




import OrderHistoryItem from "./OrderHistoryItem";



const OrderHistory = ({orderHistory = []})  =>
         (
             <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar className="fixed" title="My Orders"></AppBar>
                        <div className="product-list flex flex-column">

                            {
                               (orderHistory || []).map((item, i) => <OrderHistoryItem key={i} item={item}></OrderHistoryItem>)

                            }








                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
         );




OrderHistory.propTypes = {
    orderHistory: (props) => (!Array.isArray(props.orderHistory)) ?
        new Error('Order History must be an array') :
        null

};

export default OrderHistory