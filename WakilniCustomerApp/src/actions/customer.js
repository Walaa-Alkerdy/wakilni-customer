import { STATE, ACTION_CUSTOMER } from '../constants/states';
import * as APICustomer from '../apis/customer';

export const createCustomerAction = (values) => (dispatch) => {

    dispatch({
        type: ACTION_CUSTOMER.CREATE_CUSTOMER,
        state: STATE.LOADING
    })
    APICustomer.createCustomer(values, (result) => {
        dispatch({
            type: ACTION_CUSTOMER.CREATE_CUSTOMER,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_CUSTOMER.CREATE_CUSTOMER,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const createNewReceiver = (values) => (dispatch) => {

    dispatch({
        type: ACTION_CUSTOMER.CREATE_NEW_RECEIVER,
        state: STATE.LOADING
    })
    APICustomer.createNewReceiver(values, (result) => {
        dispatch({
            type: ACTION_CUSTOMER.CREATE_NEW_RECEIVER,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_CUSTOMER.CREATE_NEW_RECEIVER,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const getCustomerRecipients = (values) => (dispatch) => {

    dispatch({
        type: ACTION_CUSTOMER.GET_CUSTOMER_RECIPIENTS,
        state: STATE.LOADING
    })
    APICustomer.fetchCustomerRecipients(values, (result) => {
        dispatch({
            type: ACTION_CUSTOMER.GET_CUSTOMER_RECIPIENTS,
            state: STATE.SUCCESS,
            data: result,
            isPaging: values.pageNumber != null ? true : false,
            pageNumber: values.pageNumber
        })
    }, (error) => {
        dispatch({
            type: ACTION_CUSTOMER.GET_CUSTOMER_RECIPIENTS,
            state: STATE.FAILED,
            data: error
        })
    })
}