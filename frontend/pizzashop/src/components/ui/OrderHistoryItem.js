
import React from 'react'

import '../../stylesheets/Menu.scss'
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import moment from 'moment';
import CartItem from "./cart-item";



const OrderHistoryItem = ({item}) => {


    let total = 0;
    ((item || {}).order_items || []).forEach(res => total += (+res.price * +res.quantity));

    const order_on = moment((item || {}).created_at ).format('MM-DD-YYYY hh:mm');
    return (<ExpansionPanel>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >

                <div className="flex past-order-container flex-space-between">
                    <Typography id="total"> Total: {(item || {}).currency === 'dollar' ? '$' : '€' } {total}</Typography>

                    <Typography>
                        Ordered On: {order_on}
                    </Typography>
                </div>

        </ExpansionPanelSummary>
        <ExpansionPanelDetails>


            <div className="product-list flex flex-column">


                {
                    ((item || {}).order_items || []).map(res => ({...res, ...res.menu}))
                                    .map((res,i) =>
                                                <CartItem key={i} currency={item.currency} item={res} />
                    )
                }




            </div>


        </ExpansionPanelDetails>
    </ExpansionPanel>
    );

};

OrderHistoryItem.propTypes = {
    item: (props) => (!(typeof props.item === 'object')) ?
        new Error('Order must be an object') :
        null,
};

export default OrderHistoryItem