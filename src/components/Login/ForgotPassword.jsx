import React, { Component } from "react";
import { Modal, Alert } from "react-bootstrap";
import axios from 'axios';
import Api from "../../Api/Api.json"

const color = "#229a88";
const url = Api.BASE_URL + Api.FORGOT_PASSWORD_API;

class ForgotPassword extends Component {
  state = { email: "", isSuccess: false, error: "", isLoading: false };

  whenChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: "", isSuccess: false });
  };

  sendEmail = () => {
        if(this.state.email.trim() !== "") {
            const data = {
                email: this.state.email
            }
            axios
            .post(url, data)
            .then(res => {
                this.setState({email: "", isSuccess: true, isLoading: false})
            })
            .catch(err => {
                this.setState({error: "Unable to resend at the time. May be something went wrong",isSuccess: false, isLoading: false})
            })
        } else {
            this.setState({error: "Email Required", isLoading: false})
        }
    
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {!this.state.flag ? (
          <React.Fragment>
            <Modal.Header closeButton>
              Forgot Password?
            </Modal.Header>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    this.setState({isLoading:true}, () => {
                        this.sendEmail()
                    })
                    
                }}>
              <Modal.Body>
                {this.state.error !== "" && 
                    <Alert variant="danger" size={10} style={{marginBottom: "10px", fontSize: "14px"}}>
                    {this.state.error}
                    </Alert>
                }
                {this.state.isSuccess && 
                    <Alert variant="success" size={10} style={{marginBottom: "10px", fontSize: "14px"}}>
                        Reset Password link sent to your email address
                    </Alert>
                }
                
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.whenChangeHandler}
                  placeholder="Enter Email"
                  className="form form-control"
                  required
                />
                
              </Modal.Body>
                
                <Modal.Footer>
                  <button className="btn btn-success" disabled={this.state.isLoading} style={{backgroundColor: color, borderColor: color}}>
                      {!this.state.isLoading ? "Send Email" : "Loading..."}
                  </button>   
                </Modal.Footer>
                
            </form>
          </React.Fragment>
        ) : (
          <Modal.Header
            style={{ color: "green", fontSize: "18px" }}
            closeButton
          >
            <strong>Check Out Your Email To Change Password</strong>
          </Modal.Header>
        )}
      </Modal>
    );
  }
}
export default ForgotPassword;
