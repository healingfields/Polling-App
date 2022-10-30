package ma.showmaker.pollingbackend.service;

import ma.showmaker.pollingbackend.exception.BadRequest;
import ma.showmaker.pollingbackend.exception.ResourceNotFoundException;
import ma.showmaker.pollingbackend.model.ChoiceVoteCount;
import ma.showmaker.pollingbackend.model.Poll;
import ma.showmaker.pollingbackend.model.User;
import ma.showmaker.pollingbackend.model.Vote;
import ma.showmaker.pollingbackend.payload.PagedResponse;
import ma.showmaker.pollingbackend.payload.PollResponse;
import ma.showmaker.pollingbackend.repository.PollRepository;
import ma.showmaker.pollingbackend.repository.UserRepository;
import ma.showmaker.pollingbackend.repository.VoteRepository;
import ma.showmaker.pollingbackend.security.UserPrincipal;
import ma.showmaker.pollingbackend.util.AppConstants;
import ma.showmaker.pollingbackend.util.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PollService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private VoteRepository voteRepository;

    public PagedResponse<PollResponse> getPollsCreatedBy(String username,
                                                         UserPrincipal userPrincipal,
                                                         int page,
                                                         int size
                                                        ){
        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new ResourceNotFoundException("User", "username", username));

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Poll> polls = pollRepository.findByCreatedBy(user.getId(), pageable);

        if(polls.getNumberOfElements() == 0){
            return new PagedResponse<>(Collections.emptyList(), polls.getNumber(), polls.getSize(),
                    polls.getTotalElements(), polls.getTotalPages(), polls.isLast());
        }

        List<Long> pollIds = polls.map(Poll::getId).getContent();
        Map<Long, Long> choiceVoteCountMap= getChoiceVoteCountMap(pollIds);
        Map<Long, Long> pollUserVoteMap = getPollUserVoteMap(userPrincipal, pollIds);

        List<PollResponse> pollResponses = polls.map(poll -> {
            return ModelMapper.mapPollToPollResponse(poll,
                    choiceVoteCountMap,
                    user,
                    pollUserVoteMap == null ? null : pollUserVoteMap.getOrDefault(poll.getId(), null));
        }).getContent();

        return new PagedResponse<>(pollResponses, polls.getNumber(), polls.getSize(), polls.getTotalElements(),
                polls.getTotalPages(), polls.isLast());
    }
    private Map<Long, Long> getChoiceVoteCountMap(List<Long> pollIds){
            List<ChoiceVoteCount> votes = voteRepository.countByPollIdInGroupByChoiceId(pollIds);

            Map<Long, Long> choiceVotesMap = votes.stream()
                    .collect(Collectors.toMap(ChoiceVoteCount::getChoiceId, ChoiceVoteCount::getVoteCount));

            return choiceVotesMap;
    }

    private Map<Long, Long> getPollUserVoteMap(UserPrincipal currentUser, List<Long> pollIds){
        Map<Long, Long> pollUserVoteMap = null;
        if(currentUser != null){
            List<Vote> userVotes = voteRepository.findByUserIdAndPollIdIn(currentUser.getId(), pollIds);
            pollUserVoteMap = userVotes.stream()
                    .collect(Collectors.toMap(vote -> vote.getPoll().getId(), vote -> vote.getChoice().getId()));
        }
        return pollUserVoteMap;
    }



    public void validatePageNumberAndSize(int page ,int size){
        if(page<0){
            throw new BadRequest("Page number cant be less than zero");
        }
        if(size > AppConstants.MAX_PAGE_SIZE){
            throw new BadRequest("size cant be higher than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
}
