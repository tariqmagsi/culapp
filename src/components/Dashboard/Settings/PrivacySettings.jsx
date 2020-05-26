import React, {Component} from 'react';
import Api from "../../../Api/Api.json";
import { getFromStorage } from '../../../utils/storage';
import axios from 'axios';
import { Col, FormGroup, Form, Accordion, Card, Table, Alert } from 'react-bootstrap';
import { getHeaders } from '../../../utils/headers';

const url = Api.BASE_URL + Api.ACCOUNT_PRIVACY_SETTINGS;
const sm = 12;
const color = "#229a88";

export default class PrivacySettings extends Component {
    state = {
        private_profile: false,
        privacy: "",
        hidden_users: [],
        hidden_universities: [],
        hidden_organization: [],
        blocked_users: [],
        blocked_universities: [],
        blocked_organization: [],
        privacies: ["Everyone", "College Students", "Your University", "Your Campus", "No One", "Followers Only"],
        error: "",
        isLoading: true
    }

    whenChangeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value}, () => {
            this.updatePrivacySettings("")
        })
    }

    updatePrivacySettings = (name) => {
        const headers = getHeaders();
        const data = {
            private_profile: name === "private_profile" ? !this.state.private_profile : this.state.private_profile,
            privacy: parseInt(this.state.privacy),
            hidden_users: this.state.hidden_users,
            hidden_universities: this.state.hidden_universities,
            hidden_organization: this.state.hidden_organization,
            blocked_users: this.state.blocked_users,
            blocked_universities: this.state.blocked_universities,
            blocked_organization: this.state.blocked_organization,
        }

        axios
        .patch(url, data, headers)
        .then(res => {
            this.setState({
                private_profile: res.data.private_profile,
                privacy: res.data.privacy.toString(),
                hidden_users: res.data.hidden_users,
                hidden_universities: res.data.hidden_universities,
                hidden_organization: res.data.hidden_organization,
                blocked_users: res.data.blocked_users,
                blocked_universities: res.data.blocked_universities,
                blocked_organization: res.data.blocked_organization,
                error: ""
            })
        })
        .catch(err => {
            this.setState({error: "Something went wrong!"})
        })
    }

    fetchPrivacySettings = () => {
        const headers = getHeaders();

        axios
        .get(url, headers)
        .then(res => {
            this.setState({
                private_profile: res.data.private_profile,
                privacy: res.data.privacy.toString(),
                hidden_users: res.data.hidden_users,
                hidden_universities: res.data.hidden_universities,
                hidden_organization: res.data.hidden_organization,
                blocked_users: res.data.blocked_users,
                blocked_universities: res.data.blocked_universities,
                blocked_organization: res.data.blocked_organization,
                error: "",
                isLoading: false
            })
        })
        .catch(err => {
            this.setState({isLoading: false, error: "Something went wrong!"})
        })
    }

    componentDidMount(){
        if(getFromStorage("user")) {
            this.fetchPrivacySettings();
        } else {
            this.setState({isLoading: false})
        }
    }

    render() {
        if(this.state.isLoading) {
            return <h1 style={{textAlign: "center", color}}>Loading...</h1>
        }

        return (
            <div className="privacy-settings">
                {
                    this.state.error.length > 0 && 
                    <Alert variant="danger" style={{fontSize: "12px"}}>
                        {this.state.error}
                    </Alert>
                }
                <FormGroup as={Col} sm={sm} bssize="large" style={{marginLeft: "3px"}}>
                    <Form.Check 
                        custom
                        type="switch"
                        id="private_profile"
                        checked={this.state.private_profile}
                        value={this.state.private_profile}
                        label={`Private Profile`}
                        onChange={() => this.updatePrivacySettings("private_profile")}
                    />
                </FormGroup>
                <FormGroup as={Col} sm={sm} bssize="large" style={{marginLeft: "3px"}}>
                    <Form.Control 
                        as="select"
                        id="privacy"
                        name="privacy"
                        value={this.state.privacy}
                        label={`Privacy`}
                        onChange={this.whenChangeHandler}
                    >
                        {["Everyone", "College Students", "Your University", "Your Campus", "No One", "Followers Only"].map((item, i) => 
                            <option value={i} key={item}>{item}</option>
                        )}
                    </Form.Control>
                </FormGroup>
                <FormGroup as={Col} sm={sm} bssize="large" style={{marginLeft: "3px"}}>
                    <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0" style={{cursor: "pointer"}}>
                                Hidden Users
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Table striped borderless size="sm">
                                    <tbody>
                                        {this.state.hidden_users.map((item, i) => 
                                            <tr key={i}>
                                                <td>{item}</td>
                                                {/* <td align="right">
                                                    <Button size="sm" variant="outline-danger">
                                                        Unhide
                                                    </Button>
                                                </td> */}
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1" style={{cursor: "pointer"}}>
                                Hidden Universites
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Table striped borderless size="sm">
                                    <tbody>
                                        {this.state.hidden_universities.map((item, i) => 
                                            <tr key={i}>
                                                <td>{item}</td>
                                                {/* <td align="right">
                                                    <Button size="sm" variant="outline-danger">
                                                        Unhide
                                                    </Button>
                                                </td> */}
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2" style={{cursor: "pointer"}}>
                                Hidden Organizations
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <Table striped borderless size="sm">
                                    <tbody>
                                        {this.state.hidden_organization.map((item, i) => 
                                            <tr key={i}>
                                                <td>{item}</td>
                                                {/* <td align="right">
                                                    <Button size="sm" variant="outline-danger">
                                                        Unhide
                                                    </Button>
                                                </td> */}
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3" style={{cursor: "pointer"}}>
                                Blocked Users
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <Table striped borderless size="sm">
                                    <tbody>
                                        {this.state.blocked_users.map((item, i) => 
                                            <tr key={i}>
                                                <td>{item}</td>
                                                {/* <td align="right">
                                                    <Button size="sm" variant="outline-danger">
                                                        Unhide
                                                    </Button>
                                                </td> */}
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="4" style={{cursor: "pointer"}}>
                                Blocked Universites
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                            <Card.Body>
                                <Table striped borderless size="sm">
                                    <tbody>
                                        {this.state.blocked_universities.map((item, i) => 
                                            <tr key={i}>
                                                <td>{item}</td>
                                                {/* <td align="right">
                                                    <Button size="sm" variant="outline-danger">
                                                        Unhide
                                                    </Button>
                                                </td> */}
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="5" style={{cursor: "pointer"}}>
                                Blocked Organizations
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="5">
                            <Card.Body>
                                <Table striped borderless size="sm">
                                    <tbody>
                                        {this.state.blocked_organization.map((item, i) => 
                                            <tr key={i}>
                                                <td>{item}</td>
                                                {/* <td align="right">
                                                    <Button size="sm" variant="outline-danger">
                                                        Unhide
                                                    </Button>
                                                </td> */}
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </FormGroup>
            </div>
        )
    }
}