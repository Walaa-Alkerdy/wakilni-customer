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
                    return { ...state, newReceiverLocation: action.data.newReceiverLocation, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_CUSTOMER.GET_CUSTOMER_RECIPIENTS:
            switch (action.state) {
                case STATE.SUCCESS:
                    let temp = action.data.data ? action.data.data : []

                    if (action.pageNumber != null) {
                        if (action.pageNumber != 1) {//not the first page
                            if (action.isPaging) {
                                temp = state.customerRecipients
                                action.data.data.forEach((task) => {
                                    temp.push(task)
                                })
                            }
                        }
                    }

                    return {
                        ...state,
                        customerRecipients: temp,
                        canLoadMoreCustomerRecipients: action.isPaging ? action.data.meta.pagination.current_page >= action.data.meta.pagination.total_pages ? false : true : true,
                        successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully,
                        currentCustomerRecipientPages: action.data.meta ? action.data.meta.pagination ? action.data.meta.pagination.current_page : 0 : 0,
                        totalCustomerRecipientPages: action.data.meta ? action.data.meta.pagination ? action.data.meta.pagination.total_pages : 0 : 0,
                        state: action.state,
                        action: action.type
                    }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
    }
}