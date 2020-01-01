import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {mount, shallow} from 'enzyme';
import { MemoryRouter } from 'react-router';
import PrivateRoute from "../../guardedRoute";
import routes from "../../routes";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });


jest.mock('../../components/containers/Login', () => () => <div id="login"></div>);
jest.mock('../../components/containers/Register', () => () => <div id="register"></div>);
jest.mock('../../components/containers/ProductList', () => () => <div id="product-list"></div>);
jest.mock('../../components/containers/cart', () => () => <div id="cart"></div>);
jest.mock('../../components/containers/OrderHistory', () => () => <div id="order-history"></div>);
jest.mock('../../components/containers/Product', () => () => <div id="product"></div>);
jest.mock('../../components/containers/ShowErrors', () => () => <div id="show-errors"></div>);
jest.mock('../../guardedRoute', () => () => <div id="guarded-routes"></div>);


describe('<PrivateRoute/> spec', () => {


    function setup() {
        const props = {
            children: 'test',
            rest: {path: '/' , location: '/'}
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/random' ]}>
                {routes}
            </MemoryRouter>
        );
        return {
            props,  wrapper
        }
    }



    it('renders the component', () => {
        const {wrapper} = setup();
        expect(wrapper.firstChild).toMatchSnapshot();
    });











});