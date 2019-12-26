
import { PropTypes } from 'prop-types'
import '../../stylesheets/index.scss'
import {Component} from 'react';
import Product from "../containers/Product";
import React from 'react'

class ProductList extends Component   {

    componentDidMount() {
        this.props.fetchProducts('');

    }

    render (){
          const {products = []}= this.props;



            return (
                <div className="product-list flex flex-wrap">

                        {
                            products.map((product,i) =>
                                <Product key={i} product={product} />
                            )
                        }

                </div>
            )
        }
 }


 

ProductList.propTypes = {
    fetchProducts: PropTypes.func,
    products: (props) => (!Array.isArray(props.products)) ?
        new Error("Product List property must be an array") :
        (!props.products.length) ?
            new Error("Product List array must contain at least one record") :
            null,


};

export default ProductList