import React, {Component} from 'react';
import Api from "../../../Api/Api.json";
import { getFromStorage } from '../../../utils/storage';
import axios from 'axios';
import { Col, FormGroup, Form, Alert } from 'react-bootstrap';
import { refreshToken } from '../../../PrivateRoute/isLogin';
import { getHeaders } from '../../../utils/headers';

const url = Api.BASE_URL + Api.ACCOUNT_SECURITY_SETTINGS;
const sm = 12;

export default class SecuritySettings extends Component {
    state = {
        two_factor_authentication: false,
        error: ""
    }

    whenChangeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }

    updateSecuritySettings = () => {
        refreshToken();
        const headers = getHeaders();

        const data = {
            two_factor_authentication: !this.state.two_factor_authentication
        }

        axios
        .patch(url, data, headers)
        .then(res => {
            this.setState({
                two_factor_authentication: res.data.two_factor_authentication,
                error: ""
            })
        })
        .catch(err => {
            this.setState({error: "Something went wrong!"})
        })
    }

    fetchSecuritySettings = () => {
        const headers = getHeaders();

        axios
        .get(url, headers)
        .then(res => {
            this.setState({
                two_factor_authentication: res.data.two_factor_authentication,
                error: ""
            })
        })
        .catch(err => {
            this.setState({error: "Something went wrong!"})
        })
    }

    componentDidMount(){
        if(getFromStorage("user")) {
            this.fetchSecuritySettings();
        }
    }

    render() {
        return (
            <div className="privacy-settings">
                {
                    this.state.error.length > 0 && 
                    <Alert variant="danger" style={{fontSize: "12px"}}>
                        {this.state.error}
                    </Alert>
                }
                <FormGroup as={Col} sm={sm} controlId="two_factor_authentication" bssize="large" style={{marginLeft: "3px"}}>
                    <Form.Check 
                        custom
                        type="switch"
                        id="two_factor_authentication"
                        checked={this.state.two_factor_authentication}
                        value={this.state.two_factor_authentication}
                        label={`Two Factor Authentication`}
                        onChange={this.updateSecuritySettings}
                    />
                </FormGroup>
            </div>
        )
    }
}