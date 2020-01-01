import React from 'react';
import { render } from '@testing-library/react';
import Login from "../components/ui/Login";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Register from "../components/ui/Register";
import ProductList from "../components/ui/ProductList";
import PropTypes from "prop-types";
import P, {PrivateRoute} from '../guardedRoute';
import {MemoryRouter, Route} from "react-router";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";


jest.mock('')
Enzyme.configure({ adapter: new Adapter() });

const localStorageMock = (() => {
    let store = {};

    return {
        getItem(key) {
            return store[key] || null;
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        removeItem(key) {
            delete store[key];
        },
        clear() {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});


Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});



const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<PrivateRoute/> spec', () => {


    function setup(prop) {
        const props = {
            children: () => <div id="success">gh</div>,
            auth_guard: false,
            ...prop
        };
        const store = mockStore({});

        const wrapper = shallow(

                <PrivateRoute {...props} />

    );
        return {
            props,  wrapper, store
        }
    }







    it('renders the component', () => {
        const {wrapper} = setup();
        expect(wrapper.firstChild).toMatchSnapshot();
    });

    it('renders the component', () => {

        const {wrapper} = setup({path: '/'});
        expect(wrapper.find(Route).prop('path')).toBe('/');
    });


    it('renders the component', () => {

        const { wrapper, props } = setup({ auth_guard: true });
        const ComponentToRender = wrapper.prop('render');
        const componentWrapper = shallow(<ComponentToRender location="/scarif" />);
        expect(componentWrapper.find('#success').length).toBe(1);

    });

    it('renders the component', () => {

        const { wrapper, props } = setup({ auth_guard: false });
        const ComponentToRender = wrapper.prop('render');
        const componentWrapper = shallow(<ComponentToRender location="/scarif" />);
        expect(componentWrapper.find('#fail').length).toBe(1);

    });

    it('renders the component', () => {

        let { wrapper, props, store } = setup({ auth_guard: true });
        wrapper = shallow(
            <Provider store={store}>
                <P  {...props}></P>
            </Provider>
        );

        expect(wrapper.firstChild).toMatchSnapshot();



    });





});