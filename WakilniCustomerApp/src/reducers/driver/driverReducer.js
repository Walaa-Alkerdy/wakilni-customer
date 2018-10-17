import { STATE, ACTION_DRIVER } from '../../constants/states'
import defaultState from '../../constants/default_state';
import locals from '../../localization/local';

export default (state, action) => {
    switch (action.type) {
        case ACTION_DRIVER.FETCH:
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
        case ACTION_DRIVER.UPDATE_DRIVER_INFO:
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
        case ACTION_DRIVER.TRACK_LOCATION:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, action: action.type }
                case STATE.FAILED:
                    return { ...state, action: action.type }
                case STATE.LOADING:
                    return { ...state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, action: action.type };
            }
            break;
        case ACTION_DRIVER.GET_PACKAGES:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, packagesList: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, packagesList: [], errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, packagesList: [], errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
    }
}