import React from 'react';
import firebase from "../firebase/firebase";
import {Table} from 'reactstrap';
import {ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Grid, Row, Col} from 'react-bootstrap';
import {
    ProgressBar,
    Button,
    Form,
    FormGroup,
    Label,
    FormControl,
    Radio,
    ControlLabel,
    Well,
    Panel,
    Modal,
    Alert,
    Image,
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import * as routes from "../constants/routes";
import item from "../components/item";


export default class reviewAndConfirmation extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <p>This is confirmation</p>
        )
    }

}