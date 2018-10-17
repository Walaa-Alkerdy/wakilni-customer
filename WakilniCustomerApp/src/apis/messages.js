import * as routes from './core/routes';
import * as network from './core/network';
import * as MessageUtils from '../models/Messages';

/**
 * driver requests an order
 * @param {object} values JSON object containing all values for this request
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function requestAnOrder(values, onSuccess, onFailure) {

    let body = {
        // title: values.title,
        // message: values.message,
        type_id: values.type_id,
        // content_type_id: values.content_type_id
    };

    network.postJSONDataWithAuthentication(routes.Messages.getAlerts, values.accessToken, body, (result) => {
        onSuccess(result);
    }, (error) => {
        onFailure(error)
    })
}

/**
 * driver requests a leave
 * @param {object} values JSON object containing all values for this request
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function requestALeave(title, message, typeId, contentTypeId, accessToken, onSuccess, onFailure) {

    let body = {
        title: title,
        message: message,
        type_id: typeId,
        content_type_id: contentTypeId
    };

    network.postJSONDataWithAuthentication(routes.Messages.getMessages, accessToken, body, (result) => {
        onSuccess(result);
    }, (error) => {
        onFailure(error)
    })
}

/**
 * Get User's Notification Messages
 * @param {string} AccessToken User's accesstoken
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function getMessages(values, onSuccess, onFailure) {

    network.fetchJSONDataWithAuthentication(routes.Messages.getMyRequests, values.accessToken, (result) => {
        var messages = result.data.map((item) => {
            return MessageUtils.Message(item);
        })
        onSuccess({ data: messages, meta: result.meta })
    }, (error) => {
        onFailure(error)
    });
}

/**
 * Get User's Notification Alerts
 * @param {string} AccessToken User's accesstoken
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function getAlerts(accessToken, onSuccess, onFailure) {

    network.fetchJSONDataWithAuthentication(routes.Messages.getAlerts, accessToken, (result) => {
        var messageAlerts = result.data.map((item) => {
            return MessageUtils.MessageAlert(item);
        })
        onSuccess({ data: messageAlerts, meta: result.meta })
    }, (error) => {
        onFailure(error)
    });
}

/**
 * Update User's Notification Alerts To Read
 * @param {string} AccessToken User's accesstoken
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function updateAlertsToRead(accessToken, onSuccess, onFailure) {

    network.putJSONDataWithAuthentication(routes.Messages.getAlerts, accessToken, {}, (result) => {
        var messageAlerts = result.data.map((item) => {
            return MessageUtils.MessageAlert(item);
        })
        onSuccess({ data: messageAlerts, meta: result.meta })
    }, (error) => {

        onFailure(error)
    })
}

/**
 * Get User's Notification Message details
 * @param {object} values JSON object containing all values for this request
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function getMessageDetails(values, onSuccess, onFailure) {

    network.fetchJSONDataWithAuthentication(String.format(routes.Messages.getMessageDetails, values.id), values.accessToken, (result) => {
        onSuccess({ data: MessageUtils.Message(result.data), meta: result.meta });
    }, (error) => {
        onFailure(error)
    })
}


/**
 * Request help from other drivers
 * @param {string} title Message title
 * @param {string} message Message body
 * @param {int} typeId Type ID
 * @param {int} contentTypeId ID of content type
 * @param {int} driverId ID of destination driver
 * @param {int} location task location info
 */
export function requestHelpFromOtherDrivers(title, message, typeId, contentTypeId, driverId, location, accessToken, onSuccess, onFailure) {

    let body = {
        title: title,
        message: message,
        type_id: typeId,
        content_type_id: contentTypeId,
        driver_id: driverId,
        location_id: location.id
    }

    network.postJSONDataWithAuthentication(routes.Messages.getMessages, accessToken, body, (result) => {
        onSuccess(result);
    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    });
}

/**
 * Send a reply to driver request for help
 * @param {int} messageId ID of message replying to
 * @param {string} message Content of message
 * @param {int} contentTypeId ID of content type
 * @param {string} action Action taken by driver
 * @param {string} accessToken User authorization token
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function replyToDriverRequest(messageId, message, contentTypeId, action, accessToken, values, onSuccess, onFailure) {

    let body = new FormData()
    body.append('action', action)
    if (contentTypeId) {
        body.append('content_type_id', contentTypeId.toString())
    }
    body.append('message', message)

    if (values != {} && values != null) {
        if (values.filePhoto) {
            body.append('picture', {
                uri: values.filePhoto.path,
                name: values.filePhoto.name,
                type: values.filePhoto.type,
            })
        }
        if (values.fileVoice) {
            body.append('voice_message', {
                uri: values.fileVoice.path,
                name: values.fileVoice.name,
                type: values.fileVoice.type,
            })
        }
    }

    network.postFormDataWithAuthentication(String.format(routes.Messages.getMessageDetails, messageId), accessToken, body, (result) => {
        onSuccess({ data: MessageUtils.Message(result.data), meta: result.meta })
    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    });
}

/**
 * Get contact recipients
 * @param {string} AccessToken User's accesstoken
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function getContactRecipients(accessToken, onSuccess, onFailure) {

    network.fetchJSONDataWithAuthentication(routes.Messages.getContactRecipients, accessToken, (result) => {
        onSuccess(result);
    }, (error) => {
        onFailure(error)
    });
}