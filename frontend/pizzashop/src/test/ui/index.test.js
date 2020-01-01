import React from 'react';
import { render } from '@testing-library/react';
import Login from "../../components/ui/Login";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Register from "../../components/ui/Register";
import SuccessOrder from "../../components/ui/SuccessOrderPage";
import Menu from "../../components/ui/Menu";
import {App, Whoops404} from "../../components";

Enzyme.configure({ adapter: new Adapter() });


describe('<App/> spec', () => {


    function setup() {
        const props = {
            children: 'test'
        };
        const wrapper = shallow(<App  />);
        return {
            props,  wrapper
        }
    }



    it('renders the component', () => {
        const {wrapper} = setup();
        expect(wrapper.firstChild).toMatchSnapshot();
    });



});


describe('<Whoops404/> spec', () => {

    // const { location } = window;
    //
    // beforeAll(() => {
    //     delete window.location;
    //     window.location = { reload: 'test' };
    //
    // });
    //
    // afterAll(() => {
    //     window.location = location;
    // });
    function setup() {
        const props = {

            location: {pathname: 'test'}
        };
        const wrapper = shallow(<Whoops404 {...props} />);
        return {
            props,  wrapper
        }
    }



    it('renders the component', () => {
        const {wrapper} = setup();
        expect(wrapper.firstChild).toMatchSnapshot();
    });



});