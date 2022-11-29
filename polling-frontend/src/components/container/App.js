import './App.css';
import PollList from '../presentational/poll/pollList/PollList';
import NewPoll from '../presentational/poll/newPoll/NewPoll';
import Login from '../presentational/user/login/Login';
import SignUp from '../presentational/user/signUp/SignUp';
import Profile from '../presentational/user/profile/Profile';
import PrivateRoute from '../common/privateRoute/PrivateRoute'
import {createBrowserRouter, Route, RouterProvider, redirect} from 'react-router-dom'
import { Layout} from 'antd';
import { useState, useEffect, useContext } from 'react';
import {getCurrentUser} from '../../util/ApiUtils';
import { ACCESS_TOKEN } from '../../constants';
import {Loader} from '../common/loader/Loader'
import { Header } from '../common/header/Header';
import { AuthContext, AuthProvider } from '../../util/authProvider';

const {Content, Footer} = Layout;

function App() {

  // const [currentUser, setCurrentUser] = useState({});
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const authData = {
    isLoading:false
  }
  const router = createBrowserRouter([
    {
      path:"/",
      element: <PollList />,
      index:true
    },
    {
      path:"/signup",
      element:<SignUp/>
    },
    {
      path:"/login",
      element:<Login
               />
    },
    {
      path:"users/:username",
      element:<Profile
                />
    },
    {
      path:"/poll/new",
      element:
        <PrivateRoute>
          <NewPoll/>
        </PrivateRoute>
    }
  ]);






  return (
    
    <Layout className='app-container'>
      <Header className='app-header'/>
    {!authData.isLoading?
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
