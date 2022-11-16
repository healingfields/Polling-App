import {API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN} from '../constants/index';


const request = (options) => {
    //options are usually the given url and method type plus the payload
    const headers = new Headers({
        'Content-Type':'application/json',
    })
    //checking for access token in local storage 
    if(localStorage.getItem(ACCESS_TOKEN)){
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    //merging the defaults with the given options
    options = Object.assign({}, defaults, options)
    console.log("request");
    return fetch(options.url, options)
    .then(response =>
        response.json().then(json=>{
            if(!response.ok){
                return Promise.reject(json)
            }
            return json;
        })
    )
}

//funtion that request all the polls paged 
export function getAllPolls(page, size){
    page = page || 0;
    size = size || 0;
    
    return request({
        url: API_BASE_URL+"/polls?page=" +page + "&size=" +size,
        method: 'GET'
    });
}

//function that creates a poll
export function createPoll(pollData){
    console.log("create poll ");
    return request({
        url: API_BASE_URL + "/polls",
        method: 'POST', 
        body: JSON.stringify(pollData)
    });
}

//function that casts a vote on a specific poll
export function castVote(voteData){
    return request({
        url:API_BASE_URL+ "/polls/" + voteData.pollId + "/votes",
        method: 'POST',
        body: JSON.stringify(voteData)
    });
}

//function that logs in a user 
export function login(loginData){
    return request({
        url: API_BASE_URL + "/auth/signIn",
        method: 'POST', 
        body: JSON.stringify(loginData)
    })
}

//function that signs up a user
export function signUp(signUpData){
    return request({
        url:API_BASE_URL+ "/auth/signUp",
        method: 'POST',
        body: JSON.stringify(signUpData)
    });
}

//function that checks a user name availability
export function checkUsernameAvailability(username){
    return request({
        url: API_BASE_URL+ "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

//function that checks a user email availability
export function checkEmailAvailability(email){
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    })
}

//function that gets the current user
export function getCurrentUser(ACCESS_TOKEN){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("No access token set");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

//function that gets a user profile based on his username
export function getUserProfile(username){
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    })
}

//function that gets a user created polls
export function getUserCreatedPolls(username, page, size){
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL+"users/" + username + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    })
}

//function that get the voted polls by a user
export function getUserVotedPolls(username, page, size){
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/votes?page=" + page + "&size=" + size,
        method: "GET"
    });
}