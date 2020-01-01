import React from 'react';
import { render } from '@testing-library/react';
import Login from "../../components/ui/Login";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Register from "../../components/ui/Register";
import ProductList from "../../components/ui/ProductList";
import PropTypes from "prop-types";
import OrderHistory from "../../components/ui/OrderHistory";

Enzyme.configure({ adapter: new Adapter() });


describe('<OrderHistory/> spec', () => {


    function setup() {
        const props = {
            orderHistory: [
                {
                    "id":1,"user_id":1,"currency":"euro","created_at":"2019-12-29 14:29:44","updated_at":"2019-12-29 14:29:44","order_items":[{"id":1,"menu_id":2,"quantity":2,"price":"7.00","created_at":"2019-12-29 14:29:44","updated_at":"2019-12-29 14:29:44","order_id":1,"menu":{"id":2,"name":"Prof. Sylvan Mertz MD","price":7,"picture":"https://lorempixel.com/640/480/?93343","created_at":"2019-12-29 14:27:07","updated_at":"2019-12-29 14:27:07"}}]
                }
            ]
        };
        const wrapper = shallow(<OrderHistory {...props} />);
        return {
            props,  wrapper
        }
    }



    it('renders the component', () => {
        const {wrapper} = setup();
        expect(wrapper.firstChild).toMatchSnapshot();
    });

    it('renders 1 component', () => {
        const {wrapper} = setup();
        expect(wrapper.find('OrderHistoryItem').length).toBe(1);
    });

    it('renders error component', () => {


        const spy = jest.spyOn(console, 'error');

        const props = {orderHistory: null};
        const wrapper = shallow(<OrderHistory {...props} />);
        expect(spy).toHaveBeenCalledTimes(1);

    });

    it('renders error component', () => {


        const spy = jest.spyOn(console, 'error');

        const wrapper = shallow(<OrderHistory  />);
        expect(spy).toHaveBeenCalledTimes(1);

    });



});