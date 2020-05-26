import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import logo from "../../image/logo.png"
import { NavLink, withRouter } from "react-router-dom";
import axios from 'axios';
import Api from "../../Api/Api.json";
import { getFromStorage } from "../../utils/storage";

const color = "#229a88";
const url = Api.BASE_URL + Api.SIGNUP_API;
const verifyURL = Api.BASE_URL + Api.VERIFY_TOKEN_API;
const checkUsernameUrl = Api.BASE_URL + Api.USERNAME_CHECK_API;

function Signup(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if(isLoading) {
    if(getFromStorage("user"))
      verifyToken();
    else
      setIsLoading(false);
  }

  function verifyToken(){
    const data = {
        token: getFromStorage("user") ? getFromStorage("user").token : ""
    }
    axios
    .post(verifyURL, data)
    .then(res => {
        props.history.replace("/create_event")
    })
    .catch(err => {
        if(err.toString().includes("400") || !getFromStorage("user")){
            setIsLoading(false)
        } else {
            props.history.replace("/create_event")
        }
    })
  }

  function validateForm() {
    return email.length > 0 && password.length > 0 && username.length > 0 && retypePassword.length > 0;
  }

  function usernameCheck(){
        const data = {
            username
        }
        axios
        .post(checkUsernameUrl,data)
        .then(res => {
            signup();
        })
        .catch(err => {
            setSuccess("");
            setIsSubmitting(false);
            if(!err.toString().includes("Network Error"))
                setErrors(["Username already exist"]);
            else
                setErrors(["Something went wrong! Please Check Your Internet Connection"]);
        })
  }

  function signup() {
    const data = {
        email,
        username,
        password,
        re_password: retypePassword
    }
    axios
    .post(url, data)
    .then(res => {
        setEmail("");
        setUsername("");
        setPassword("");
        setRetypePassword("");
        setErrors([]);
        setSuccess("Account Successfully Created! Please check your email and activate your account")
        setIsSubmitting(false)
    })
    .catch(err => {
            setSuccess("");
            setIsSubmitting(false)
            if(err.response.data.password) 
                setErrors(err.response.data.password)
            else if(err.response.data.email)
                setErrors(err.response.data.email)
            else if(err.response.data.username)
                setErrors(err.response.data.username)
            else 
                setErrors(["Something went wrong! Please Check Your Internet Connection"])
    })
  }
  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    if(password !== retypePassword) {
        setErrors(["Passwords are not equal"])
        setSuccess("");
        setIsSubmitting(false);
    } else {
        usernameCheck();
    }
  }


  if(isLoading) {
      return <div></div>
  }
  return (
    <div className="Login" style={{textAlign: "center"}}>
      <div style={{backgroundColor: "white", marginLeft: "20px", marginRight: "20px", marginTop: "10px"}} className="ma2 pa5 dib shadow-4">
        <div style={{textAlign: "center"}}>
            <h1 style={{textAlign: "center", color, marginBottom: "0px"}} className="name">Culapp</h1>
            <img src={logo} alt="logo" width="100" style={{marginLeft: "auto", marginRight: "auto"}}/>
        </div>
        <br/>
        <h3 style={{textAlign: "center", color, fontWeight: "bold"}}>Signup</h3>
        <form onSubmit={handleSubmit}>
            {
                errors.map((error,i) =>
                    <Alert key={i} variant="danger" style={{fontSize: "12px"}}>
                        {error}
                    </Alert>
                )
            }
            {
                success.length > 0 && 
                <Alert variant="success" style={{fontSize: "12px"}}>
                    {success}
                </Alert>
            }
            <FormGroup controlId="email" bssize="large" style={{textAlign: "left"}}>
                <FormLabel>Email</FormLabel>
                <FormControl
                    autoFocus
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                        setSuccess("");
                        setErrors([]);
                    }}
                />
            </FormGroup>
            <FormGroup controlId="username" bssize="large" style={{textAlign: "left"}}>
                <FormLabel>Username</FormLabel>
                <FormControl
                    autoFocus
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => {
                        setUsername(e.target.value);
                        setSuccess("");
                        setErrors([]);
                    }}
                />
            </FormGroup>
            <FormGroup controlId="password" bssize="large" style={{textAlign: "left"}}>
                <FormLabel>Password</FormLabel>
                <FormControl
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                        setSuccess("");
                        setErrors([]);
                    }}
                    placeholder="Password"
                    type="password"
                />
            </FormGroup>
            <FormGroup controlId="retypassword" bssize="large" style={{textAlign: "left"}}>
                <FormLabel>Re-Enter Password</FormLabel>
                <FormControl
                    value={retypePassword}
                    onChange={e => {
                        setRetypePassword(e.target.value);
                        setSuccess("");
                        setErrors([]);
                    }}
                    placeholder="Re-Enter Password"
                    type="password"
                />
            </FormGroup>
            <Button block bssize="large" disabled={!validateForm() || isSubmitting ? true:false} type="submit" style={{background: color, borderColor: color}} variant="dark">
                {!isSubmitting ? "Signup" : "Loading..."}
            </Button>
            <FormGroup style={{textAlign: "center", marginTop: "10px", marginBottom: "-10px"}}>
                <FormLabel>
                    <span style={{color: "gray"}}>Already have an account?</span> {" "}
                    <NavLink to="/">
                        <span style={{color: color, fontWeight: "bold", cursor: "pointer"}}>Login</span>
                    </NavLink>
                </FormLabel>
            </FormGroup>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Signup);