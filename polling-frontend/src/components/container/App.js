import './App.css';
import PollList from '../presentational/poll/pollList/PollList';
import NewPoll from '../presentational/poll/newPoll/NewPoll';
import Login from '../presentational/user/login/Login';
import SignUp from '../presentational/user/signUp/SignUp';
import Profile from '../presentational/user/profile/Profile';
import PrivateRoute from '../common/privateRoute/PrivateRoute'
import {createBrowserRouter, Route, RouterProvider, redirect} from 'react-router-dom'
import { Layout} from 'antd';
import { useState, useEffect } from 'react';
import {getCurrentUser} from '../../util/ApiUtils';
import { ACCESS_TOKEN } from '../../constants';
import {Loader} from '../common/loader/Loader'
import { Header } from '../common/header/Header';

const {Content, Footer} = Layout;

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = (redirectTo="/") =>{
    localStorage.removeItem(ACCESS_TOKEN);

    setCurrentUser(null);
    setIsAuthenticated(false)

    redirect(redirectTo);

    //notification To add
  }

  const handleLogin = () => {
    loadCurrentUser();
    redirect("/");  
  }

  const loadCurrentUser = () => {
    getCurrentUser()
      .then(response => {
        setCurrentUser(response);
        setIsAuthenticated(true);
        setIsLoading(false);
      }).catch(error => {
          
      })
  }


  const router = createBrowserRouter([
    {
      path:"/",
      element: <PollList 
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
                handleLogout={handleLogout}/>,
      index:true
    },
    {
      path:"/signup",
      element:<SignUp/>
    },
    {
      path:"/login",
      element:<Login
                handleLogin={handleLogin}
               />
    },
    {
      path:"users/:username",
      element:<Profile
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}/>
    },
    {
      path:"/poll/new",
      element:
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}>
          <NewPoll handleLogout={handleLogout}/>
        </PrivateRoute>
    }
  ]);


  useEffect(() => {
    loadCurrentUser();
  }, []);



  return (
    
    <Layout className='app-container'>
      <Header className='app-header'/>
    {!isLoading?
      <Content className='app-content'>
      <RouterProvider router={router}/>
      </Content>
     :
    <Loader/>
    }
     <Footer style={{textAlign:'center', color:'white', backgroundColor:'gray'}}>footer</Footer>
      
    </Layout>
  );
}

export default App;
