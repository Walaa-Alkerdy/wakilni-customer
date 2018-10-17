import { Platform } from 'react-native'
import * as Object_TYPES from '../constants/object_types'
/**
 * Create a new push notification response object
 * @param {string} _notificationType to detect if is in forground or background can be received as notification_response or will_present_notification
 * @param {string} aps contains the actual data on ios platform
 * @param {string} object_id for example task id/notification id
 * @param {string} object_type for example task/timesheet
*/
export function PushNotificationResponse(data) {

    if (Platform.OS === 'ios') {

        var objectType = -1
        if (data.object_type) {
            switch (data.object_type) {
                case 'App\\Models\\Message':
                    objectType = Object_TYPES.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_NOTIFICATION_MESSAGE
                    break;
                case 'App\\Models\\TimeSheet':
                    objectType = Object_TYPES.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_TIMESHEET
                    break;
                case 'App\\Models\\Task':
                    objectType = Object_TYPES.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_TASKS
                    break;
                default:
                    objectType = data.object_type
                    break;
            }
        }

        return {
            notificationType: data._notificationType == 'notification_response' ? Object_TYPES.PUSH_NOTIFICATIONS.NOTIFICATION_TYPES.NOTIFICATION_RESPONSE : Object_TYPES.PUSH_NOTIFICATIONS.NOTIFICATION_TYPES.WILL_PRESENT_NOTIFICATION,
            aps: data.aps.alert ? {
                alertTitle: data.aps.alert.title ? data.aps.alert.title : '',
                alertMessage: data.aps.alert.body ? data.aps.alert.body : '',
            } : null,
            userId: data.user_id ? data.user_id : -1,
            objectId: data.object_id ? data.object_id : -1,
            objectType: objectType,
            code: data.code ? data.code : null,
            codeNavigation: data.code ? getCodeNavigation(data.code) : getCodeNavigation()
        }
    } else {

        let isCustomNotification = data.custom_notification != null ? true : false
        let customNotification = isCustomNotification ? JSON.parse(data.custom_notification) : data

        if (customNotification) {

            var objectType = -1
            if (customNotification.object_type) {
                switch (customNotification.object_type) {
                    case 'App\\Models\\Message':
                        objectType = Object_TYPES.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_NOTIFICATION_MESSAGE
                        break;
                    case 'App\\Models\\TimeSheet':
                        objectType = Object_TYPES.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_TIMESHEET
                        break;
                    case 'App\\Models\\Task':
                        objectType = Object_TYPES.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_TASKS
                        break;
                    default:
                        objectType = customNotification.object_type.toString()
                        break;
                }
            }

            return {
                notificationType: isCustomNotification ? Object_TYPES.PUSH_NOTIFICATIONS.NOTIFICATION_TYPES.WILL_PRESENT_NOTIFICATION : Object_TYPES.PUSH_NOTIFICATIONS.NOTIFICATION_TYPES.NOTIFICATION_RESPONSE,
                aps: (customNotification.title && customNotification.body) ? {
                    alertTitle: customNotification.title ? customNotification.title : '',
                    alertMessage: customNotification.body ? customNotification.body : '',
                } : null,
                userId: customNotification.user_id ? customNotification.user_id : -1,
                objectId: customNotification.object_id ? customNotification.object_id : -1,
                objectType: objectType,
                code: customNotification.code ? customNotification.code : null,
                codeNavigation: customNotification.code ? getCodeNavigation(customNotification.code) : getCodeNavigation()
            }
        } else {
            return null
        }

    }

}

/**
 * Code helper to get the proper navigation action
 */
function getCodeNavigation(code) {

    let finalResult = 'MainPageContainer'

    if (code) {

        switch (code) {
            case Object_TYPES.MESSAGE.DRIVER_HELP.id.toString():
                finalResult = 'NotificationDetailsPageContainer'
                break;
            case Object_TYPES.MESSAGE.REPLY_TO_DRIVER_HELP.id.toString():
                finalResult = 'NotificationDetailsPageContainer'
                break;

            case Object_TYPES.MESSAGE.REQUEST_A_LEAVE.id.toString():
                finalResult = 'RequestLeaveListContainer'
                break;
            default:
                finalResult = 'MainPageContainer'
                break;
        }
    }

    return finalResult
}