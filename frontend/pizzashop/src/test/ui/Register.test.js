import React from 'react';
import { render } from '@testing-library/react';
import Login from "../../components/ui/Login";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Register from "../../components/ui/Register";

Enzyme.configure({ adapter: new Adapter() });


describe('<Register/> spec', () => {

    let wrapper, props;
    beforeEach(() => {
        const ui = setup();
        wrapper = ui.wrapper;
        props = ui.props
    });
    function setup() {
        const props = {
            onSignUp: jest.fn()
        };
        const wrapper = shallow(<Register {...props} />);
        return {
            props,  wrapper
        }
    }



    it('renders the component', () => {
        expect(wrapper.firstChild).toMatchSnapshot();
    });

    it('simulate login submission', () => {
        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'abc@gmail.com'}}, 'abc@gmail.com');
        wrapper.find('#name').simulate('change', {target: {name: 'name', value: 'abc'}}, 'abc');
        wrapper.find('#password').simulate('change', {target: {name: 'password', value: '12345678'}}, '12345678');
        wrapper.find('#register').simulate('click', {preventDefault: jest.fn});
        expect(props.onSignUp).toHaveBeenCalledWith({email: 'abc@gmail.com', password: '12345678', name: 'abc'})
    });

    it('simulate register click', () => {


        const spy = jest.spyOn(Register.prototype, "handleRedirect");
        const wrapper = setup().wrapper;



        wrapper.find('#login').simulate('click', {preventDefault: jest.fn});
        expect(spy).toBeCalled()
    });

    it('simulate register click', () => {



        const wrapper = shallow(<Register  />);

        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'abc@gmail.com'}});
        wrapper.find('#name').simulate('change', {target: {name: 'name', value: 'abc'}});
        wrapper.find('#password').simulate('change', {target: {name: 'password', value: '12345678'}});
        wrapper.find('#register').simulate('click', {preventDefault: jest.fn});
        expect(props.onSignUp).toBeDefined()
    });


    it('simulate register click', () => {



        const {wrapper} = setup();

        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'abc@gmail.com'}});
        wrapper.find('#name').simulate('change', {target: {name: 'name', value: 'abc'}});
        wrapper.find('#register').simulate('click', {preventDefault: jest.fn});
        expect(props.onSignUp).toHaveBeenCalledTimes(0)
    });

});