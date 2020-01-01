import React from 'react';
import { render } from '@testing-library/react';
import Login from "../../components/ui/Login";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Register from "../../components/ui/Register";
import ProductList from "../../components/ui/ProductList";
import PropTypes from "prop-types";
import Cart from "../../components/ui/cart";
import CartItem from "../../components/ui/cart-item";

Enzyme.configure({ adapter: new Adapter() });


describe('<Cart/> spec', () => {


    function setup() {
        const props = {
            proceedToCheckOut:jest.fn(),
            changeCurrency:jest.fn(),
            cart: [
                    {
                        id:1,
                        name:"Ila Kozey",
                        price:2 ,
                        picture:"https://lorempixel.com/640/480/?20457",
                        created_at:"2019-12-29 14:27:07",
                        updated_at:"2019-12-29 14:27:07",
                        quantity:1
                    }


            ],
            currency: 'dollar'
        };
        const wrapper = shallow(<Cart {...props} />);
        return {
            props,  wrapper
        }
    }



    it('renders the component', () => {
        const {wrapper} = setup();
        expect(wrapper.firstChild).toMatchSnapshot();
    });

    it('renders the component', () => {
        const spy = jest.spyOn(console, 'error');

        const wrapper = shallow(<Cart />);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('renders the component', () => {

        const {wrapper, props} = setup();

        wrapper.find('#currency').simulate('change', {target: {value: 'dollar'}});
        expect(props.changeCurrency).toHaveBeenCalledTimes(1);

    });

    it('renders the component', () => {

        const {wrapper, props} = setup();

        wrapper.find('#checkout').simulate('click');
        expect(props.proceedToCheckOut).toHaveBeenCalledTimes(1);


    });

    it('renders error component', () => {


        const spy = jest.spyOn(console, 'error');

        const props = {cart: null};
        const wrapper = shallow(<Cart {...props} />);
        expect(spy).toHaveBeenCalledTimes(1);

    });




});