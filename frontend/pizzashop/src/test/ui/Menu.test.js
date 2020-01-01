import React from 'react';
import { render } from '@testing-library/react';
import Login from "../../components/ui/Login";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Register from "../../components/ui/Register";
import SuccessOrder from "../../components/ui/SuccessOrderPage";
import Menu from "../../components/ui/Menu";

Enzyme.configure({ adapter: new Adapter() });


describe('<Menu/> spec', () => {


    function setup() {
        const props = {
            onSignUp: jest.fn()
        };
        const wrapper = shallow(<Menu  />);
        return {
            props,  wrapper
        }
    }



    it('renders the component', () => {
        const {wrapper} = setup();
        expect(wrapper.firstChild).toMatchSnapshot();
    });



});