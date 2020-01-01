import React from 'react';
import {fireEvent, render} from '@testing-library/react';


import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import Register from "../../components/containers/Register";
import thunk from 'redux-thunk'
import fetchMock from "fetch-mock";
import C from "../../constant";
import {register} from "../../actions";
import Enzyme, {shallow }from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);



describe('<Register/> spec', () => {


    function setup() {
        const props = {

        };
        const store = mockStore({});
        const enzymeWrapper = render(
            <Provider store={store}>
                    <Register  {...props} />


            </Provider>
        );
        return {
            props,
            enzymeWrapper,
            store
        }
    }
    beforeEach(() => {

    });

    it('renders the component', () => {
        const {enzymeWrapper} = setup();
        expect(enzymeWrapper.firstChild).toMatchSnapshot();
    });

    it('simulate register submission', () => {



        let {enzymeWrapper, props, store} = setup();



        const registerButton = (enzymeWrapper.container.querySelector(('#register')));
        fireEvent.change(enzymeWrapper.container.querySelector(('#name')), { target: { value: 'a' } })
        fireEvent.change(enzymeWrapper.container.querySelector(('#email')), { target: { value: 'a' } })
        fireEvent.change(enzymeWrapper.container.querySelector(('#password')), { target: { value: 'a' } })
        fireEvent.click(registerButton, { preventDefault: () => { } });
        expect(registerButton).toBeTruthy()


    });
});


