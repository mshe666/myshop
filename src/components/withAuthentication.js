import React from 'react';

import AuthUserContext from './AuthUserContext';
import firebase from '../firebase/firebase';
import { withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';

const withAuthentication = (Component) =>
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authUser: null,
            };
        }

        componentDidMount() {
            firebase.auth().onAuthStateChanged(authUser => {
                authUser
                    ? this.setState({ authUser: authUser})
                    : this.setState({ authUser: null });
            });
        }

        render() {
            const { authUser } = this.state;

            console.log("withuthentication.js authUser = " + authUser);

            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component />
                </AuthUserContext.Provider>
            );
        }
    }

export default withAuthentication;