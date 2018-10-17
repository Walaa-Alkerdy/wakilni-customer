import * as ApiLocation from '../apis/location';
import {
     STATE, ACTION_LOCATION
} from '../constants/states';

/**
 * Fetch driver tasks
 * @param {object} values Values for request
 */
export const getLocations = (values) => (dispatch) => {

    dispatch({
        type: ACTION_LOCATION.GET_LOCATIONS,
        state: STATE.LOADING
    })

    ApiLocation.getLocations(values, (result) => {
        dispatch({
            type: ACTION_LOCATION.GET_LOCATIONS,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_LOCATION.GET_LOCATIONS,
            state: STATE.FAILED,
            data: error
        })
    })
}

/**
 * create customer location
 */
export const createCustomerLocation = (values) => (dispatch) => {

    dispatch({
        type: ACTION_LOCATION.CREATE_LOCATION,
        state: STATE.LOADING
    })

    ApiLocation.createCustomerLocation(values, (result) => {
        dispatch({
            type: ACTION_LOCATION.CREATE_LOCATION,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_LOCATION.CREATE_LOCATION,
            state: STATE.FAILED,
            data: error
        })
    })
}