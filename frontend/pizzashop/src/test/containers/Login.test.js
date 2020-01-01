import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import Login from "../../components/containers/Login";

import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'



const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);



describe('<Login/> spec', () => {


    function setup() {
        const props = {
            onLogin: jest.fn()
        };
        const store = mockStore({});
        const enzymeWrapper = render(
            <Provider store={store}>
                <Login  {...props} />

            </Provider>
    );
        return {
            props,
            enzymeWrapper
        }
    }
    beforeEach(() => {

    });

    it('renders the component', () => {
        const ui = setup();
        expect(ui.firstChild).toMatchSnapshot();
    });

    it('simulate login submission', () => {



        let {enzymeWrapper, props, store} = setup();



        const loginButton = (enzymeWrapper.container.querySelector(('#login')));
        fireEvent.change(enzymeWrapper.container.querySelector(('#email')), { target: { value: 'a' } });
        fireEvent.change(enzymeWrapper.container.querySelector(('#password')), { target: { value: 'a' } });
        fireEvent.click(loginButton, { preventDefault: () => { } });
        expect(loginButton).toBeTruthy()


    });
});


