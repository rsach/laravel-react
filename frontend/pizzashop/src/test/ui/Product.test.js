import React from 'react';
import { render } from '@testing-library/react';
import Login from "../../components/ui/Login";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Register from "../../components/ui/Register";
import ProductList from "../../components/ui/ProductList";
import PropTypes from "prop-types";
import Product from "../../components/ui/Product";
import OrderHistory from "../../components/ui/OrderHistory";

Enzyme.configure({ adapter: new Adapter() });


describe('<Product/> spec', () => {


    const propsFunc = {

        onAddToCart:jest.fn(),
        removeFromCart:jest.fn(),
        increaseQuantity:jest.fn(),
        decreaseQuantity:jest.fn(),
    };
    const product = {
        id: 1,
        name: 'Ila Kozey',
        price: 2,
        picture: 'https://lorempixel.com/640/480/?20457'

    };
    const cart = [
        {
            id:1,
            name:"Ila Kozey",
            price:2 ,
            picture:"https://lorempixel.com/640/480/?20457",
            created_at:"2019-12-29 14:27:07",
            updated_at:"2019-12-29 14:27:07",
            quantity:1
        }


    ];
    function setup() {
        const props = {
           ...propsFunc,

            product,
            cart: []
        };
        const wrapper = shallow(<Product {...props} />);
        return {
            props,  wrapper
        }
    }



    it('renders the component', () => {
        const {wrapper} = setup();
        expect(wrapper.firstChild).toMatchSnapshot();
    });


    it('add to cart', () => {
        const {wrapper, props} = setup();
        expect(wrapper.find('#addToCart').length).toBe(1);

        wrapper.find('#addToCart').simulate('click', props.product);
        expect(props.onAddToCart).toHaveBeenCalledTimes(1);

    });

    it('increase quantity ', () => {
        const props = { ...propsFunc, product, cart};
        const wrapper = shallow(<Product {...props} />);

        wrapper.find('#increase').simulate('click', props.cart[0]);
        expect(props.increaseQuantity).toHaveBeenCalledTimes(1);
    });

    it('decrease quantity', () => {
        const decCart = [{...cart[0]}];
        decCart[0].quantity = 2;
        const props = {...propsFunc, product, cart: decCart};
        const wrapper = shallow(<Product {...props} />);

        wrapper.find('#decrease').simulate('click', props.cart[0]);
        expect(props.decreaseQuantity).toHaveBeenCalledTimes(1);
        expect(wrapper.find('#added').length).toBe(1);



    });


    it('remove from cart', () => {
        const props = { ...propsFunc, product, cart};
        const wrapper = shallow(<Product {...props} />);

        wrapper.find('#removeFromCart').simulate('click', props.cart[0]);
        expect(props.removeFromCart).toHaveBeenCalledTimes(1);



    });

    it('renders error component', () => {


        const spy = jest.spyOn(console, 'error');

        const wrapper = shallow(<Product  />);
        expect(spy).toHaveBeenCalledTimes(1);

    });




});