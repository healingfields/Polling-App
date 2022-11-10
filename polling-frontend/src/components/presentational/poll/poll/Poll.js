import { CheckCircleOutlined} from '@ant-design/icons'
import { Avatar, Button, Radio } from 'antd'
import { Link } from 'react-router-dom'


const Poll = () => {

    getRemainingTime = (poll) => {
        const expirationTime = new Date(poll.expirationDateTime).getTime();
        const now = new Date().getTime();

        //Todo 


    }


    return(
        <div className='poll-content'>
            <div className='poll-header'>
                <div className='poll-creator-info'>
                    <Link>
                        <Avatar> 
                            {props.poll.createdBy.name[0].toUpperCase()}
                        </Avatar>
                        <span>
                            {props.poll.createdBy.name}
                        </span>
                        <span>
                            {props.poll.createBy.username}
                        </span>
                        <span>
                            {props.poll.creationDateTime}
                        </span>
                    </Link>
                </div>
                <div className='poll-question'>
                    {props.poll.question}
                </div>
            </div>
            <div className='poll-choices'>
                <Radio.Group>
                    {

                    }
                </Radio.Group>
            </div>
            <div className='poll-footer'>
                {
                    !(props.poll.selectedChoice || props.poll.expired) ? 
                    (<Button>Vote</Button>):null
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