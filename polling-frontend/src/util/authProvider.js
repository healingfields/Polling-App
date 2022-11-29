import { createContext, useContext, useEffect, useState } from "react";
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
            ...authData,
            isAuthenticated:true,
          })
          }).catch(error=>{
          console.log("something went wrong");
      })
    }

    const loadCurrentUser = () => {
        getCurrentUser()
            .then(response => {
            setAuthData({
            ...authData,
            currentUser:response,
            })
        }).catch(error => {
            console.log('something happened on the server');
        })
    }

    useEffect(()=>{
        loadCurrentUser();
    },[authData.isAuthenticated])

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