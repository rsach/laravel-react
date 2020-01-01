import React, {Component} from 'react';
import PropTypes from "prop-types";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import AppBar from '@material-ui/core/AppBar';



import history from "../../history";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class Login extends Component {
    constructor(props) {
        super(props);

        // reset login status


        this.state = {
            email: '',
            password: '',
            submitted: false
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }




    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const {onLogin=f=>f} = this.props;

        if (email && password) {

            onLogin({email, password});
        }
    }

    handleRedirect(e) {
        e.preventDefault();
        history.push('/register')
    }

    render() {


        return (

            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <div className="flex  flex-center">
                            <div className="form flex flex-column flex-center">


                                <TextField
                                    id="email"
                                    data-testid="email"
                                    variant="outlined"
                                    placeholder="Enter your Email"
                                    label="Email"
                                    onChange = {(event) => this.setState({email:event.target.value})}
                                />
                                <br/>
                                <TextField
                                    data-testid="password"

                                    id="password"
                                    variant="outlined"
                                    type="password"
                                    placeholder="Enter your Password"
                                    label="Password"
                                    onChange = {(event) => this.setState({password:event.target.value})}
                                />
                                <br/>
                                <div className="flex button-margin flex-space-between">
                                    <Button                    id="login"                 data-testid="login"
                                                                                variant="contained" color="primary"  onClick={(event) => this.handleSubmit(event)}>Login</Button>

                                        <Button id="register" variant="contained"        data-testid="register"
                                                onClick={(e) => this.handleRedirect(e)}  color="secondary"    >
                                            Register
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


Login.propTypes = {
    onLogin: PropTypes.func.isRequired
};

export default Login

