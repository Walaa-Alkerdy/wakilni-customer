import { STATE, ACTION_STAFF, ACTION_RESET, ACTION_USER } from '../../constants/states'
import defaultState from '../../constants/default_state';
import locals from '../../localization/local';

export default (state, action) => {
    switch (action.type) {
        case ACTION_STAFF.GET_TIME_SHEET:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, timeSheet: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type, errorMessage: '' }
                case STATE.FAILED:
                    return { ...state, timeSheet: [], errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, timeSheet: [], errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_STAFF.CHECK_IN:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, checkInData: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, checkInData: null, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, checkInData: null, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_STAFF.CHECK_OUT:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, checkOutData: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, checkOutData: null, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, checkOutData: null, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_USER.UPDATE_CHECK_IN_OUT_STATUS:
            return { ...state, isUserCheckIn: action.data, state: action.state, action: action.type }
        case ACTION_RESET.RESET:
            return { ...state, state: action.state, action: action.type }
            break;
    }
}