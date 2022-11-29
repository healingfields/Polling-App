import React, { useContext } from 'react'
import './Login.css'
import {Form, Button, Input} from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import {login} from '../../../../util/ApiUtils'
import {ACCESS_TOKEN} from '../../../../constants/index'
import { AuthContext } from '../../../../util/authProvider'


function Login() {

  const {handleLogin, loadCurrentUser} = useContext(AuthContext);

  const navigate = useNavigate();
  const onFinish = (values) => {
    const loginRequest = Object.assign({}, values)
    handleLogin(loginRequest);
    loadCurrentUser();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login-container'>
      <div className='login-header'>
        <h1>Login</h1>
      </div>
      <div className='login-content'>
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="usernameOrEmail"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input 
          prefix={<UserOutlined />}
          size='large'
          name='usernameOrEmail'
          placeholder='Username or Email'
          />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!'}, { type: 'string', min: 6 }]}
      >
        <Input.Password 
          prefix={<LockOutlined/>}
          size='large'
          name='password'
          placeholder='Password' />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" size='large' shape='rounded'>
          Login
        </Button>
        Or <Link to={"/signup"}>  register now!</Link>
      </Form.Item>
    </Form>
      </div>
    </div>
  )
}

export default Login