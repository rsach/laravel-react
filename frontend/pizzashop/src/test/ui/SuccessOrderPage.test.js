import React from 'react';
import { render } from '@testing-library/react';
import Login from "../../components/ui/Login";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Register from "../../components/ui/Register";
import SuccessOrder from "../../components/ui/SuccessOrderPage";

Enzyme.configure({ adapter: new Adapter() });


describe('<SuccessOrder/> spec', () => {


    function setup() {
        const props = {
            onSignUp: jest.fn()
        };
        const wrapper = shallow(<SuccessOrder {...props} />);
        return {
            props,  wrapper
        }
    }



    it('renders the component', () => {
        const {wrapper} = setup();
        expect(wrapper.firstChild).toMatchSnapshot();
    });



});