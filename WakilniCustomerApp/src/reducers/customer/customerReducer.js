import { STATE, ACTION_CUSTOMER } from '../../constants/states'
import defaultState from '../../constants/default_state';

export default (state = defaultState, action) => {
    switch (action.type) {
        case ACTION_CUSTOMER.CREATE_CUSTOMER:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, user: action.data.data, isUserCheckIn: action.data.data.userInfo.isUserCheckIn, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_CUSTOMER.CREATE_NEW_RECEIVER:
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
    }
}