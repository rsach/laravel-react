
import '../../stylesheets/index.scss'
import Product from "../containers/Product";
import React from 'react'
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const ProductList = ({products = []}) =>
    (
                <div>
                    <MuiThemeProvider>
                        <div>
                            <AppBar
                               className="fixed" title="Pizza List"
                            />

                            <div className="product-list flex flex-wrap">

                                {
                                    (products || []).map((product,i) => <Product key={i} product={product} />)
                                }

                            </div>

                        </div>
                    </MuiThemeProvider>
                </div>

            );




 

ProductList.propTypes = {
    products: (props) => (!Array.isArray(props.products)) ?
        new Error("Product List property must be an array") :
            null,


};

export default ProductList