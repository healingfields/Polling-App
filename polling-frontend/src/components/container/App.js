import './App.css';
import PollList from '../presentational/poll/pollList/PollList';
import NewPoll from '../presentational/poll/newPoll/NewPoll';
import Login from '../presentational/user/login/Login';
import SignUp from '../presentational/user/signUp/SignUp';
import Profile from '../presentational/user/profile/Profile';
import PrivateRoute from '../common/privateRoute/PrivateRoute'
import {createBrowserRouter, Route, RouterProvider, redirect} from 'react-router-dom'
import { Layout as AntdLayout} from 'antd';
import { useState, useEffect, useContext } from 'react';
import {getCurrentUser} from '../../util/ApiUtils';
import { ACCESS_TOKEN } from '../../constants';
import {Loader} from '../common/loader/Loader'
import { Header } from '../common/header/Header';
import { AuthContext, AuthProvider } from '../../util/authProvider';
import { Layout } from './Layout';

const {Content, Footer} = AntdLayout;

function App() {

  // const [currentUser, setCurrentUser] = useState({});
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Layout />,
      // index:true,
      children:[
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
          element:<PrivateRoute>
                <NewPoll/>
            </PrivateRoute>
        }
      ]
    },

  ]);
  return (
      <>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
      </>
  );
}

export default App;
