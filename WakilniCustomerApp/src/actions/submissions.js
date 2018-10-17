import * as submission from '../apis/submission';
import { STATE } from '../constants/states'
import { ACTION_SUBMISSIONS } from '../constants/states';

export const cashAccountDriverSubmissionAction = (accessToken, driverId, body) => (dispatch) => {

    dispatch({
        type: ACTION_SUBMISSIONS.CASH_ACCOUNT_SUBMIT,
        state: STATE.LOADING
    })

    submission.cashAccountSubmission(accessToken, driverId, body, (result) => {
        dispatch({
            type: ACTION_SUBMISSIONS.CASH_ACCOUNT_SUBMIT,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_SUBMISSIONS.CASH_ACCOUNT_SUBMIT,
            state: STATE.FAILED,
            data: error
        })
    })
}