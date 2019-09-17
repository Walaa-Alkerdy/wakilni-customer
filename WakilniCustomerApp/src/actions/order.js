import * as order from '../apis/order';
import { STATE, ACTION_ORDER } from '../constants/states';
import { Orders } from '../apis/core/routes';

export const getOrders = (values) => (dispatch) => {

    dispatch({
        type: ACTION_ORDER.GET_ORDERS,
        state: STATE.LOADING
    })

    order.getOrders(values, (result) => {
        dispatch({
            type: ACTION_ORDER.GET_ORDERS,
            state: STATE.SUCCESS,
            data: result,
            isPaging: values.pageNumber != null ? true : false,
            pageNumber: values.pageNumber
        })
    }, (error) => {

        dispatch({
            type: ACTION_ORDER.GET_ORDERS,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const getOrdersOrHistoryAPI = (values) => (dispatch) => {

    dispatch({
        type: ACTION_ORDER.GET_ORDERS,
        state: STATE.LOADING
    })

    order.getOrdersOrHistory(values.isHistory ? Orders.fetchOrderHistory : Orders.fetchActiveOrders, values, (result) => {
        dispatch({
            type: ACTION_ORDER.GET_ORDERS,
            state: STATE.SUCCESS,
            data: result,
            isPaging: values.pageNumber != null ? true : false,
            pageNumber: values.pageNumber
        })
    }, (error) => {

        dispatch({
            type: ACTION_ORDER.GET_ORDERS,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const createOrder = (values) => (dispatch) => {

    dispatch({
        type: ACTION_ORDER.CREATE_ORDERS,
        state: STATE.LOADING
    })

    order.createOrder(values, (result) => {
        dispatch({
            type: ACTION_ORDER.CREATE_ORDERS,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {

        dispatch({
            type: ACTION_ORDER.CREATE_ORDERS,
            state: STATE.FAILED,
            data: error
        })
    })
}