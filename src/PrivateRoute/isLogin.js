import axios from "axios";
import { getFromStorage, setInStorage, removeFromStorage } from "../utils/storage";
import Api from "../Api/Api.json";

const verifyURL = Api.BASE_URL + Api.VERIFY_TOKEN_API;
const refreshTokenURL = Api.BASE_URL + Api.REFRESH_TOKEN_API;

export function isLogin(){
    if(getFromStorage("user")) {
        if(new Date(getFromStorage("user").expire_time) < new Date()) {
            refreshToken();
            // const data = {
            //     token: getFromStorage("user") ? getFromStorage("user").token : ""
            // }
            // axios
            // .post(verifyURL, data)
            // .then(res => {
            //     setInStorage("isLoggedIn", true)
            // })
            // .catch(err => {
            //     if(err.toString().includes("400") || !getFromStorage("user")){
            //         setInStorage("isLoggedIn", false)
            //     } 
            //     if(refreshToken() && getFromStorage("return")) {
            //         setInStorage("isLoggedIn", true)
            //     } else if(err.toString().includes("Network Error")){
            //         setInStorage("isLoggedIn", false)
            //         removeFromStorage("return")
            //         removeFromStorage("username")
            //         removeFromStorage("user");
            //     } else {
            //         removeFromStorage("user");
            //         removeFromStorage("return")
            //         removeFromStorage("username")
            //         setInStorage("isLoggedIn", false);
            //     }
            // })
        } else {
            setInStorage("isLoggedIn", true)
        }
    }

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
                setInStorage("isLoggedIn", true)
                setInStorage("user", res.data)
                setInStorage("return", true)
            })
            .catch(err => {
                setInStorage("return", false)
                if(err.toString().includes("Network Error")) {
                    setInStorage("isLoggedIn", false)
                    removeFromStorage("user");
                    removeFromStorage("return");
                    removeFromStorage("username")
                    window.location.pathname = "/login"
                } else if(err.response) {
                    if(err.response.status === 400) {
                        setInStorage("isLoggedIn", false)
                        removeFromStorage("user");
                        removeFromStorage("return");
                        removeFromStorage("username")
                        window.location.pathname = "/login"
                    }
                }
            })
            return true;
        }
    }
    return false;
}