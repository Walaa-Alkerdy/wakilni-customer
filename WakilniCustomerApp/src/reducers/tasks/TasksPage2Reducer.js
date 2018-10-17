import { STATE, ACTION_TASKS, ACTION_RESET, ACTION_VEHICLES } from '../../constants/states'
import defaultState from '../../constants/default_state';
import locals from '../../localization/local';

export default (state, action) => {
    switch (action.type) {
        case ACTION_VEHICLES.FETCH_VEHICLES:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, vehiclesList: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type, errorMessage: '' }
                case STATE.FAILED:
                    return { ...state, vehiclesList: [], errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, vehiclesList: [], errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_TASKS.START_TASK:
            switch (action.state) {
                case STATE.SUCCESS:
                    var tasks = state.tasksList;
                    tasks.forEach((item, index) => {
                        if (item.taskId == action.data.data.taskId) {
                            tasks[index] = action.data.data;
                        }
                    })
                    return { ...state, tasksList: tasks, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type, errorMessage: '' }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
        case ACTION_TASKS.MARK_AS_COMPLETE:
            switch (action.state) {
                case STATE.SUCCESS:
                    var tasks = state.tasksList;
                    tasks.forEach((item, index) => {
                        if (item.taskId == action.data.data.taskId) {
                            tasks[index] = action.data.data;
                        }
                    })
                    return { ...state, tasksList: tasks, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type, errorMessage: '' }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
        case ACTION_TASKS.MARK_TASK_AS_COMPLETE_CAMERA_PAGE:
            switch (action.state) {
                case STATE.SUCCESS:
                    var tasks = state.tasksList;
                    tasks.forEach((item, index) => {
                        if (item.taskId == action.data.data.taskId) {
                            tasks[index] = action.data.data;
                        }
                    })
                    return { ...state, tasksList: tasks, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type, errorMessage: '' }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
        case ACTION_TASKS.MARK_AS_FAILED:
            switch (action.state) {
                case STATE.SUCCESS:
                    var tasks = state.tasksList ? state.tasksList : [];
                    var historyTasks = state.historyList ? state.historyList : [];

                    if (tasks && tasks.length > 0) {
                        tasks.forEach((item, index) => {
                            if (item.taskId == action.data.data.taskId) {
                                tasks[index] = action.data.data;
                            }
                        })
                    }
                    if (historyTasks && historyTasks.length > 0) {
                        historyTasks.forEach((item, index) => {
                            if (item.taskId == action.data.data.taskId) {
                                historyTasks[index] = action.data.data;
                            }
                        })
                    }
                    return { ...state, tasksList: tasks, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type, errorMessage: '' }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
        case ACTION_TASKS.REOPEN_TASK:
            switch (action.state) {
                case STATE.SUCCESS:

                    var tasks = state.tasksList ? state.tasksList : [];
                    var historyTasks = state.historyList ? state.historyList : [];

                    if (tasks && tasks.length > 0) {
                        tasks.forEach((item, index) => {
                            if (item.taskId == action.data.data.taskId) {
                                tasks[index] = action.data.data;
                            }
                        })
                    }
                    if (historyTasks && historyTasks.length > 0) {
                        historyTasks.forEach((item, index) => {
                            if (item.taskId == action.data.data.taskId) {
                                historyTasks[index] = action.data.data;
                            }
                        })
                    }

                    return { ...state, tasksList: tasks, historyList: historyTasks, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type, errorMessage: '' }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
        case ACTION_RESET.RESET:
            return { ...state, state: action.state, action: action.type }
            break;
    }
}