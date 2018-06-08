import React from 'react';

import firebase from '../firebase/firebase';
import {Button} from 'reactstrap';


export default class SignOutButton extends React.Component {

    constructor(props) {
        super(props);

        this._signOut = this._signOut.bind(this);
    }

    _signOut = () => {
        firebase.auth().signOut();
    };



    render() {
        return (
            <Button color={"primary"} onClick={this._signOut}>
                Sign Out
            </Button>
        );
    }
}



