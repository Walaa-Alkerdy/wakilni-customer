import { STATE, ACTION_AUTH, ACTION_RESET } from '../../constants/states'
import defaultState from '../../constants/default_state';

export default (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_AUTH.LOGIN:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, badgeCount: 0, lang: action.data.lang, user: action.data.data, isUserCheckIn: action.data.data.userInfo.isUserCheckIn, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, user: null, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, user: null, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_AUTH.LOGOUT:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, user: null, isUserCheckIn: false, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, user: null, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, user: null, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_AUTH.IS_TOKEN_VALID:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_RESET.RESET:
            return { ...state, state: action.state, action: action.type }
            break;
    }
}