import { Layout, Menu } from 'antd'
import './Header.css'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MailOutlined, AppstoreOutlined, SettingOutlined, HomeOutlined, QuestionCircleOutlined, PlusCircleOutlined, ProfileOutlined, LogoutOutlined, LoginOutlined, SignalFilled, ProfileFilled} from '@ant-design/icons';
import Login from '../../presentational/user/login/Login';
import { AuthContext } from '../../../util/authProvider';

export const Header = () => {

  const navigate = useNavigate();
  const {authData, handleLogout} = useContext(AuthContext);

  const onClick = (e) =>{
    if(e.key=== 'logout'){
      handleLogout();
      navigate("/")
    }
  }

  let menuItems;
  if(authData.isAuthenticated){
     menuItems = [
      {
        label: <Link to={"/"}>Home</Link>,
        key: '/',
        icon:<HomeOutlined/>,
      },
      {
        label: <Link to={'/poll/new'}>New Poll</Link>,
        key: '/poll/new',
        icon:<PlusCircleOutlined/>,
      },
      {
        label: <Link to={'/profile/{username}'}>Profile</Link>,
        key: '/profile',
        icon:<ProfileFilled/>,
        children:[
          {
            label: <Link to={`/users/${authData.currentUser.username}`}>{authData.currentUser.username}</Link>,
            key: '/users/{username}',
            icon:<PlusCircleOutlined/>,
          },
          {
            label: 'Logout',
            key: 'logout',
            icon:<LogoutOutlined/>,
          },
        ]
      },
    ]
  }else{
    menuItems = [
      {
        label: <Link to={'/login'}>Login</Link>,
        key: '/login',
        icon:<LoginOutlined/>,
      },
      {
        label: <Link to={'/signup'}>Sign Up</Link>,
        key: '/signup',
        icon:<SignalFilled/>,
      }
    ]
  }

  return (
    <Layout.Header className='app-header'>
      <div className='container'>
        <div className='app-name'>
          <Link to='/' className='logo'>
          Who's Right?
          </Link>
        </div>
        <Menu mode="horizontal" items={menuItems} onClick={onClick}>

        </Menu>
      </div>
    </Layout.Header>
  )
}
