import { Button } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {Loader} from '../../../common/loader/Loader'
import Poll from '../poll/Poll'
import {POLL_LIST_SIZE} from '../../../../constants'
import {castVote, getAllPolls, getUserCreatedPolls, getUserVotedPolls} from '../../../../util/ApiUtils'
import { useNavigate } from 'react-router-dom'

const PollList = (props) => {

  const navigate = useNavigate();
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

  const loadPollList = (page = 0, size = POLL_LIST_SIZE) => {
    let promise;
    if(props.username){
      if(props.type === 'USER_CREATED_POLLS'){
        promise = getUserCreatedPolls(props.username, page, size)
      }else if(props.type === 'USER_VOTED_POLLS'){
        promise = getUserVotedPolls(props.username, page, size)
      }
    }else{
      promise = getAllPolls(page, size)
    }

    if(!promise){
      return;
    }

    setpolls({
      ...polls,
      isLoading:true
    });

    promise
      .then(response=>{
        setpolls({
          ...polls,
          content: response.content,
          page:response.page,
          size:response.size,
          totalElements:response.totalElements,
          totalPages:response.totalPages,
          last:response.last,
          currentVotes:[...polls.currentVotes, response.currentVotes],
          isLoading:false
        })
      }).catch(error => {
        setpolls({
          ...polls,
          isLoading:false
        })
      })
  }

  useEffect(()=>{
      loadPollList();
  },[polls.page, props.isAuthenticated])

  const loadMore = () =>{
    setpolls({
      ...polls,
      page:polls.page+1
    })
  }

  const handleVoteChange = (event, index) =>{
    setpolls({
      ...polls,
      currentVotes:[...polls.currentVotes, polls.currentVotes[index]=event.target.value]
    })
  }

  const handleVoteSubmit = (event, index) => {
    event.preventDefault();
    if(!props.isAuthenticated){
      navigate("/login");
      //TODO notification
      return;
    }
    const poll = polls.content[index];
    const selectedChoice = polls.currentVotes[index]

    const voteRequest = {
      pollId: poll.id,
      choiceId: selectedChoice
    }

    castVote(voteRequest)
    .then(response => {
      const currentPolls = polls.content.slice();
      currentPolls[index] = response;

      setpolls({
        ...polls,
        content:currentPolls
      })
    }).catch(error=>{
      if(error.status === 401){
        props.handleLogout('/login')
      }else{
        console.log('error happened on the server side');
      }
    })
  }

  return (
   
    <div className='polls-container'>
       {
      polls.content.map((poll, index) => {
        return(
        <Poll 
          key={poll.id}
          poll={poll}
          currentVote={polls.currentVotes[index]}
          handleVoteChange={(event)=>handleVoteChange(event, index)}
          handleVoteSubmit={(event)=>handleVoteSubmit(event,index)}
          />
        )
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
            <Button type='dashed' onClick={loadMore} disabled={polls.isLoading}>
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