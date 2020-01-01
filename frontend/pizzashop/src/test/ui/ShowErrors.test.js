import React from 'react';
import { render } from '@testing-library/react';
import Login from "../../components/ui/Login";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Register from "../../components/ui/Register";
import ShowErrors from "../../components/ui/ShowErrors";

Enzyme.configure({ adapter: new Adapter() });


describe('<ShowErrors/> spec', () => {


    function setup() {
        const props = {
            onClearError: jest.fn(),
            errors: ['Error']
        };
        const wrapper = shallow(<ShowErrors {...props} />);
        return {
            props,  wrapper
        }
    }



    it('renders the component', () => {
        const {wrapper} = setup();
        expect(wrapper.firstChild).toMatchSnapshot();
    });



});