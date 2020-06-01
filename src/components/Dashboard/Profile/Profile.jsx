import React, {Component} from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import { FormGroup, FormLabel, FormControl, Button, Col, Alert, Row, InputGroup } from 'react-bootstrap';
import {Helmet} from "react-helmet"
import Api from "../../../Api/Api.json";
import axios from 'axios';
import { getFromStorage } from '../../../utils/storage';
import profile from "../../../image/user.png";
import countries from "../../../utils/country.json";
import { Photo, CalendarToday } from '@material-ui/icons';
import ProfileModal from "./ProfileModal";
import { refreshToken } from '../../../PrivateRoute/isLogin';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker-edited';
import moment from "moment";
import { getHeaders } from '../../../utils/headers';

const color = "#229a88";
const url = Api.BASE_URL + Api.ACCOUNT_PROFILE;

export default class Profile extends Component {
    state = {
        first_name: "", 
        middle_name: "",
        last_name: "", 
        country: "", 
        gender: "", 
        phone_number: "", 
        username: "", 
        birth_date: null, 
        education_level: "",
        college_level: "",
        profile_photo: null,
        isSubmitting: false,
        error: "",
        files: [],
        show:false,
        isLoading: true,
        success: "",
        base64: "",
        date: moment()
    }

    setFile = (data) => {
        this.setState({files: data, base64: data.length > 0 ? data[0].src.base64 : ""})
    }

    whenChangeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    }

    validateForm = () => {
        return this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.gender.length > 0 && this.state.country.length > 0 && this.state.college_level.length > 0 && this.state.education_level.length > 0;
    }

    checkNull = (data) => {
        return data ? data : "";
    }

    fetchProfile = () => {
        const headers = getHeaders();

        axios
        .get(url, headers)
        .then(res => {
            this.setState({
                isLoading: false,
                first_name: this.checkNull(res.data.first_name), 
                middle_name: this.checkNull(res.data.middle_name),
                last_name: this.checkNull(res.data.last_name), 
                country: res.data.country ? res.data.country.slug : "", 
                gender: this.checkNull(res.data.gender.toString()), 
                phone_number: this.checkNull(res.data.phone_number), 
                username: this.checkNull(res.data.username), 
                date: res.data.birth_date ? moment(res.date.birth_date) : moment(), 
                birth_date: res.data.birth_date ? moment(res.date.birth_date).format("DD/MM/YYYY") : "",
                education_level: this.checkNull(res.data.education_level.toString()),
                college_level: this.checkNull(res.data.college_level.toString()),
                profile_photo: res.data.profile_photo,
            })
        })
        .catch(err => {
            this.setState({isLoading: false, error: "Something Went Wrong!"})
        })
    }

    postRequest = (name) => {
        const { first_name, middle_name, last_name, country, gender, phone_number, username, education_level, college_level } = this.state;
        let data = {}
        if(name === "upload") {
            const formData = new FormData();
            formData.append("profile_photo", this.state.files[0].src.file, this.state.files[0].src.file.name)
            data = formData
        } else {
            data = {
                first_name, 
                middle_name,
                last_name, 
                country_slug: country.toLowerCase(), 
                gender, 
                phone_number, 
                username, 
                birth_date: this.state.date.format("YYYY-MM-DD"), 
                education_level,
                college_level,
            }
        }

        const headers = getHeaders();

        axios
        .post(url, data, headers)
        .then(res => {
            this.setState({
                isSubmitting: false,
                files: [],
                base64: "",
                success: name === "uploaded" ? "Image Uploaded Successfully" : "Profile Updated Successfully",
                error: "",
                profile_photo: res.data.profile_photo,
            })
        })
        .catch(err => {
            this.setState({isSubmitting: false, error: "Something Went Wrong!", success: ""})
        })
    }

    formSubmit = (e) => {
        e.preventDefault();
        refreshToken();
        
        this.setState({isSubmitting: true}, () => {
            this.postRequest("");
        })
    }

    componentDidMount(){
        refreshToken();
        if(getFromStorage("user")) {
            this.setState({username: getFromStorage("user").user.username})
            this.fetchProfile();
        } else {
            this.setState({isLoading: false})
        }
    }

    render() {
        const { isSubmitting, isLoading } = this.state;

        return (
            <div>
                <ProfileModal show={this.state.show} base64={this.state.base64} handleShow={() => this.setState({show: true})} setFile={this.setFile} handleClose={() => this.setState({show: false}, () => {this.setFile([])})} closeHandle={() => this.setState({show: false})} uploadImage={() => this.setState({show: false}, () => {this.postRequest("upload")})}/>
                <Helmet bodyAttributes={{style: 'background : #eee !important'}}/>
                <Sidebar isOpened={this.props.isOpened} changeState={this.props.changeState}/>
                <div style={{marginLeft: window.innerWidth > 600 ? (this.props.isOpened ? "200px" : "55px") : "55px",  color: "black", paddingTop: "50px", paddingLeft: "10px", overflowX: "auto"}}>
                    <h3 style={{color, marginLeft: "20px"}}>Profile</h3>
                    {!isLoading ?
                    <form 
                        style={{marginRight: "20px", fontSize: "14px", paddingLeft: "20px"}} 
                        onSubmit={this.formSubmit}
                    >
                        <div style={{backgroundColor: "white", paddingLeft: "10px", borderRadius: 10, paddingRight: "20px", overflowX: "auto"}}>
                            <br/>
                            {
                                this.state.error.length > 0 && 
                                <Alert variant="danger" style={{fontSize: "12px"}}>
                                    {this.state.error}
                                </Alert>
                            }
                            {
                                this.state.success.length > 0 && 
                                <Alert variant="success" style={{fontSize: "12px"}}>
                                    {this.state.success}
                                </Alert>
                            }
                            {
                                getFromStorage("user") ? !getFromStorage("user").user.is_account_setup &&
                                <Alert variant="danger" style={{fontSize: "12px"}}>
                                   Update Your Profile
                                </Alert>
                                :
                                <span></span>
                            }
                            <br/>
                            <Row>
                            <Col sm="4">
                                <div className="profile-container" onClick={() => this.setState({show: true})}>
                                    {!this.state.profile_photo ? 
                                    <img src={profile} alt="profile_pic" className="profile-image"/>
                                    :
                                    <img src={this.state.profile_photo} alt="profile_pic" className="profile-image"/>
                                    }
                                    
                                    <div className="profile-middle" style={{color: "#229a88"}}>
                                        <div className="profile-text">
                                            <Photo /> 
                                            <span style={{marginLeft: "5px", fontSize: "16px", fontWeight: "bold"}}>Upload Photo</span>
                                        </div>
                                    </div>

                                </div>
                                <br/>
                                <div style={{textAlign:"center", fontSize: "16px", fontWeight: "bold"}}>
                                    {this.state.username ? `@${this.state.username}` : ""}
                                </div>
                                <br/>
                            </Col>
                            <Col sm="8">
                                <FormGroup controlId="username" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>First Name<span style={{color: "red"}}>*</span></FormLabel>
                                    <FormControl
                                        size="sm"
                                        name="first_name"
                                        type="text"
                                        placeholder="First Name"
                                        value={this.state.first_name}
                                        onChange={this.whenChangeHandler}
                                    />
                                </FormGroup>
                                <FormGroup controlId="middle_name" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Middle Name</FormLabel>
                                    <FormControl
                                        size="sm"
                                        name="middle_name"
                                        type="text"
                                        placeholder="Middle Name"
                                        value={this.state.middle_name}
                                        onChange={this.whenChangeHandler}
                                    />
                                </FormGroup>
                                <FormGroup controlId="last_name" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Last Name<span style={{color: "red"}}>*</span></FormLabel>
                                    <FormControl
                                        name="last_name"
                                        size="sm"
                                        type="text"
                                        placeholder="Last Name"
                                        value={this.state.last_name}
                                        onChange={this.whenChangeHandler}
                                    />
                                </FormGroup>
                                <FormGroup  controlId="gender" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Gender<span style={{color: "red"}}>*</span></FormLabel>
                                    <FormControl
                                        name="gender"
                                        size="sm"
                                        as="select"
                                        value={this.state.gender}
                                        onChange={this.whenChangeHandler}
                                    >
                                        <option value="" style={{color: "gray"}}>Select Gender</option>
                                        <option value={0}>Male</option>
                                        <option value={1}>Female</option>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup controlId="phone_number" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl
                                        size="sm"
                                        name="phone_number"
                                        pattern="[0-9,+]*"
                                        type="text"
                                        placeholder="Phone Number"
                                        value={this.state.phone_number}
                                        onChange={(e) => {
                                            if(e.target.validity.valid){
                                                this.setState({phone_number: e.target.value})
                                            }
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup  controlId="country" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Country<span style={{color: "red"}}>*</span></FormLabel>
                                    <FormControl
                                        name="country"
                                        size="sm"
                                        as="select"
                                        placeholder="Country"
                                        value={this.state.country}
                                        onChange={this.whenChangeHandler}
                                    >
                                        <option value="" style={{color: "gray"}}>Select Country</option>
                                        {countries.map(country => 
                                            <option value={`${country.name.toLowerCase()}`} key={country.code}>
                                                {`${country.name}`}
                                            </option>
                                        )}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup  controlId="birth_date" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Birth Date</FormLabel>
                                    <DatetimeRangePicker
                                        singleDatePicker
                                        showDropdowns
                                        startDate={this.state.date}
                                        onApply={(e, picker) => {
                                            this.setState({
                                                date: picker.startDate,
                                            }, () => {
                                                this.setState({birth_date: moment(this.state.date).format("DD/MM/YYYY")})
                                            })
                                        }}
                                    >
                                        <InputGroup className="mb-3" size="sm">
                                            <FormControl
                                                size="sm"
                                                name="start_time"
                                                type="text"
                                                placeholder="DD/MM/YYYY"
                                                value={this.state.birth_date}
                                                onChange={() => {}}
                                            />
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <CalendarToday fontSize="small"/>
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                        </InputGroup>
                                    </DatetimeRangePicker>
                                </FormGroup>
                                <FormGroup controlId="college_level" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>College Level<span style={{color: "red"}}>*</span></FormLabel>
                                    <FormControl
                                        name="college_level"
                                        size="sm"
                                        as="select"
                                        placeholder="College Level"
                                        value={this.state.college_level}
                                        onChange={this.whenChangeHandler}
                                    >
                                        <option value="" style={{color: "gray"}}>Select College Level*</option>
                                        {["Freshman","Sophomore","Junior","Senior","Graduate","Alumni"].map((item, i) => 
                                            <option key={item} value={i}>{item}</option>
                                        )}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup controlId="education_level" bssize="large" style={{textAlign: "left"}}>
                                    <FormLabel>Education Level<span style={{color: "red"}}>*</span></FormLabel>
                                    <FormControl
                                        name="education_level"
                                        size="sm"
                                        as="select"
                                        placeholder="Education Level"
                                        value={this.state.education_level}
                                        onChange={this.whenChangeHandler}
                                    >
                                        <option value="" style={{color: "gray"}}>Select Education Level*</option>
                                        {["High School","Certificate","Associates","Bachelor's","Masters","PHd"].map((item, i) => 
                                            <option key={item} value={i}>{item}</option>
                                        )}
                                    </FormControl>
                                </FormGroup>
                                <Button block bssize="large" disabled={!this.validateForm() || isSubmitting} type="submit" style={{background: color, borderColor: color,width: "auto", marginLeft: "auto", marginRight: "auto"}} variant="dark" size="sm">
                                    {!isSubmitting ? "Update Profile" : "Loading..."}
                                </Button>
                            </Col>
                            </Row>
                            <br/>
                        </div>
                    </form>
                    :
                    <div style={{textAlign: "center", color}}>
                        <h1>Loading...</h1>
                    </div>
                    }
                    <br/>
                </div>
            </div>
        )
    }
}