import { STATE, ACTION_RESET, ACTION_UPLOAD_FILE, ACTION_CURRENCIES, ACTION_LOCATION, ACTION_GET_CONSTANTS, ACTION_CONSTANTS } from '../constants/states';
import * as APICommon from '../apis/common';

export const resetState = () => (dispatch) => {

    dispatch({
        type: ACTION_RESET.RESET,
        state: STATE.INTITAL
    })
}

/**
 * Upload File
 * @param {string} accessToken User authorization token
 * @param {object} values File related values
 */
export const uploadFileAction = (accessToken, values, isImageFileUpload) => (dispatch) => {

    dispatch({
        type: isImageFileUpload ? ACTION_UPLOAD_FILE.IMAGE_FILE_UPLOAD : ACTION_UPLOAD_FILE.SIGNATURE_FILE_UPLOAD,
        state: STATE.LOADING
    })
    APICommon.uploadFile(values, accessToken, (result) => {
        dispatch({
            type: isImageFileUpload ? ACTION_UPLOAD_FILE.IMAGE_FILE_UPLOAD : ACTION_UPLOAD_FILE.SIGNATURE_FILE_UPLOAD,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: isImageFileUpload ? ACTION_UPLOAD_FILE.IMAGE_FILE_UPLOAD : ACTION_UPLOAD_FILE.SIGNATURE_FILE_UPLOAD,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const getCurrenciesAction = (accessToken) => (dispatch) => {

    dispatch({
        type: ACTION_CURRENCIES.GET_CURRENCIES,
        state: STATE.LOADING
    })

    APICommon.getCurrencies(accessToken, (result) => {
        dispatch({
            type: ACTION_CURRENCIES.GET_CURRENCIES,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_CURRENCIES.GET_CURRENCIES,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const updateCurrentLatAndLong = (lat, long) => (dispatch) => {

    dispatch({
        type: ACTION_LOCATION.UPDATE_CURRENT_LAT_LONG,
        data: { lat: lat, long: long }
    })
}

export const getConstantsListAPIAction = (accessToken) => (dispatch) => {

    dispatch({
        type: ACTION_CONSTANTS.GET_CONSTANTS,
        state: STATE.LOADING
    })

    APICommon.getConstantsList(accessToken, (result) => {
        dispatch({
            type: ACTION_CONSTANTS.GET_CONSTANTS,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_CONSTANTS.GET_CONSTANTS,
            state: STATE.FAILED,
            data: error
        })
    })
}

export const getAreasAPIActions = () => (dispatch) => {

    dispatch({
        type: ACTION_CONSTANTS.GET_AREAS,
        state: STATE.LOADING
    })

    APICommon.getAreas((result) => {
        dispatch({
            type: ACTION_CONSTANTS.GET_AREAS,
            state: STATE.SUCCESS,
            data: result
        })
    }, (error) => {
        dispatch({
            type: ACTION_CONSTANTS.GET_AREAS,
            state: STATE.FAILED,
            data: error
        })
    })
}