import { STATE, ACTION_UPLOAD_FILE, ACTION_USER, ACTION_CURRENCIES, ACTION_CONSTANTS } from '../../constants/states'
import defaultState from '../../constants/default_state';
import locals from '../../localization/local';

export default (state, action) => {
    switch (action.type) {
        case ACTION_UPLOAD_FILE.SIGNATURE_FILE_UPLOAD:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, signatureId: action.data.data.id, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_UPLOAD_FILE.IMAGE_FILE_UPLOAD:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, imageId: action.data.data.id, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_USER.CHANGE_PASSWORD:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_CURRENCIES.GET_CURRENCIES:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, currencies: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, action: action.type }
                case STATE.FAILED:
                    return { ...state, currencies: [], errorMessage: action.data, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', action: action.type };
                case STATE.INTITAL:
                    return { ...state, action: action.type };
            }
            break;
        case ACTION_CONSTANTS.GET_CONSTANTS:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, constantsList: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, constantsList: null, errorMessage: action.data, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', action: action.type };
                case STATE.INTITAL:
                    return { ...state, action: action.type };
            }
            break;
        case ACTION_CONSTANTS.GET_AREAS:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, areas: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, areas: [], errorMessage: action.data, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', action: action.type };
                case STATE.INTITAL:
                    return { ...state, action: action.type };
            }
            break;
        case ACTION_USER.GET_USER_INFO:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, user: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_USER.UPDATE_USER_INFO:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, user: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;

    }
}