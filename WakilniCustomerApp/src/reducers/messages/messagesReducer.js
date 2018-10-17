import { STATE, ACTION_DRIVER, ACTION_RESET, ACTION_RECIPIENTS, ACTION_MESSAGES } from '../../constants/states'
import defaultState from '../../constants/default_state';
import * as ServerStatus from '../../constants/server_states';
import locals from '../../localization/local';
import { NoResultsPage } from '../../components';
import moment from 'moment';

export default (state, action) => {
    switch (action.type) {
        case ACTION_MESSAGES.SHOW_MESSAGES:
            switch (action.state) {
                case STATE.SUCCESS:
                    let badgeCount = action.data.data.filter((item) => { return item.type.id != 26 && item.status == ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_PENDING.key && item.sender.id != state.user.userInfo.contactId }).length + state.alertsList.filter((item) => { return item.readAt == null }).length

                    return { ...state, badgeCount: badgeCount, notificationsList: action.data.data.filter((item) => { return item.type.id != 26 }), successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, notificationsList: [], errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, notificationsList: [], errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_MESSAGES.SHOW_MESSAGES_MAIN_PAGE:
            switch (action.state) {
                case STATE.SUCCESS:
                    let badgeCount = action.data.data.filter((item) => { return item.type.id != 26 && item.status == ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_PENDING.key && item.sender.id != state.user.userInfo.contactId }).length + state.alertsList.filter((item) => { return item.readAt == null }).length

                    return { ...state, badgeCount: badgeCount, action: action.type }
                case STATE.FAILED:
                    return { ...state, action: action.type }
                case STATE.LOADING:
                    return { ...state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, action: action.type };
            }
            break;
        case ACTION_MESSAGES.SHOW_ALERTS:
            switch (action.state) {
                case STATE.SUCCESS:
                    let badgeCount = action.data.data.filter((item) => { return item.readAt == null }).length + state.notificationsList.filter((item) => { return item.type.id != 26 && item.status == ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_PENDING.key && item.sender.id != state.user.userInfo.contactId }).length

                    return { ...state, badgeCount: badgeCount, alertsList: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, alertsList: [], errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, alertsList: [], errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_MESSAGES.SHOW_ALERTS_MAIN_PAGE:
            switch (action.state) {
                case STATE.SUCCESS:
                    let badgeCount = action.data.data.filter((item) => { return item.readAt == null }).length + state.notificationsList.filter((item) => { return item.type.id != 26 && item.status == ServerStatus.NotificationRequests.NOTIFICATION_REQUESTS_PENDING.key && item.sender.id != state.user.userInfo.contactId }).length

                    return { ...state, badgeCount: badgeCount, action: action.type }
                case STATE.FAILED:
                    return { ...state, action: action.type }
                case STATE.LOADING:
                    return { ...state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, action: action.type };
            }
            break;
        case ACTION_MESSAGES.UPDATE_ALERTS:
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
        case ACTION_MESSAGES.SHOW_MESSAGE_DETAILS:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, notificationDetails: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
            break;
        case ACTION_DRIVER.SEND_HELP_MESSAGE:
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
        case ACTION_MESSAGES.SHOW_MY_REQUESTS:
            switch (action.state) {
                case STATE.SUCCESS:

                    let sortedRequests = action.data.data.sort((a, b) => {
                        return moment(b.createdAt.date) - moment(a.createdAt.date)
                    })

                    return { ...state, myRequestsList: sortedRequests, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, myRequestsList: [], errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, myRequestsList: [], errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
        case ACTION_RECIPIENTS.GET_CONTACT_RECIPIENTS:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, contactRecipientsList: action.data.data, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
        case ACTION_DRIVER.REQUEST_A_LEAVE:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
            }
            break;
        case ACTION_RESET.RESET:
            return { ...state, state: action.state, action: action.type }
            break;
        case ACTION_DRIVER.REPLY_TO_REQUEST_NOTIFICATION_PAGE:
        case ACTION_DRIVER.REPLY_TO_REQUEST_CAN_HELP:
        case ACTION_DRIVER.REPLY_TO_REQUEST:
            switch (action.state) {
                case STATE.SUCCESS:

                    var notifications = state.notificationsList ? state.notificationsList : [];
                    if (notifications && notifications.length > 0) {
                        notifications.forEach((item, index) => {
                            if (item.id == action.data.data.id) {
                                notifications[index] = action.data.data;
                            }
                        })
                    }
                    var notification = null
                    if (state.notificationDetails) {
                        if (state.notificationDetails.id == action.data.data.id) {
                            notification = action.data.data
                        } else {
                            notification = state.notificationDetails
                        }
                    }

                    return { ...state, notificationDetails: notification, notificationsList: notifications, successMessage: action.data.meta.message ? action.data.meta.message : locals.message_sent_successfully, state: action.state, action: action.type, errorMessage: '' }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
            }
    }
}