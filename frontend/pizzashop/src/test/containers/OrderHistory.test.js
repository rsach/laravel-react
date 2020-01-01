import React from 'react';
import { render } from '@testing-library/react';
import Login from "../../components/containers/Login";

import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import OrderHistory from "../../components/containers/OrderHistory";
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);



describe('<OrderHistory/> spec', () => {


    function setup() {
        const props = {
            fetchOrderHistory: () => () =>jest.fn(),
            orderHistory: []
        };
        const store = mockStore({});
        const enzymeWrapper = render(
            <Provider store={store}>
                <OrderHistory  {...props} />

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
    })
});


