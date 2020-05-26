import axios from "axios";
import { getFromStorage, setInStorage, removeFromStorage } from "../utils/storage";
import Api from "../Api/Api.json";

const verifyURL = Api.BASE_URL + Api.VERIFY_TOKEN_API;
const refreshTokenURL = Api.BASE_URL + Api.REFRESH_TOKEN_API;

export function isLogin(){
    const data = {
        token: getFromStorage("user") ? getFromStorage("user").token : ""
    }
    axios
    .post(verifyURL, data)
    .then(res => {
        setInStorage("isLoggedIn", true)
    })
    .catch(err => {
        if(err.toString().includes("400") || !getFromStorage("user")){
            setInStorage("isLoggedIn", false)
        } 
        if(refreshToken() && getFromStorage("return")) {
            setInStorage("isLoggedIn", true)
        } else if(err.toString().includes("Network Error")){
            setInStorage("isLoggedIn", false)
            removeFromStorage("return")
        } else {
            removeFromStorage("user");
            removeFromStorage("return")
            setInStorage("isLoggedIn", false);
        }
    })

    return false;
}

export function refreshToken() {
    if(getFromStorage("user")) {
        if(new Date(getFromStorage("user").expire_time) < new Date()) {
            const data = {
                token: getFromStorage("user").refresh_token
            }
            axios
            .post(refreshTokenURL, data)
            .then(res => {
                console.log(res.data)
                setInStorage("user", res.data)
                setInStorage("return", true)
            })
            .catch(err => {
                setInStorage("return", false)
                if(err.toString().includes("Network Error")) {
                    removeFromStorage("user");
                    removeFromStorage("return");
                    window.location.pathname = "/"
                }
                console.log(err)
            })
            return true;
        }
    }
    return false;
}