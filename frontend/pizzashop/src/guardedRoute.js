import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Menu from "./components/ui/Menu";
import {connect} from "react-redux";


export const PrivateRoute = ({ children, auth_guard, ...rest }) => {

    console.log(auth_guard);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth_guard ? (
                    <div id="success">
                        {children}
                        <Menu/>

                    </div>

                ) : (
                    <Redirect
                        id="fail"
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

const mapStateToProps = (state,props) => ({auth_guard: state.isAuthenticated, children: props.children, rest: props.rest});

const mapDispatchToProps = dispatch => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)