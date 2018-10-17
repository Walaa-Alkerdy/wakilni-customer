import * as me from '../apis/me';
import { ACTION_AUTH, STATE, ACTION_DATABASE, ACTION_RESET, ACTION_DRIVER, ACTION_USER, ACTION_MESSAGES, ACTION_STAFF, ACTION_TASKS } from '../constants/states';

export const isTokenValidAction = (values) => (dispatch) => {

    dispatch({
        type: ACTION_AUTH.IS_TOKEN_VALID,
        state: STATE.LOADING
    })

    me.isTokenValid(values, (result) => {
        dispatch({
            type: ACTION_AUTH.IS_TOKEN_VALID,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_AUTH.IS_TOKEN_VALID,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const loginAPIAction = (values) => (dispatch) => {

    dispatch({
        type: ACTION_AUTH.LOGIN,
        state: STATE.LOADING
    })

    me.loginAPI(values, (result) => {
        dispatch({
            type: ACTION_AUTH.LOGIN,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_AUTH.LOGIN,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const logoutAPIAction = (values) => (dispatch) => {

    dispatch({
        type: ACTION_AUTH.LOGOUT,
        state: STATE.LOADING
    })

    me.logOut(values, (result) => {
        dispatch({
            type: ACTION_AUTH.LOGOUT,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_AUTH.LOGOUT,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const getUserInfoAPIAction = (values) => (dispatch) => {

    dispatch({
        type: ACTION_USER.GET_USER_INFO,
        state: STATE.LOADING
    })

    me.getUserInfo(values, (result) => {
        dispatch({
            type: ACTION_USER.GET_USER_INFO,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_USER.GET_USER_INFO,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const updateUserInfoAPIAction = (accessToken, driverId, email, password, pattern, firstName, lastName, dob, phoneNumber, languageType, fcmToken) => (dispatch) => {

    dispatch({
        type: ACTION_USER.UPDATE_USER_INFO,
        state: STATE.LOADING
    })

    me.updateUserInfo(accessToken, driverId, email, password, pattern, firstName, lastName, dob, phoneNumber, languageType, fcmToken, (result) => {
        dispatch({
            type: ACTION_USER.UPDATE_USER_INFO,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_USER.UPDATE_USER_INFO,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const changePassword = (accessToken, values) => (dispatch) => {

    dispatch({
        type: ACTION_USER.CHANGE_PASSWORD,
        state: STATE.LOADING
    })

    me.changePassword(accessToken, values, (result) => {

        dispatch({
            type: ACTION_USER.CHANGE_PASSWORD,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_USER.CHANGE_PASSWORD,
            state: STATE.FAILED,
            data: error
        })
    })
}