import React from "react";
import { useState, useEffect, useRef } from "react";
import useTypewriter from "react-typewriter-hook";
import playstore from "../../images/playstore.png";
import appstore from "../../images/appstore.png";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";
import "../../css/style.css";

const MagicOcean = ["What your friends think.", ";)", "Dare to ask...", ":O"];
let index = 0;

function Home(props) {
  const [magicName, setMagicName] = useState("What your friends think.");
  const intervalRef = useRef({});
  const name = useTypewriter(magicName);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      index = index > 2 ? 0 : ++index;
      setMagicName(MagicOcean[index]);
    }, 3000);
    return function clear() {
      clearInterval(intervalRef.current);
    };
  }, [magicName]);
  return (
    <div>
      <div className="home">
        <h1 className="cursor">
          {name}
          <span style={{ fontSize: "80px", color: "#0add96" }}>|</span>
        </h1>
      </div>
      <div style={{ textAlign: "center" }}>
        <a href="https://culapp.co">
          <img src={appstore} style={{ height: "40px" }} alt="appstore" />
        </a>
        <a href="https://culapp.co">
          <img
            src={playstore}
            style={{ height: "40px", marginLeft: "20px" }}
            alt="playstore"
          />
        </a>
      </div>
      <br />
      <div style={{textAlign: "center"}}>
        <Button variant="success" style={{width: "120px"}} onClick={() => props.history.push("/login")}>Login</Button>
        <Button variant="dark" style={{width: "120px", marginLeft: "20px"}} onClick={() => props.history.push("/signup")}>Signup</Button>
      </div>
      <br />
    </div>
  );
}

export default withRouter(Home);