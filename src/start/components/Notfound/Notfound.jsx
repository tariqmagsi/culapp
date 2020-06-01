import React, { Component } from "react";
import notFound from "../../images/notFound.png";
import Loading from "react-fullscreen-loading";
import { Button } from "@material-ui/core";
import "tachyons";
import { Link } from "react-router-dom";
import "../../css/style.css";

export default class NotFound extends Component {
  state = { flag: false };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ flag: true });
    }, 2000);
  }
  render() {
    if (this.state.flag) {
      return (
        <div style={{ minWidth: "300px" }}>
          <div style={{ textAlign: "center" }}>
            <img src={notFound} alt="Not Found" />
          </div>
          <div style={{ textAlign: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "rgb(11, 155, 95)",
                  color: "white"
                }}
              >
                Click Here To Go On Home Page
              </Button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Loading loading background="#0add96" loaderColor="white" />
        </div>
      );
    }
  }
}
