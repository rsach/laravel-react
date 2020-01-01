import React from 'react';
import { render } from '@testing-library/react';
import Login from "../../components/ui/Login";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Register from "../../components/ui/Register";
import SuccessOrder from "../../components/ui/SuccessOrderPage";
import OrderHistoryItem from "../../components/ui/OrderHistoryItem";
import ProductList from "../../components/ui/ProductList";

Enzyme.configure({ adapter: new Adapter() });


jest.mock('moment', () => () => ({format: () => '2018–01–30T12:34:56+00:00'}));
jest.mock('moment', () => () => ({format: () => '2018–01–30T12:34:56+00:00'}));

describe('<OrderHistoryItem/> spec', () => {


    function setup(prop) {
        const props = {
            item: {

                order_items: [],
                created_at: new Date(),
                ...prop
            }
        };
        const wrapper = shallow(<OrderHistoryItem {...props} />);
        return {
            props,  wrapper
        }
    }



    it('renders the component', () => {

        const {wrapper} = setup({order_items: null})

        expect(wrapper.firstChild).toMatchSnapshot();
    });

    it('renders the component', () => {

        const {wrapper} = setup({order_items: [1, 2]});

        expect(wrapper.find('CartItem').length).toBe(2);
    });

    it('renders the component', () => {
        const spy = jest.spyOn(console, 'error');

        const wrapper = shallow(<OrderHistoryItem />);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('renders the component', () => {
        const prop = {
            id:1,
            user_id:1,
            currency:"euro",
            created_at:"2019-12-29 14:29:44",
            updated_at:"2019-12-29 14:29:44",
            orders_items: [{
                id:1,
                menu_id:2,
                quantity:2,
                price:"7.00",
                created_at:"2019-12-29 14:29:44",
                updated_at:"2019-12-29 14:29:44",
                order_id:1,
                menu: {
                    id:2,
                    name:"Prof. Sylvan Mertz MD",
                    price:7,
                    picture:"https://lorempixel.com/640/480/?93343",
                    created_at:"2019-12-29 14:27:07",
                    updated_at:"2019-12-29 14:27:07",
                }


            }]
        }

        const {wrapper} = setup({...prop});

        console.log(wrapper.find('#total').text())
        expect(wrapper.find('#total').text().includes('€')).toBeTruthy();
        // expect(wrapper.find('#total').text().includes('14')).toBeTruthy();
    });


    it('renders the component', () => {
        const prop = {
            id:1,
            user_id:1,
            currency:"dollar",
            created_at:"2019-12-29 14:29:44",
            updated_at:"2019-12-29 14:29:44",
            orders_items: [{
                id:1,
                menu_id:2,
                quantity:2,
                price:"7.00",
                created_at:"2019-12-29 14:29:44",
                updated_at:"2019-12-29 14:29:44",
                order_id:1,
                menu: {
                    id:2,
                    name:"Prof. Sylvan Mertz MD",
                    price:7,
                    picture:"https://lorempixel.com/640/480/?93343",
                    created_at:"2019-12-29 14:27:07",
                    updated_at:"2019-12-29 14:27:07",
                }


            }]
        }

        const {wrapper} = setup({...prop});

        console.log(wrapper.find('#total').text())
        expect(wrapper.find('#total').text().includes('$')).toBeTruthy();
        // expect(wrapper.find('#total').text().includes('14')).toBeTruthy();
    });

});