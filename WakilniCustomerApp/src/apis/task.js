import * as routes from './core/routes';
import * as network from './core/network';
import { Task } from '../models/task';

/**
 * Start task
 * @param {string} accessToken User access token
 * @param {int} orderId ID of order
 * @param {int} taskId ID of task
 * @param {int} nowDrivingId ID of what is driver driving
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function startTask(accessToken, orderId, taskId, nowDrivingId, onSuccess, onFailure) {
    network.postJSONDataWithAuthentication(String.format(routes.Tasks.start, orderId, taskId), accessToken, { action: "start", now_driving: nowDrivingId }, (result) => {
        onSuccess({ data: Task(result.data), meta: result.meta });
    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    });
}

/**
 * Mark task as completed
 * @param {string} accessToken User authorization token
 * @param {int} orderId ID of order
 * @param {int} taskId ID of task
 * @param {array} itemsCollected Array of what is collected, e.g. cash, package ...etc.
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function completeTask(accessToken, orderId, taskId, signature, image, itemsCollected, note, failReason, myCoordinates, onSuccess, onFailure) {
    var latitude = 0.0
    var longitude = 0.0

    if (myCoordinates) {
        latitude = myCoordinates.latitude;
        longitude = myCoordinates.longitude;
    }
    let body = {
        action: 'complete',
        collections: itemsCollected,
        latitude: latitude,
        longitude: longitude,
    }

    if (signature) {
        body = {
            ...body,
            signature: signature
        }
    } else {//must be removed when a real signature is sent
        body = {
            ...body,
        }
    }

    if (image) {
        body = {
            ...body,
            picture: image
        }
    } else {//must be removed when a real signature is sent
        body = {
            ...body,
        }
    }

    if (note) {
        body = {
            ...body,
            note: note
        }
    }

    if (failReason) {
        body = {
            ...body,
            reason: failReason
        }
    }

    network.postJSONDataWithAuthentication(String.format(routes.Tasks.complete, orderId, taskId), accessToken, body, (result) => {
        onSuccess({ data: Task(result.data), meta: result.meta });
    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    });
}


/**
 * Mark task as failed
 * @param {string} accessToken User authorization Token
 * @param {int} orderId ID of order
 * @param {int} taskId ID of task
 * @param {string} failReason Reason of failure
 * @param {bool} isDamaged Is package damaged
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function markTaskAsFailed(accessToken, orderId, taskId, failReason, isDamaged, onSuccess, onFailure) {
    network.postJSONDataWithAuthentication(String.format(routes.Tasks.failed, orderId, taskId), accessToken, { action: "failed", fail_reason: failReason, damaged: isDamaged }, (result) => {
        onSuccess({ data: Task(result.data), meta: result.meta });
    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    })
}

/**
 * ReOpen task
 * @param {string} accessToken User authorization Token
 * @param {int} orderId ID of order
 * @param {int} taskId ID of task
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function reOpenTask(accessToken, orderId, taskId, onSuccess, onFailure) {
    network.postJSONDataWithAuthentication(String.format(routes.Tasks.reopen, orderId, taskId), accessToken, { action: "reopen" }, (result) => {

        onSuccess({ data: Task(result.data), meta: result.meta });
    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    })
}