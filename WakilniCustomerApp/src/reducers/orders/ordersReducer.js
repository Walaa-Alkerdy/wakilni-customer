import { STATE, ACTION_ORDER } from '../../constants/states'
import locals from '../../localization/local';

export default (state, action) => {
    switch (action.type) {
        case ACTION_ORDER.GET_ORDERS:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, customerOrders: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, customerOrders: [], errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, customerOrders: [], errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_ORDER.CREATE_ORDERS:
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
    }
}