import { createContext, useContext, useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import {login, getCurrentUser} from './ApiUtils'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authData, setAuthData] = useState({
        isAuthenticated:false,
        currentUser:{},
        isLoading:false
    })
    console.log(authData.currentUser);
    
    const handleLogin = (loginRequest) =>{
        login(loginRequest)
        .then(response => {
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);
          setAuthData({
            currentUser:{},
            isAuthenticated:true,
            isLoading:false
          })
          }).catch(error=>{
          console.log("something went wrong");
      })
    }

    const loadCurrentUser = () => {
        getCurrentUser()
            .then(response => {
            setAuthData({
            isAuthenticated:false,
            currentUser:response,
            isLoading:false
            })
        }).catch(error => {
            console.log('something happened on the server');
        })

    }

    const handleLogout = () =>{
        localStorage.removeItem(ACCESS_TOKEN);
        setAuthData({
            currentUser:{},
            isAuthenticated:false,
            isLoading:false
        })
    }

    return(
        <AuthContext.Provider
            value={{
                authData,
                handleLogin,
                loadCurrentUser,
                handleLogout  
            }}
            >{children}
        </AuthContext.Provider>
    )
}