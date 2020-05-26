import React, {Component} from 'react';
import Api from "../../../Api/Api.json";
import { getFromStorage } from '../../../utils/storage';
import axios from 'axios';
import { Col, FormGroup, Form, Alert } from 'react-bootstrap';
import { refreshToken } from '../../../PrivateRoute/isLogin';
import { getHeaders } from '../../../utils/headers';

const url = Api.BASE_URL + Api.ACCOUNT_NOTIFICATION_SETTINGS;
const sm = 5;

export default class NotificationSettings extends Component {
    state = {
        business_mass_notification: false,
        comments: false,
        created_events: false,
        direct_messages: false,
        event_update: false,
        follow_requests: false,
        group_messages: false,
        invitations: false,
        mentions: false,
        new_messages: false,
        organization_mass_notification: false,
        people_to_meet: false,
        people_you_may_know: false,
        receive_emails: false,
        receive_push_notifications: false,
        receive_texts: false,
        suggested_events: false,
        university_mass_notification: false,
        upcoming_events: false,
        user_mass_notification: false,
        error: "",
        isLoading: true,
    }



    fetchNotificationSettings = () => {
        const headers = getHeaders();

        axios
        .get(url, headers)
        .then(res => {
            this.setState({
                business_mass_notification: res.data.business_mass_notification,
                comments: res.data.comments,
                created_events: res.data.created_events,
                direct_messages: res.data.direct_messages,
                event_update: res.data.event_update,
                follow_requests: res.data.follow_requests,
                group_messages: res.data.group_messages,
                invitations: res.data.invitations,
                mentions: res.data.mentions,
                new_messages: res.data.new_messages,
                organization_mass_notification: res.data.organization_mass_notification,
                people_to_meet: res.data.people_to_meet,
                people_you_may_know: res.data.people_you_may_know,
                receive_emails: res.data.receive_emails,
                receive_push_notifications: res.data.receive_push_notifications,
                receive_texts: res.data.receive_texts,
                suggested_events: res.data.suggested_events,
                university_mass_notification: res.data.university_mass_notification,
                upcoming_events: res.data.upcoming_events,
                user_mass_notification: res.data.user_mass_notification,
                isLoading: false,
                error: ""
            })
        })
        .catch(err => {
           this.setState({isLoading: true, error: "Something Went Wrong"})
        })
    }

    updateNotificationSettings = (name) => {
        refreshToken();
        const data = {
            business_mass_notification: name === "business_mass_notification" ? !this.state.business_mass_notification : this.state.business_mass_notification,
            comments:  name === "comments" ? !this.state.comments : this.state.comments,
            created_events: name === "created_events" ? !this.state.created_events : this.state.created_events,
            direct_messages: name === "direct_messages" ? !this.state.direct_messages : this.state.direct_messages,
            event_update: name === "event_update" ? !this.state.event_update : this.state.event_update,
            follow_requests: name === "follow_requests" ? !this.state.follow_requests : this.state.follow_requests,
            group_messages: name === "group_messages" ? !this.state.group_messages : this.state.group_messages,
            invitations: name === "invitations" ? !this.state.invitations : this.state.invitations,
            mentions: name === "mentions" ? !this.state.mentions : this.state.mentions,
            new_messages: name === "new_messages" ? !this.state.new_messages : this.state.new_messages,
            organization_mass_notification: name === "organization_mass_notification" ? !this.state.organization_mass_notification : this.state.organization_mass_notification,
            people_to_meet: name === "people_to_meet" ? !this.state.people_to_meet : this.state.people_to_meet,
            people_you_may_know: name === "people_you_may_know" ? !this.state.people_you_may_know : this.state.people_you_may_know,
            receive_emails: name === "receive_emails" ? !this.state.receive_emails : this.state.receive_emails,
            receive_push_notifications: name === "receive_push_notifications" ? !this.state.receive_push_notifications : this.state.receive_push_notifications,
            receive_texts: name === "receive_texts" ? !this.state.receive_texts : this.state.receive_texts,
            suggested_events: name === "suggested_events" ? !this.state.suggested_events : this.state.suggested_events,
            university_mass_notification: name === "university_mass_notification" ? !this.state.university_mass_notification : this.state.university_mass_notification,
            upcoming_events: name === "upcoming_events" ? !this.state.upcoming_events : this.state.upcoming_events,
            user_mass_notification: name === "user_mass_notification" ? !this.state.user_mass_notification : this.state.user_mass_notification,
        }

        const headers = getHeaders();

        axios
        .patch(url, data, headers)
        .then(res => {
            this.setState({
                business_mass_notification: res.data.business_mass_notification,
                comments: res.data.comments,
                created_events: res.data.created_events,
                direct_messages: res.data.direct_messages,
                event_update: res.data.event_update,
                follow_requests: res.data.follow_requests,
                group_messages: res.data.group_messages,
                invitations: res.data.invitations,
                mentions: res.data.mentions,
                new_messages: res.data.new_messages,
                organization_mass_notification: res.data.organization_mass_notification,
                people_to_meet: res.data.people_to_meet,
                people_you_may_know: res.data.people_you_may_know,
                receive_emails: res.data.receive_emails,
                receive_push_notifications: res.data.receive_push_notifications,
                receive_texts: res.data.receive_texts,
                suggested_events: res.data.suggested_events,
                university_mass_notification: res.data.university_mass_notification,
                upcoming_events: res.data.upcoming_events,
                user_mass_notification: res.data.user_mass_notification,
                isLoading: false,
                error: ""
            })
        })
        .catch(err => {
            this.setState({isLoading: false, error: "Something Went Wrong"})
        })
    }

