import { connect } from 'react-redux'
import { changeCurrency, proceedToCheckOut} from '../../actions'

import Cart from "../ui/cart";

const mapStateToProps = (state,props) =>
    ({
        cart: state.cart,
        currency: state.currency
    });

const mapDispatchToProps = dispatch =>
    ({
        proceedToCheckOut(cart){
            dispatch(
                proceedToCheckOut(cart)
            )
        },
        changeCurrency(e) {
            dispatch(
                changeCurrency(e)
            )
        }

    });


export default connect(mapStateToProps,mapDispatchToProps)(Cart)
