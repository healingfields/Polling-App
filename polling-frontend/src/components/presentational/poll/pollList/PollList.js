import { Button } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import React from 'react'
import { useState } from 'react'
import {Loader} from '../../../common/loader/Loader'
import Poll from '../poll/Poll'
import {POLL_LIST_SIZE} from '../../../../constants'
import {getAllPolls} from '../../../../util/ApiUtils'

const PollList = () => {

  const [polls, setpolls] = useState({
    content:[],
    page:0,
    size:10,
    totalElements:0,
    totalPages:0,
    last:true,
    currentVotes:[],
    isLoading:false
  })

  return (
   
    <div className='polls-container'>
       {
      polls.content.map(poll => {
        <Poll 
          key={poll.id}
          poll={poll}
          />
      })
    }
      {
        polls.isLoading && polls.content.length === 0 ? (
          <div>
              <span>No Polls Found</span>
          </div>
        ):null
      }
      {
        !polls.isLoading && !polls.last ? (
          <div className='load-more-polls'>
            <Button>
              <PlusOutlined/> Load more
            </Button>
            </div>
        ):null
      }
      {
        polls.isLoading ? 
        <Loader/>:null
      }
    </div>
  )
}

export default PollList