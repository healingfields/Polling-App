import { Avatar, Tabs } from 'antd';
import React, { useState } from 'react'
import { Loader } from '../../../common/loader/Loader';
import { AppleOutlined, AndroidOutlined} from '@ant-design/icons'
import PollList from '../../poll/pollList/PollList';
import { useParams } from 'react-router-dom';
import './Profile.css'

function Profile() {
  let {username} = useParams(); 
  const [user, setUser] = useState({pollCount:32, voteCount:40});
  const [loading, setLoading] = useState(false)
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
              ID
          </Avatar>
            </div>
            <div className='user-summary'>
              <div className='full-name'>idriss Iharratene</div>
              <div className='username'>showMaker</div>
              <div className='user-joined'>
                10/20/2022
              </div>
            </div>
          </div>
          <div className='user-polls'>
          <Tabs defaultActiveKey="1" centered size='large'>
            <Tabs.TabPane tab={<><AndroidOutlined/><span>{user.pollCount} Polls</span></>} key="1">
              <PollList username={username} type="USER_CREATED_POLLS" />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<><AndroidOutlined/><span>{user.voteCount} Votes</span></>} key="2">
              <PollList username={username} type="USER_VOTED_POLLS"/>
            </Tabs.TabPane>
          </Tabs>
          </div>
        </div> 
      ):null}
    </div>
  )
}

export default Profile