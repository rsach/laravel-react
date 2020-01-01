import React, {Component} from 'react';

import PropTypes from "prop-types";


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';


import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import history from "../../history";


class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                email: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleChange(newValue) {
        // const { name, value } = event;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                ...newValue
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const {onSignUp=f=>f} = this.props;

        if (user.name && user.email && user.password) {

            onSignUp(user);
        }
    }

    handleRedirect(e) {
        e.preventDefault();
        history.push('/login')
    }

    render() {

        // const { user, submitted } = this.state;
        return (
            <div>
                <MuiThemeProvider>
                <div>
                    <AppBar
                        title="Register"
                    />
                    <div className="flex  flex-center">
                        <div className="form flex flex-column">

                                <TextField
                                    id="name"
                                    variant="outlined"

                                placeholder="Enter your Name"
                                label="Name"
                                onChange = {(event) => this.handleChange({name: event.target.value})}
                            />


                            <br/>
                            <TextField
                                id="email"
                                placeholder="Enter your Email"
                                type="email"
                                variant="outlined"

                                label="Email"
                                onChange = {(event) => this.handleChange({email: event.target.value})}
                            />
                            <br/>
                            <TextField
                                id="password"
                                type = "password"
                                variant="outlined"

                                placeholder="Enter your Password"
                                label="Password"
                                onChange = {(event) => this.handleChange({password: event.target.value})}
                            />
                            <br/>
                            <div className="flex button-margin flex-space-between">
                                <Button id="register" label="Register" variant="contained"  color="primary"  onClick={(event) => this.handleSubmit(event)}> Register </Button>


                                    <Button id="login" variant="contained" label="Login" color="secondary" onClick={(e) => this.handleRedirect(e)}    >

                                        Login
                                    </Button>



                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
            </div>
        );
    }
}


Register.propTypes = {
    onSignUp: PropTypes.func,
};

export default Register
