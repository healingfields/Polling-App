import { Avatar, Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import { Loader } from '../../../common/loader/Loader';
import { AppleOutlined, AndroidOutlined} from '@ant-design/icons'
import PollList from '../../poll/pollList/PollList';
import { useParams } from 'react-router-dom';
import './Profile.css'
import { getUserProfile } from '../../../../util/ApiUtils';

function Profile(props) {
  let {username} = useParams(); 
  const [user, setUser] = useState({pollCount:32, voteCount:40});
  const [loading, setLoading] = useState(false)

  const loadProfile = (user_name) => {
    setLoading(true);

    getUserProfile(user_name)
    .then(response => {
      setUser(response);
      setLoading(false)
    }).catch(error =>{
      if(error.status===404){
        console.log('username not found');
      }else{
        console.log('server error when fetching user profile');
      }
    })
  }

  useEffect(()=>{
    loadProfile(username)
  },[username])
  if(loading){
    return <Loader/>
  }
  return (
    <div className='profile'>
      {user ? (
        <div className='user-profile'>
          <div className='user-details'>
            <div className='user-avatar'>
            <Avatar style={{ backgroundColor: "black", verticalAlign: 'middle' }} size="large" gap={2}>
              {user.name[0].toUpperCase()}
          </Avatar>
            </div>
            <div className='user-summary'>
              <div className='full-name'>{user.name}</div>
              <div className='username'>{user.username}</div>
              <div className='user-joined'>
                Joined {user.joinedAt}
              </div>
            </div>
          </div>
          <div className='user-polls'>
          <Tabs defaultActiveKey="1" centered size='large'>
            <Tabs.TabPane tab={<><AndroidOutlined/><span>{user.pollCount} Polls</span></>} key="1">
              {/* <PollList username={username} type="USER_CREATED_POLLS" /> */}
            </Tabs.TabPane>
            <Tabs.TabPane tab={<><AndroidOutlined/><span>{user.voteCount} Votes</span></>} key="2">
              {/* <PollList username={username} type="USER_VOTED_POLLS"/> */}
            </Tabs.TabPane>
          </Tabs>
          </div>
        </div> 
      ):null}
    </div>
  )
}

export default Profile