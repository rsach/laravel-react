import { connect } from 'react-redux'
import {addToCart, fetchProducts} from '../../actions'
import ProductList from "../ui/ProductList";

const mapStateToProps = (state,props) =>
    ({
        products:state.products.products,
    });

const mapDispatchToProps = dispatch =>
    ({
        onAddToCart(product){
            dispatch(
                addToCart(product)
            )
        },
        fetchProducts() {
            dispatch(
                fetchProducts('')
            )
        }
    });

export default connect(mapStateToProps,mapDispatchToProps)(ProductList)
