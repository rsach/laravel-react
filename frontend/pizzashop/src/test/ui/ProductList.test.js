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


describe('<ProductList/> spec', () => {


    function setup() {
        const props = {
            fetchProducts: jest.fn(),
            products: [
                {
                    id:1,
                    name:"Ila Kozey",
                    price:0,
                    picture:"https://lorempixel.com/640/480/?20457",
                    created_at:"2019-12-29 14:27:07",
                    updated_at:"2019-12-29 14:27:07"

                }
            ]
        };
        const wrapper = shallow(<ProductList {...props} />);
        return {
            props,  wrapper
        }
    }

    it('renders error component', () => {


        const spy = jest.spyOn(console, 'error');

        const props = {products: null};
        const wrapper = shallow(<ProductList {...props} />);
        expect(spy).toHaveBeenCalledTimes(1);

    });




    it('renders the component', () => {
        const {wrapper} = setup();
        expect(wrapper.firstChild).toMatchSnapshot();
    });

    it('renders the component', () => {
        const spy = jest.spyOn(console, 'error');

        const wrapper = shallow(<ProductList />);

        expect(spy).toHaveBeenCalledTimes(1);
    });



});