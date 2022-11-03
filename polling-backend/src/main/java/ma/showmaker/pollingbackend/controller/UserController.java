package ma.showmaker.pollingbackend.controller;

import ma.showmaker.pollingbackend.exception.ResourceNotFoundException;
import ma.showmaker.pollingbackend.model.User;
import ma.showmaker.pollingbackend.payload.*;
import ma.showmaker.pollingbackend.repository.PollRepository;
import ma.showmaker.pollingbackend.repository.UserRepository;
import ma.showmaker.pollingbackend.repository.VoteRepository;
import ma.showmaker.pollingbackend.security.CurrentUser;
import ma.showmaker.pollingbackend.security.UserPrincipal;
import ma.showmaker.pollingbackend.service.PollService;
import ma.showmaker.pollingbackend.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private PollService pollService;


    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal userPrincipal){
        UserSummary profile = new UserSummary(userPrincipal.getId(), userPrincipal.getUsername(), userPrincipal.getName());
        return profile;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentity checkUsernameAvailability(@RequestParam("username") String username){
            boolean isAvailable = userRepository.existsByUsername(username);
            return new UserIdentity(!isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentity checkEmailAvailability(@RequestParam("email") String email){
        boolean isAvailable = userRepository.existsByEmail(email);
        return new UserIdentity(!isAvailable);
    }

    @GetMapping("/user/{username}")
    public UserProfile getUserProfile(@PathVariable("username") String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        long pollCount = pollRepository.countByCreatedBy(user.getId());
        long voteCount = voteRepository.countByUserId(user.getId());

        return new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getCreatedAt(), pollCount, voteCount);
    }

    @GetMapping("/user/{username}/polls")
    public PagedResponse<PollResponse> getPollCreatedBy(@PathVariable("username") String username,
                                                        @CurrentUser UserPrincipal currentUser,
                                                        @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                        @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size){
        return pollService.getPollsCreatedBy(username, currentUser, page, size);
    }

    @GetMapping("/user/{username}/votes")
    public PagedResponse<PollResponse> getPollsVotedBy(@PathVariable(value = "username") String username,
                                                       @CurrentUser UserPrincipal currentUser,
                                                       @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                       @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE)int size){
        return pollService.getPollsVotedBy(username, currentUser, page, size);
    }




}
