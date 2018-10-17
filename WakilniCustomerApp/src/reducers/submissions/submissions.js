import { STATE, ACTION_SUBMISSIONS} from '../../constants/states'
import defaultState from '../../constants/default_state';
import locals from '../../localization/local';

export default (state, action) => {
    switch (action.type) {
        case ACTION_SUBMISSIONS.CASH_ACCOUNT_SUBMIT:
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