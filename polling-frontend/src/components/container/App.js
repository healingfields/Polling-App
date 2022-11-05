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

const {Header, Footer, Content} = Layout;


const router = createBrowserRouter([
  {
    path:"/",
    element: <PollList/>,
    index:true

  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/singup",
    element:<SignUp/>
  },
  {
    path:"users/:username",
    element:<Profile/>
  },
  {
    path:"/poll/new",
    element:
      <PrivateRoute>
        <NewPoll/>
      </PrivateRoute>
  }
])
function App() {

  const [currentUser, setCurrentUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadCurrentUser = () => {
    getCurrentUser()
      .then(response => {
        setCurrentUser(response);
        setIsAuthenticated(true);
        setIsLoading(false);
      }).catch(error => {
        setIsLoading(false);
      })
  }

  useEffect(() => {
    loadCurrentUser();
  }, []);

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

  return (
    
    <Layout className="App-container">
      <Header>Header</Header>
     
    {isLoading?
      <Content>
      <RouterProvider router={router}/>
      </Content>
     :
    <Loader/>
    }
     <Footer>footer</Footer>
      
    </Layout>
  );
}

export default App;
