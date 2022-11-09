import React from 'react';
import {Button, Col, Form, Input, Row, Select} from 'antd';
import './NewPoll.css';
import { useState } from 'react';

const {TextArea} = Input;

const daysOptions = [];
for(let i=1; i<8; i++){
  daysOptions.push({
    label: i.toString(),
    value: i.toString()
  })
}
const hoursOptions = [];
for(let i=1; i<25; i++){
  hoursOptions.push({
    label: i.toString(),
    value: i.toString()
  })
}

function NewPoll() {
  

  const [poll, setpoll] = useState({
    question:{
      text:''
    },
    choices:[{
      text:''
    },{
      text:''
    }],
    pollLength:{
      days:1,
      hours:0
    }
  })
  console.log(poll);
  const validateQuestion = (questionText) => {
    if(questionText.length === 0){
      console.log("u need to provide more");
    }else if (questionText.length > 50) {
      console.log("thats too much");
  } else {
      console.log("successfully set the question");
    }
  }
  const handleQuestionChange = (event) => {
    const value = event.target.value;
    validateQuestion(value);
    setpoll({
      ...poll,
      question:{
        text:value
      },
      
    })
    
  }
  const handleChoiceChange = (event, index) =>{
    const value = event.target.value;
    const choices = poll.choices.slice();
    choices[index] = {
      text: value
    }
    setpoll({
      ...poll,
      choices:choices
    })
  }

  const handleDaysChange = (value) => {
    setpoll({
      ...poll,
      pollLength:{
        ...poll.pollLength,
        days:value

      }
    })
  }

  const handleHoursChange = (value) => {
    setpoll({
      ...poll,
      pollLength:{
        ...poll.pollLength,
        hours:value
      }
    })
  }

  //TODO handle Submit
  
  return (
    <div className='new-poll-container' justify="start">
      <h1 className='page-title'>Create Poll</h1>
      
        
        <div className='new-poll-content'>
        <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        rules={[{ required: true, message: 'Please input your username!' }]}
        style={{width:"500px"}}
      >
        <TextArea rows={6} placeholder="Question" onChange={handleQuestionChange}/>
      </Form.Item>
      {poll.choices.map((choice, index)=>{
        return(
        <PollChoice key={index}
                  choice={choice}
                  choiceNumber={index}
                  handleChoiceChange={handleChoiceChange}
        />
        )
      })}

      <Form.Item>
        <Button type="dashed" >Add Choice</Button>
      </Form.Item>

      <Col span={24} style={{marginBottom:'15px'}}>
          Poll Length
        </Col>

      <Form.Item >
        <Select defaultValue="1" 
                value={poll.pollLength.days}
                style={{width:'85%'}}
                allowClear
                options={daysOptions}
                name="days"
                onChange={handleDaysChange}
          /> &nbsp;Days
      </Form.Item>
      <Form.Item >
        <Select defaultValue="0"
                value={poll.pollLength.hours}
                style={{width:'85%'}}
                allowClear
                options={hoursOptions}
                name="hours"
                onChange={handleHoursChange}
          />&nbsp;Hours
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size='large' shape='round' style={{width:'100%'}}>
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div>
    </div>
  )
}

const PollChoice = (props) => {
  return (
    <>
    <Form.Item
    rules={[{ required: true, message: 'Please input your username!' }]}
    style={{width:"500px"}}
  >
    <Input placeholder={'choice ' + (props.choiceNumber + 1)}
          size='large'
          value={props.choice.text}
          onChange={(event) => props.handleChoiceChange(event, props.choiceNumber)}/>
  </Form.Item>
  </>
  )
}

export default NewPoll