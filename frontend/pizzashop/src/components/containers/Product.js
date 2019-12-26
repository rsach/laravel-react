import { connect } from 'react-redux'
import {addToCart, decreaseQuantity, increaseQuantity, removeFromCart} from '../../actions'
import Product from "../ui/Product";

const mapStateToProps = (state,props) =>
    ({
        product: props.product,
        cart: state.cart
    });

const mapDispatchToProps = dispatch =>
    ({
        onAddToCart(product){
            dispatch(
                addToCart(product)
            )
        },
        removeFromCart(product) {
            dispatch(
                removeFromCart(product)
            )
        },
        increaseQuantity(product) {
            dispatch(
                increaseQuantity(product)
            )
        },
        decreaseQuantity(product) {
            dispatch(
                decreaseQuantity(product)
            )
        }

    });

export default connect(mapStateToProps,mapDispatchToProps)(Product)
