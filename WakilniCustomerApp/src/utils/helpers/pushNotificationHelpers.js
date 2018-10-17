import { Platform } from 'react-native'
// import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import * as PushNotificationUtils from '../../models/PushNotificationResponse';
import * as object_types from '../../constants/object_types';
import * as localStorage from '../../utils/helpers/localStorage';

export function handlePushNotifications(onSuccess) {

    // FCM.getInitialNotification().then(notif => {//when app is terminated and opened from a notification
    //     console.log("Initial Notification", notif)

    //     if (Platform.OS != 'ios') {

    //         let pushNotif = PushNotificationUtils.PushNotificationResponse(notif)

    //         localStorage.getNotifId((result) => {

    //             if (JSON.parse(result) == pushNotif.objectId.toString()) {
    //                 // mustDoAction = false
    //             } else {
    //                 if (notif.custom_notification) {
    //                     // mustDoAction = false
    //                 } else {
    //                     handleReceiveNotification(notif, pushNotif, (result) => {
    //                         onSuccess(result)
    //                     })
    //                 }
    //             }

    //         }, (error) => {
    //             handleReceiveNotification(notif, pushNotif, (result) => {
    //                 onSuccess(result)
    //             })
    //         })
    //     }
    // });

    // if (this.notificationListener) {

    // } else {
    //     this.notificationListener = FCM.on(FCMEvent.Notification, notif => {//when app is running in the foreground or background
    //         console.log("Notification", notif);

    //         let pushNotif = PushNotificationUtils.PushNotificationResponse(notif)

    //         var mustDoAction = true

    //         console.log(pushNotif)

    //         if (Platform.OS == 'ios') {

    //             handleReceiveNotification(notif, pushNotif, (result) => {
    //                 onSuccess(result)
    //             })

    //         } else {
    //             localStorage.getNotifId((result) => {

    //                 console.log(result)
    //                 if (JSON.parse(result) == pushNotif.objectId.toString()) {
    //                     // mustDoAction = false
    //                 } else {
    //                     if (notif.custom_notification) {
    //                         // mustDoAction = false
    //                     } else {
    //                         handleReceiveNotification(notif, pushNotif, (result) => {
    //                             onSuccess(result)
    //                         })
    //                     }
    //                 }

    //             }, (error) => {
    //                 handleReceiveNotification(notif, pushNotif, (result) => {
    //                     onSuccess(result)
    //                 })
    //             })
    //         }

    //         // if (Platform.OS == 'ios') {

    //         //     if (mustDoAction) {


    //         //     }

    //         // } else {
    //         //     setTimeout(() => {

    //         //         console.log('asda')

    //         //     }, 100);
    //         // }


    //     });

    //     this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
    //         // console.log("TOKEN (refreshUnsubscribe)", token);
    //         //must resave new token
    //     });
    // }
}

function handleReceiveNotification(originalNotif, pushNotif, onSuccess, onFailure) {

    if (pushNotif.userId == -1) {        
    } else {

        localStorage.getUser((user) => {

            if (user.userInfo.id == parseInt(pushNotif.userId)) {//if notification is for current user

                if (Platform.OS === 'ios') {

                    switch (pushNotif.notificationType) {
                        case object_types.PUSH_NOTIFICATIONS.NOTIFICATION_TYPES.NOTIFICATION_RESPONSE:
                            switch (pushNotif.objectType) {
                                case object_types.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_TASKS:
                                    setTimeout(() => {
                                        onSuccess({ notifId: pushNotif.objectId, moveTo: 'TasksPage2Container', didComeFromPushNotification: true })
                                    }, 100);
                                    break;
                                case object_types.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_NOTIFICATION_MESSAGE:

                                    if (pushNotif.codeNavigation != 'MainPageContainer') {
                                        setTimeout(() => {
                                            onSuccess({ notifId: pushNotif.objectId, moveTo: pushNotif.codeNavigation, didComeFromPushNotification: true })
                                        }, 100);
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;

                        default:
                            break;
                    }

                    // if (notif.local_notification) {
                    //   return;
                    // }
                    // if (notif.opened_from_tray) {
                    //   return;
                    // }

                    // if (notif.badge) {
                    //     FCM.setBadgeNumber(notif.badge);
                    // }

                    //optional
                    //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
                    //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
                    //notif._notificationType is available for iOS platfrom
                    switch (originalNotif._notificationType) {
                        case NotificationType.Remote://app is close and i received a notification
                            originalNotif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                            break;
                        case NotificationType.NotificationResponse://when app is in the background but not terminated
                            originalNotif.finish();
                            break;
                        case NotificationType.WillPresent://app is open and i received a notification
                            originalNotif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                            break;
                    }


                    //   // direct channel related methods are ios only
                    //   // directly channel is truned off in iOS by default, this method enables it
                    //   FCM.enableDirectChannel();
                    //   this.channelConnectionListener = FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
                    //     console.log('direct channel connected' + data);
                    //   });
                    //   setTimeout(function () {
                    //     FCM.isDirectChannelEstablished().then(d => console.log(d));
                    //   }, 1000);

                } else {

                    localStorage.saveNotifId(pushNotif.objectId.toString())

                    switch (pushNotif.notificationType) {
                        case object_types.PUSH_NOTIFICATIONS.NOTIFICATION_TYPES.NOTIFICATION_RESPONSE:
                            switch (pushNotif.objectType) {
                                case object_types.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_TASKS:
                                    setTimeout(() => {
                                        onSuccess({ notifId: pushNotif.objectId, moveTo: 'TasksPage2Container', didComeFromPushNotification: true })
                                    }, 100);
                                    break;
                                case object_types.PUSH_NOTIFICATIONS.SERVER_NOTIFICATION_TYPES.FOR_NOTIFICATION_MESSAGE:
                                    if (pushNotif.codeNavigation != 'MainPageContainer') {
                                        setTimeout(() => {
                                            onSuccess({ notifId: pushNotif.objectId, moveTo: pushNotif.codeNavigation, didComeFromPushNotification: true })
                                        }, 100);
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;

                        default:
                            break;
                    }

                    // if (notif.local_notification) {
                    //   return;
                    // }
                    // if (notif.opened_from_tray) {
                    //   return;
                    // }

                    // let result = JSON.parse(notif.custom_notification)

                    // if (result.badge) {
                    //     FCM.setBadgeNumber(result.badge);
                    // }

                    //   // direct channel related methods are ios only
                    //   // directly channel is truned off in iOS by default, this method enables it
                    //   FCM.enableDirectChannel();
                    //   this.channelConnectionListener = FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
                    //     console.log('direct channel connected' + data);
                    //   });
                    //   setTimeout(function () {
                    //     FCM.isDirectChannelEstablished().then(d => console.log(d));
                    //   }, 1000);
                }
            }

        }, (error) => { })
    }

}

export function removeListener() {
    if (this.notificationListener) {
        this.notificationListener.remove();
    }
    if (this.refreshTokenListener) {
        this.refreshTokenListener.remove();
    }
}