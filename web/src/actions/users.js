import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import store from 'store';
import Config from '../Config';

export const REQUEST_USERS_BY_SKILL = 'REQUEST_USERS_BY_SKILL';
export const RECEIVE_USERS_BY_SKILL = 'RECEIVE_USERS_BY_SKILL';

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const REQUEST_USER_BY_ID = 'REQUEST_USER_BY_ID';
export const RECEIVE_USER_BY_ID = 'RECEIVE_USER_BY_ID';

export function requestUsersBySkill(skillId) {
    return {
        type: REQUEST_USERS_BY_SKILL,
        payload: {
            skillId: skillId
        }
    }
}

export function fetchUsersBySkill(skillId) {
    return (dispatch) => {

        dispatch(requestUsersBySkill(skillId));

        const config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'token': store.get('token')
            }
        };

        return fetch(`${Config.apiURL}/skills/${skillId}/users`, config)
            .then((response) => {
                if (response.status >= 400 && response.status <= 403) {
                    dispatch(browserHistory.push('/signin'));
                } else {
                    return response.json();
                }
            })
            .then(json => dispatch(receiveUsersBySkill(json, skillId)));
    }
}

export function requestUsers() {
    return {
        type: REQUEST_USERS
    }
}

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        payload: {
            users: users
        }
    }
}

export function receiveUsersBySkill(users, skillId) {
    return {
        type: RECEIVE_USERS_BY_SKILL,
        payload: {
            users: users,
            skillId: skillId
        }
    }
}

export function fetchUsers() {
    return (dispatch) => {
        dispatch(requestUsers());

        const config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'token': store.get('token')
            }
        };

        return fetch(`${Config.apiURL}/users`, config)
            .then((response) => {
                if (response.status >= 400 && response.status <= 403) {
                    dispatch(browserHistory.push('/signin'));
                } else {
                    return response.json();
                }
            })
            .then(json => dispatch(receiveUsers(json)))
    };
}