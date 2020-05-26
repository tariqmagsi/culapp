import { getFromStorage } from "./storage"
import { refreshToken } from "../PrivateRoute/isLogin"

export const getHeaders = () => {
    refreshToken();
    
    let headers = {
        headers: {
        }
    }

    if(getFromStorage("user")) {
        headers = {
            headers: {
                "Authorization": `Bearer ${getFromStorage("user").token}`
            }
        }
    }

    return headers;
}