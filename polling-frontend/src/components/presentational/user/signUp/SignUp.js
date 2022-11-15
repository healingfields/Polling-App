import React, { useState } from 'react'
import './SignUp.css'
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, redirect } from 'react-router-dom';
import {signup, checkUsernameAvailability, checkEmailAvailability} from '../../../../util/ApiUtils'

function SignUp() {

  const [user, setUser] = useState({
    name:{
      value:''
    },
    username:{
      value:''
    },
    email:{
      value:''
    },
    password:{
      value:''
    }
  })

  const handleInputChange = (event, validationFunction) => {
    const target = event.target
    const inputName = target.name
    const inputValue = target.value

    setUser({
      ...user,
      [inputName]:{
        ...validationFunction(inputValue),
        value:inputValue
      }
    });
  }

  const validateName = (name) => {
    if(name.length < 3){
      return {
        validationStatus: 'error',
        errorMsg: 'name is too short (Minimum 3 characters needed)'
      }
    }else if(name.length > 15){
      return {
        validationStatus: 'error',
        errorMsg: 'name is too long (Maximum 15 characters needed)'
      }
    }else{
      return {
        validationStatus: 'success',
        errorMsg: null
      }
    }
  }

  const validateEmail = (email) => {
    if(!email){
      return {
        validationStatus: 'error',
        errorMsg: 'email shouldnt be empty'
      }
    }
    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if(!EMAIL_REGEX.test(email)){
      return {
        validationStatus: 'error',
        errorMsg: 'email not valid'
      }
    }
    if(email>22){
      return {
        validationStatus: 'error',
        errorMsg: "email is too long"
      }
    }
    return {
      validationStatus:'success',
      errorMsg: null
    }
  }

  const validatePassword = (password) => {
    if(password.length < 3){
      return {
        validationStatus: 'error',
        errorMsg: 'password is too short (Minimum 3 characters needed)'
      }
    }else if(password.length > 15){
      return {
        validationStatus: 'error',
        errorMsg: 'name is too long (Maximum 15 characters needed)'
      }
    }else{
      return {
        validationStatus: 'success',
        errorMsg: null
      }
    }
  }

  const validateUsername = (username) => {
    if(username.length < 3){
      return {
        validationStatus: 'error',
        errorMsg: 'username is too short (Minimum 3 characters needed)'
      }
    }else if(username.length > 15){
      return {
        validationStatus: 'error',
        errorMsg: 'username is too long (Maximum 15 characters needed)'
      }
    }else{
      return {
        validationStatus: 'success',
        errorMsg: null
      }
    }
  }

  const validateUsernameAvailability = () => {
      if(user.username.validationStatus === 'error'){
        return;
      }

    setUser({
      ...user,
      username:{
        ...user.username,
        validationStatus:'validating',
        errorMsg:null,
      }
    });



    checkUsernameAvailability(user.username.value).then(response =>{ 
        if(response.available){
          console.log(response.available);
          setUser({
            ...user,
            username:{
              ...user.username,
              validationStatus:'success',
              errorMsg:null,
            }
          })
        }else{
          setUser({
            ...user,
            username:{
              ...user.username,
              validationStatus:'error',
              errorMsg:'this username is already taken',
            }
          });
        }
      }).catch(error =>{
        setUser({
          ...user,
          username:{
            ...user.username,
            validationStatus:'error',
            errorMsg:'error encountered when sending the request',
          }
        })
        console.log("error");
      })
  }

  const validateEmailAvailability = () => {
    if(user.email.validationStatus === 'error'){
      return;
    }
    setUser({
      ...user,
      email:{
        ...user.email,
        validationStatus:'validating',
        errorMsg:null,
      }
    });
    
    checkEmailAvailability(user.email.value).then(response =>{
        if(response.available){        
        setUser({
          ...user,
          email:{
            ...user.email,
            validationStatus:'success',
            errorMsg:null,
          }
        })
      }else{
        setUser({
          ...user,
          email:{
            ...user.email,
            validationStatus:'error',
            errorMsg:'email already taken',
          }
        })
      }
      }).catch(error=>{
        setUser({
          ...user,
          email:{
            ...user.email,
            validationStatus:'error',
            errorMsg:'error encountered when sending the request',
          }
        });
      })
  }

  const isFormInvalid = () => {
    return !(user.name.validationStatus === 'success' && 
        user.email.validationStatus === 'success' && 
        user.username.validationStatus === 'success' &&
        user.password.validationStatus === 'success');
  }

  const handleSubmit = () => {
    const signupRequest = {
      name:user.name.value,
      username:user.username.value,
      email:user.email.value,
      password:user.password.value
    }
    // signUp(signupRequest)
    //   .then(response => {
    //     console.log("user created");
    //     redirect("/login");
    //   }).catch(error=>{
    //     console.log("something went wrong");
    //   })
  }

  
  return (
    <div className='signup-container'>
      <h1 style={{textAlign:"center"}}>Sign up</h1>
      <div className='signup-content'>
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Full Name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input 
          name="name"
          size='large'
          placeholder='Your full name'
          value={user.name.value}
          onChange={(event) =>handleInputChange(event, validateName)}/>
      </Form.Item>
      <Form.Item
        label="Username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input 
          name="username"
          size='large'
          placeholder='A unique username'
          value={user.username.value}
          onBlur={validateUsernameAvailability}
          onChange={(event) =>handleInputChange(event, validateUsername)}/>
      </Form.Item>
      <Form.Item
        label="Email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input 
          name="email"
          type='email'
          size='large'
          placeholder='Your email'
          value={user.email.value}
          onBlur={validateEmailAvailability}
          onChange={(event) =>handleInputChange(event, validateEmail)}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          size='large'
          name='password'
          placeholder='a password between 6 and 20 characters'
          value={user.password.value}
          onChange={event => handleInputChange(event, validatePassword)} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" size='large'
                disabled={isFormInvalid()}
                > 
          Sing up
        </Button>
        Already registered<Link to="/login">  Login now!</Link>
      </Form.Item>
    </Form>
      </div>
    </div>
  );
}

export default SignUp