import * as messages from '../apis/messages';
import { STATE, ACTION_RECIPIENTS } from '../constants/states';

export const getContactRecipientAPIAction = (accessToken) => (dispatch) => {

    dispatch({
        type: ACTION_RECIPIENTS.GET_CONTACT_RECIPIENTS,
        state: STATE.LOADING
    })

    messages.getContactRecipients(accessToken, (result) => {
        dispatch({
            type: ACTION_RECIPIENTS.GET_CONTACT_RECIPIENTS,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_RECIPIENTS.GET_CONTACT_RECIPIENTS,
            state: STATE.FAILED,
            data: error
        })
    })
}