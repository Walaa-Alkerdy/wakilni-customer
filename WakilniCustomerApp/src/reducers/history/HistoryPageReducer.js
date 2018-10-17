import { STATE, ACTION_TASKS, ACTION_RESET } from '../../constants/states'
import defaultState from '../../constants/default_state';
import locals from '../../localization/local';

export default (state, action) => {
    switch (action.type) {
        case ACTION_TASKS.SHOW_DRIVER_TASKS_HISTORY:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, historyList: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, historyList: [], errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, historyList: [], errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_RESET.RESET:
            return { ...state, state: action.state, action: action.type }
            break;
    }
}