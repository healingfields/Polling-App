import './App.css';
import PollList from '../presentational/poll/pollList/PollList';
import NewPoll from '../presentational/poll/newPoll/NewPoll';
import Login from '../presentational/user/login/Login';
import SignUp from '../presentational/user/signUp/SignUp';
import Profile from '../presentational/user/profile/Profile';
import PrivateRoute from '../common/privateRoute/PrivateRoute'
import {createBrowserRouter, Route, RouterProvider} from 'react-router-dom'
import { Layout} from 'antd';
import { useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Layout className="App-container">
      <Header>Header</Header>
     

     <Content>
     <RouterProvider router={router}/>
     </Content>

     <Footer>footer</Footer>
      
    </Layout>
  );
}

export default App;
