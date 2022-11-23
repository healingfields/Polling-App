import { Layout, Menu } from 'antd'
import './Header.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { MailOutlined, AppstoreOutlined, SettingOutlined, HomeOutlined, QuestionCircleOutlined, PlusCircleOutlined, ProfileOutlined, LogoutOutlined, LoginOutlined, SignalFilled} from '@ant-design/icons';
import Login from '../../presentational/user/login/Login';

export const Header = (props) => {

  let menuItems;
  if(props.currentUser){
     menuItems = [
      {
        label: <a href='/'>Home</a>,
        key: '/',
        icon:<HomeOutlined/>,
      },
      {
        label: <a href='/poll/new'>New Poll</a>,
        key: '/poll/new',
        icon:<PlusCircleOutlined/>,
      },
      {
        label: <a href='/profile'>Profile</a>,
        key: '/profile',
        icon:<ProfileOutlined/>,
        children:[
          {
            label: '@ ' + props.currentUser.username,
            key: 'user-info',
            icon:<PlusCircleOutlined/>,
          },
          {
            label: <a href={`/users/${props.currentUser.username}`}>Profile</a>,
            key: 'profile',
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
        label: <a href='/login'>Login</a>,
        key: '/login',
        icon:<LoginOutlined/>,
      },
      {
        label: <a href='/signup'>Sign Up</a>,
        key: '/signup',
        icon:<SignalFilled/>,
      }
    ]
  }

  return (
    <Layout.Header className='app-header'>
      <div className='container'>
        <div className='app-name'>
          <a href='/'>
          Who's Right?
          </a>
        </div>
        <Menu mode="horizontal" items={menuItems}>

        </Menu>
      </div>
    </Layout.Header>
  )
}
