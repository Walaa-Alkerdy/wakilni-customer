import * as messages from '../apis/messages';
import { ACTION_AUTH, STATE, ACTION_DATABASE, ACTION_RESET, ACTION_DRIVER, ACTION_USER, ACTION_MESSAGES, ACTION_STAFF, ACTION_TASKS } from '../constants/states';
import { MESSAGE } from "../constants/object_types";


export const requestAnOrderAction = (values) => (dispatch) => {

    dispatch({
        type: ACTION_DRIVER.REQUEST_AN_ORDER,
        state: STATE.LOADING
    })

    messages.requestAnOrder(values, (result) => {
        dispatch({
            type: ACTION_DRIVER.REQUEST_AN_ORDER,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_DRIVER.REQUEST_AN_ORDER,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const requestALeaveAction = (values, contentTypeId, accessToken) => (dispatch) => {

    dispatch({
        type: ACTION_DRIVER.REQUEST_A_LEAVE,
        state: STATE.LOADING
    })

    messages.requestALeave(values.label, values.message, values.id, contentTypeId, accessToken, (result) => {
        dispatch({
            type: ACTION_DRIVER.REQUEST_A_LEAVE,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_DRIVER.REQUEST_A_LEAVE,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const getAlertsAPIAction = (accessToken, showLoader, pageNumber) => (dispatch) => {

    //if show loader == false ==> is in main page
    if (showLoader == true) {
        dispatch({
            type: ACTION_MESSAGES.SHOW_ALERTS,
            state: STATE.LOADING
        })
    } else {
        dispatch({
            type: ACTION_MESSAGES.SHOW_ALERTS_MAIN_PAGE,
            state: STATE.LOADING
        })
    }

    messages.getAlerts(accessToken, pageNumber, (result) => {
        dispatch({
            type: showLoader ? ACTION_MESSAGES.SHOW_ALERTS : ACTION_MESSAGES.SHOW_ALERTS_MAIN_PAGE,
            state: STATE.SUCCESS,
            data: result,
            isPaging: pageNumber != null ? true : false,
            pageNumber: pageNumber
        })
    }, (error) => {

        dispatch({
            type: showLoader ? ACTION_MESSAGES.SHOW_ALERTS : ACTION_MESSAGES.SHOW_ALERTS_MAIN_PAGE,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const updateAlertsToReadAPIAction = (accessToken) => (dispatch) => {

    dispatch({
        type: ACTION_MESSAGES.UPDATE_ALERTS,
        state: STATE.LOADING
    })

    messages.updateAlertsToRead(accessToken, (result) => {
        dispatch({
            type: ACTION_MESSAGES.UPDATE_ALERTS,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_MESSAGES.UPDATE_ALERTS,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const getMessagesAPIAction = (values, showLoader, isMyRequests) => (dispatch) => {

    if (showLoader == true) {
        dispatch({
            type: isMyRequests ? ACTION_MESSAGES.SHOW_MY_REQUESTS : ACTION_MESSAGES.SHOW_MESSAGES,
            state: STATE.LOADING
        })

        messages.getMessages(values, (result) => {
            dispatch({
                type: isMyRequests ? ACTION_MESSAGES.SHOW_MY_REQUESTS : ACTION_MESSAGES.SHOW_MESSAGES,
                state: STATE.SUCCESS,
                data: result
            })
        }, (error) => {

            dispatch({
                type: isMyRequests ? ACTION_MESSAGES.SHOW_MY_REQUESTS : ACTION_MESSAGES.SHOW_MESSAGES,
                state: STATE.FAILED,
                data: error
            })
        })
    } else {
        dispatch({
            type: ACTION_MESSAGES.SHOW_MESSAGES_MAIN_PAGE,
            state: STATE.LOADING
        })

        messages.getMessages(values, (result) => {
            dispatch({
                type: ACTION_MESSAGES.SHOW_MESSAGES_MAIN_PAGE,
                state: STATE.SUCCESS,
                data: result
            })
        }, (error) => {

            dispatch({
                type: ACTION_MESSAGES.SHOW_MESSAGES_MAIN_PAGE,
                state: STATE.FAILED,
                data: error
            })
        })
    }
}

export const getMessageDetailsAPIAction = (values) => (dispatch) => {

    dispatch({
        type: ACTION_MESSAGES.SHOW_MESSAGE_DETAILS,
        state: STATE.LOADING
    })

    messages.getMessageDetails(values, (result) => {
        dispatch({
            type: ACTION_MESSAGES.SHOW_MESSAGE_DETAILS,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_MESSAGES.SHOW_MESSAGE_DETAILS,
            state: STATE.FAILED,
            data: error
        })
    })
}

//request flag if true for inner page else for outer notification page
export const replyToDriverRequest = (accessToken, messageId, contentTypeId, message, action, values, requestFlag) => (dispatch) => {

    let type = null;

    if (requestFlag == 0) {

        type = ACTION_DRIVER.REPLY_TO_REQUEST_NOTIFICATION_PAGE;

    } else if (requestFlag == 1) {

        type = ACTION_DRIVER.REPLY_TO_REQUEST;

    } else if (requestFlag == 2) {

        type = ACTION_DRIVER.REPLY_TO_REQUEST_CAN_HELP
    }

    dispatch({
        type: type,
        state: STATE.LOADING
    })

    // contentTypeId == 43 if sent
    messages.replyToDriverRequest(messageId, message, contentTypeId, action, accessToken, values, (result) => {
        dispatch({
            type: type,
            state: STATE.SUCCESS,
            data: result
        });
    }, (error) => {
        dispatch({
            type: type,
            state: STATE.FAILED,
            data: error
        })
    });
}