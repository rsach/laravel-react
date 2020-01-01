import React from 'react';
import { render } from '@testing-library/react';
import Login from "../../components/ui/Login";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Register from "../../components/ui/Register";

Enzyme.configure({ adapter: new Adapter() });







describe('<Login/> spec', () => {


    function setup() {
        const props = {
            onLogin: jest.fn()
        };
        const wrapper = shallow(<Login {...props} />);
        return {
            props,  wrapper
        }
    }
    let wrapper, props;
    beforeEach(() => {
        let ui = setup();
         wrapper = ui.wrapper;
         props = ui.props

    });

    it('renders the component', () => {
        expect(wrapper.firstChild).toMatchSnapshot();
    });

    it('simulate login submission', () => {
        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'abc@gmail.com'}}, 'abc@gmail.com');
        wrapper.find('#password').simulate('change', {target: {name: 'password', value: '12345678'}}, '12345678');
        wrapper.find('#login').simulate('click', {preventDefault: jest.fn});
        expect(props.onLogin).toHaveBeenCalledWith({email: 'abc@gmail.com', password: '12345678'})
    });

    it('simulate login fail', () => {
        wrapper.find('#email').simulate('change', {target: {name: 'email', value: ''}}, '');
        wrapper.find('#password').simulate('change', {target: {name: 'password', value: ''}}, '');
        wrapper.find('#login').simulate('click', {preventDefault: jest.fn});
        expect(props.onLogin).toHaveBeenCalledTimes(0)
    });

    it('simulate register click', () => {


        const spy = jest.spyOn(Login.prototype, "handleRedirect");
        const wrapper = setup().wrapper;



        wrapper.find('#register').simulate('click', {preventDefault: jest.fn});
        expect(spy).toBeCalled()
    });

    it('simulate login click', () => {



        const wrapper = shallow(<Login  />);

        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'abc@gmail.com'}});
        wrapper.find('#password').simulate('change', {target: {name: 'password', value: '12345678'}});
        wrapper.find('#login').simulate('click', {preventDefault: jest.fn});
        expect(props.onLogin).toBeDefined()
    });







});