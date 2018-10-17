import * as staff from '../apis/staff';
import { ACTION_AUTH, STATE, ACTION_DATABASE, ACTION_RESET, ACTION_DRIVER, ACTION_USER, ACTION_MESSAGES, ACTION_STAFF, ACTION_TASKS } from '../constants/states';

export const checkInAPIAction = (values) => (dispatch) => {

    dispatch({
        type: ACTION_STAFF.CHECK_IN,
        state: STATE.LOADING
    })

    staff.checkIn(values, (result) => {
        dispatch({
            type: ACTION_STAFF.CHECK_IN,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_STAFF.CHECK_IN,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const checkOutAPIAction = (values) => (dispatch) => {

    dispatch({
        type: ACTION_STAFF.CHECK_OUT,
        state: STATE.LOADING
    })

    staff.checkOut(values, (result) => {
        dispatch({
            type: ACTION_STAFF.CHECK_OUT,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_STAFF.CHECK_OUT,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const fetchTimeSheet = (accessToken, userId) => (dispatch) => {

    dispatch({
        type: ACTION_STAFF.GET_TIME_SHEET,
        state: STATE.LOADING
    })

    staff.getTimeSheet(accessToken, userId, (result) => {
        dispatch({
            type: ACTION_STAFF.GET_TIME_SHEET,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_STAFF.GET_TIME_SHEET,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const updateCheckInOutStatusAction = (values) => (dispatch) => {

    dispatch({
        type: ACTION_USER.UPDATE_CHECK_IN_OUT_STATUS,
        data: values.status,
        state: STATE.INTITAL
    })
}