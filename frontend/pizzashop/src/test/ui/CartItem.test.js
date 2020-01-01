import React from 'react';
import { render } from '@testing-library/react';
import Login from "../../components/ui/Login";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Register from "../../components/ui/Register";
import SuccessOrder from "../../components/ui/SuccessOrderPage";
import OrderHistoryItem from "../../components/ui/OrderHistoryItem";
import CartItem from "../../components/ui/cart-item";
import {PropTypes} from "prop-types";
import ProductList from "../../components/ui/ProductList";

Enzyme.configure({ adapter: new Adapter() });


jest.mock('moment', () => () => ({format: () => '2018–01–30T12:34:56+00:00'}));

describe('<OrderHistoryItem/> spec', () => {


    function setup(prop = {}) {
        const props = {
            item: {
                name: 'ds',
                picture: 'fds',
                price: 2,
                quantity: 1
            },
            currency: 'dollar',
            ...prop
        };
        const wrapper = shallow(<CartItem {...props} />);
        return {
            props,  wrapper
        }
    }



    it('renders the component', () => {
        const {wrapper, props} = setup();
        expect(wrapper.firstChild).toMatchSnapshot();
        expect(wrapper.find('#name').text()).toBe(props.item.name);
        expect(wrapper.find('#image').props()).toEqual({id: 'image', alt: props.item.name, className: 'cart-image', src: props.item.picture,});
    });

    it('renders the component', () => {
        const {wrapper, props} = setup();
        expect(wrapper.find('#price').text().includes('$')).toBeTruthy();
    });

    it('renders the component', () => {
        const {wrapper, props} = setup({currency: 'euro'});
        expect(wrapper.find('#price').text().includes('€')).toBeTruthy();
        expect(wrapper.find('#total').text().includes('2')).toBeTruthy();
    });


    it('renders the component', () => {
        const spy = jest.spyOn(console, 'error');

        const wrapper = shallow(<CartItem />);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('renders the component', () => {
        const {wrapper} = setup({item: null});
        expect(wrapper.firstChild).toMatchSnapshot();
    });

});