    componentDidMount(){
        if(getFromStorage("user")) {
            this.fetchNotificationSettings();
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.error.length > 0 && 
                    <Alert variant="danger" style={{fontSize: "12px"}}>
                        {this.state.error}
                    </Alert>
                }
                <Form.Row>
                    <FormGroup as={Col} sm={sm} controlId="business_mass_notification" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="business_mass_notification"
                            checked={this.state.business_mass_notification}
                            value={this.state.business_mass_notification}
                            label={`Business Mass Notification`}
                            onChange={() => this.updateNotificationSettings("business_mass_notification")}
                        />
                    </FormGroup>
                    <FormGroup as={Col} sm={sm} controlId="comments" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="comments"
                            checked={this.state.comments}
                            value={this.state.comments}
                            label={`Comments`}
                            onChange={() => this.updateNotificationSettings("comments")}
                        />
                    </FormGroup>
                </Form.Row>
                <Form.Row>
                    <FormGroup as={Col} sm={sm} controlId="created_events" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="created_events"
                            checked={this.state.created_events}
                            value={this.state.created_events}
                            label={`Created Events`}
                            onChange={() => this.updateNotificationSettings("created_events")}
                        />
                    </FormGroup>
                    <FormGroup as={Col} sm={sm} controlId="direct_messages" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="direct_messages"
                            checked={this.state.direct_messages}
                            value={this.state.direct_messages}
                            label={`Direct Messages`}
                            onChange={() => this.updateNotificationSettings("direct_messages")}
                        />
                    </FormGroup>
                </Form.Row>
                <Form.Row>
                    <FormGroup as={Col} sm={sm} controlId="event_update" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="event_update"
                            checked={this.state.event_update}
                            value={this.state.event_update}
                            label={`Event Update`}
                            onChange={() => this.updateNotificationSettings("event_update")}
                        />
                    </FormGroup>
                    <FormGroup as={Col} sm={sm} controlId="follow_requests" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="follow_requests"
                            checked={this.state.follow_requests}
                            value={this.state.follow_requests}
                            label={`Follow Requests`}
                            onChange={() => this.updateNotificationSettings("follow_requests")}
                        />
                    </FormGroup>
                </Form.Row>
                <Form.Row>
                    <FormGroup as={Col} sm={sm} controlId="group_messages" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="group_messages"
                            checked={this.state.group_messages}
                            value={this.state.group_messages}
                            label={`Group Messages`}
                            onChange={() => this.updateNotificationSettings("group_messages")}
                        />
                    </FormGroup>
                    <FormGroup as={Col} sm={sm} controlId="invitations" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="invitations"
                            checked={this.state.invitations}
                            value={this.state.invitations}
                            label={`Invitations`}
                            onChange={() => this.updateNotificationSettings("invitations")}
                        />
                    </FormGroup>
                </Form.Row>
                <Form.Row>
                    <FormGroup as={Col} sm={sm} controlId="mentions" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="mentions"
                            checked={this.state.mentions}
                            value={this.state.mentions}
                            label={`Mentions`}
                            onChange={() => this.updateNotificationSettings("mentions")}
                        />
                    </FormGroup>
                    <FormGroup as={Col} sm={sm} controlId="new_messages" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="new_messages"
                            checked={this.state.new_messages}
                            value={this.state.new_messages}
                            label={`New Messages`}
                            onChange={() => this.updateNotificationSettings("new_messages")}
                        />
                    </FormGroup>
                </Form.Row>
                <Form.Row>
                    <FormGroup as={Col} sm={sm} controlId="organization_mass_notification" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="organization_mass_notification"
                            checked={this.state.organization_mass_notification}
                            value={this.state.organization_mass_notification}
                            label={`Organization Mass Notification`}
                            onChange={() => this.updateNotificationSettings("organization_mass_notification")}
                        />
                    </FormGroup>
                    <FormGroup as={Col} sm={sm} controlId="people_to_meet" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="people_to_meet"
                            checked={this.state.people_to_meet}
                            value={this.state.people_to_meet}
                            label={`People To Meet`}
                            onChange={() => this.updateNotificationSettings("people_to_meet")}
                        />
                    </FormGroup>
                </Form.Row>
                <Form.Row>
                    <FormGroup as={Col} sm={sm} controlId="people_you_may_know" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="people_you_may_know"
                            checked={this.state.people_you_may_know}
                            value={this.state.people_you_may_know}
                            label={`People You May Know`}
                            onChange={() => this.updateNotificationSettings("people_you_may_know")}
                        />
                    </FormGroup>
                    <FormGroup as={Col} sm={sm} controlId="receive_emails" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="receive_emails"
                            checked={this.state.receive_emails}
                            value={this.state.receive_emails}
                            label={`Receive Emails`}
                            onChange={() => this.updateNotificationSettings("receive_emails")}
                        />
                    </FormGroup>
                </Form.Row>
                <Form.Row>
                    <FormGroup as={Col} sm={sm} controlId="receive_push_notifications" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="receive_push_notifications"
                            checked={this.state.receive_push_notifications}
                            value={this.state.receive_push_notifications}
                            label={`Receive Push Notifications`}
                            onChange={() => this.updateNotificationSettings("receive_push_notifications")}
                        />
                    </FormGroup>
                    <FormGroup as={Col} sm={sm} controlId="receive_texts" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="receive_texts"
                            checked={this.state.receive_texts}
                            value={this.state.receive_texts}
                            label={`Receive Texts`}
                            onChange={() => this.updateNotificationSettings("receive_texts")}
                        />
                    </FormGroup>
                </Form.Row>
                <Form.Row>
                    <FormGroup as={Col} sm={sm} controlId="suggested_events" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="suggested_events"
                            checked={this.state.suggested_events}
                            value={this.state.suggested_events}
                            label={`Suggested Events`}
                            onChange={() => this.updateNotificationSettings("suggested_events")}
                        />
                    </FormGroup>
                    <FormGroup as={Col} sm={sm} controlId="university_mass_notification" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="university_mass_notification"
                            checked={this.state.university_mass_notification}
                            value={this.state.university_mass_notification}
                            label={`University Mass Notification`}
                            onChange={() => this.updateNotificationSettings("university_mass_notification")}
                        />
                    </FormGroup>
                </Form.Row>
                <Form.Row>
                    <FormGroup as={Col} sm={sm} controlId="upcoming_events" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="upcoming_events"
                            checked={this.state.upcoming_events}
                            value={this.state.upcoming_events}
                            label={`Upcoming Events`}
                            onChange={() => this.updateNotificationSettings("upcoming_events")}
                        />
                    </FormGroup>
                    <FormGroup as={Col} sm={sm} controlId="user_mass_notification" bssize="large" style={{marginLeft: "3px"}}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            name="user_mass_notification"
                            checked={this.state.user_mass_notification}
                            value={this.state.user_mass_notification}
                            label={`User Mass Notification`}
                            onChange={() => this.updateNotificationSettings("user_mass_notification")}
                        />
                    </FormGroup>
                </Form.Row>
            </div>
        )
    }
}