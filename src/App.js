import './App.css';
import {Steps, Form, Input, Button} from "antd"
import {LoginOutlined, CheckCircleOutlined, ProfileOutlined } from "@ant-design/icons"
import { useState } from 'react';

function App() {

  const [current, setCurrent] = useState(0)
  const [loginDetails, setLoginDetails] =useState(null)
  const [profileDetails, setProfileDetails] = useState(null)

  const onFinishLoginForm=(values)=>{
    setLoginDetails(values);
    setCurrent(1)
  }
  
  const onFinishProfileForm=(values)=>{
    setProfileDetails(values);
    setCurrent(2)
  }

  const forms = [
    <LoginForm onFinish={onFinishLoginForm} initialvalues={loginDetails}className='login'/>,
    <ProfileForm onFinish={onFinishProfileForm} initialvalues={profileDetails}className='login'/>,
    <Finish />,
  ];

  const isStepDisable=(stepNumber)=>{
    if(stepNumber === 0){
      return false
  }
  if(stepNumber === 1){
    return loginDetails === null
  }

  if(stepNumber === 2){
    return loginDetails === null || profileDetails === null 
  }
}
  return (
    <div className="App">
      <Steps 
      style={{padding:"32px 16px"}}
        onChange={setCurrent}
        current = {current}
      >
        <Steps.Step 
          disabled={isStepDisable(0)} 
          title="Login" icon={<LoginOutlined/>}>
         </Steps.Step>
        <Steps.Step 
          disabled={isStepDisable(1)} 
          title="Profile" icon={<ProfileOutlined/>}>
        </Steps.Step>
        <Steps.Step 
          disabled={isStepDisable(2)}
          title="Finish" 
          icon={<CheckCircleOutlined/>}>
        </Steps.Step>
      </Steps>
      {forms[current]}
    </div>
  )
};

function LoginForm({onFinish, initialvalues}){
  return (
  <Form onFinish={onFinish} initialvalues={initialvalues}>
    <Form.Item label ='Email' name={'emailAdress'} 
      rules={[
        {
          required:true, 
          type:'email', 
          message:'Please enter a valid email'
        }
      ]}>
      <Input/>
    </Form.Item>
    <Form.Item label ='Password' name={'password'}
    rules={[
      {
        required:true, 
        type:'password', 
        message:'Please enter your password'
        }
    ]}>
      <Input.Password/>
    </Form.Item>
    <Button type='primary' htmlType='submit'>Continue</Button>
  </Form>
  )
}

function ProfileForm({onFinish, initialvalues}){
  return (
<Form className='form' onFinish={onFinish} initialvalues= {initialvalues}>
    <Form.Item label ='First Name' name={'firstname'} 
      rules={[
        {
          required:true, 
          message:'Please enter your first name'
          }
      ]}>
      <Input/>
    </Form.Item>
    <Form.Item label ='Last Name' name={'lastname'}
    rules={[
      {
        required:true, 
        message:'Please enter your last name'
        }
    ]}>
      <Input/>
    </Form.Item>

    <Button type='primary' htmlType='submit'>
      Continue
    </Button>
  </Form>
  )
}

  function Finish (){
    return <>
    <h1>You are all set!</h1>
    <Button type='primary'>Finish</Button>
    </>
  }

export default App;
