import { CheckCircleOutlined} from '@ant-design/icons'
import { Avatar, Button, Divider, Radio } from 'antd'
import { Link } from 'react-router-dom'
import {Card} from 'antd'

const {Meta} = Card;



const Poll = (props) => {


    const isSelected = (choice) => {
        return props.poll.selectedChoice.id === choice.id;
    }

    const calculatePercentage = (choice) => {
        if(props.poll.totalVotes === 0){
            return 0;
        }
        return (choice.voteCount*100)/(props.poll.totalVotes);
    }
    const getRemainingTime = (poll) => {
        const expirationTime = new Date(poll.expirationDateTime).getTime();
        const now = new Date().getTime();
        
        let difference_ms = expirationTime - now
        let seconds = Math.floor((difference_ms/1000) % 60);
        let minutes = Math.floor((difference_ms /100/60) % 60);
        let hours = Math.floor((difference_ms/(1000*60*60)) % 24);
        let days = Math.floor((difference_ms/(1000*60*60*24)));

        let remainingTime;
        if(days > 0){
            remainingTime = days + " days Left"
        }else if( hours > 0){
            remainingTime = hours + " hours left"
        }else if(minutes > 0){
            remainingTime = minutes + " minutes left";
        }else if (seconds > 0) {
            remainingTime = seconds + " seconds left"
        }else {
            remainingTime = "less than a second left "
        }

        return remainingTime;
    }

    const getWinningChoice = () =>{
        return props.poll.choices.reduce((prevChoice, currentChoice) => 
            currentChoice.voteCount > prevChoice.voteCount ? currentChoice : prevChoice
        );
    }
    const pollChoices = [];
    if(props.poll.selectedChoice || props.poll.expired){
        const winningChoice = props.poll.expired ? getWinningChoice() : null;

        props.poll.choices.forEach(choice => {
            pollChoices.push(
                <CompletedOrVotedPollChoice
                    key={choice.id}
                    choice={choice}
                    isWinner={winningChoice && choice.id === winningChoice.id}
                    isSelected = {isSelected(choice)}
                    percentVote = {calculatePercentage(choice)}
                />
            );
        })
    }else{
        props.poll.choices.forEach(choice => {
            pollChoices.push(<Radio value={choice.id} key={choice.id}>{choice.answer}</Radio>)
        })
    }
    return(
        <div className='poll-content'>



                    {/* TODO  card loading */}
      <Card style={{ width: 500, marginTop: 16, backgroundColor:'lightGray', borderRadius:8 }} 
            bordered={false}
            >

        <Meta
          avatar={<Avatar >{props.poll.createdBy.name[0].toUpperCase()}</Avatar>}
          title= {props.poll.createdBy.username}
          description= {props.poll.creationDateTime}
        />
        <Divider type="horizontal"/>
            <h3>{props.poll.question}</h3>
            <div className='poll-choices'>
                <Radio.Group onChange={props.handleVoteChange} value={props.currentVote} >
                {pollChoices}
                </Radio.Group>
                
            </div>
            <div className='poll-footer'>
                {
                    !(props.poll.selectedChoice || props.poll.expired) ? 
                    (<Button disabled={!props.currentVote===undefined} onClick={props.handleVoteSubmit}>Vote</Button>):null
                }
                <span>
                    {props.poll.totalVotes}
                </span>
                <span>.</span>
                <span className='time-left'>
                    {props.poll.exipred ? 
                        "Final Results":
                        getRemainingTime(props.poll)
                    }
                </span>
            </div>
      </Card>
            
        </div>  
    )
}
const CompletedOrVotedPollChoice = (props) => {
    return (
        <div>
            <span>
                <span>
                    {props.percentVote}%
                </span>
                <span>
                    {props.choice.text}
                </span>
                {
                    props.isSelected ? (
                        <CheckCircleOutlined />
                    ):null
                }
            </span>
            <span style={{width: props.percentVote + '%'}}>
        
            </span>
        </div>
    )
}

export default Poll;