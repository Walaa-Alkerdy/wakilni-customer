import * as helpers from '../utils/helpers/localStorage';
import * as routes from './core/routes';
import * as network from './core/network';
import * as TimeSheetUtils from '../models/timeSheet';

/**
 * Check In
 * @param {object} values JSON object containing all values for this request
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function checkIn(values, onSuccess, onFailure) {

    let body = {
        y: values.lat,
        x: values.long,
    };

    network.postJSONDataWithAuthentication(routes.Staff.checkIn, values.accessToken, body, (result) => {
        onSuccess(result);
    }, (error) => {
        onFailure(error)
    });
}

/**
 * Check Out
 * @param {object} values JSON object containing all values for this request
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function checkOut(values, onSuccess, onFailure) {
    let body = {
        y: values.lat,
        x: values.long,
    };
    network.postJSONDataWithAuthentication(routes.Staff.checkOut, values.accessToken, body, (result) => {
        onSuccess(result);
    }, (error) => {
        onFailure(error)
    });
}

/**
 * Get Time Sheet
 * @param {object} values JSON object containing all values for this request which are accessToken and user Id
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function getTimeSheet(accessToken, userId, onSuccess, onFailure) {

    network.fetchJSONDataWithAuthentication(String.format(routes.Staff.timeSheet, userId), accessToken, (result) => {
        var timeSheets = result.data.map((item) => {
            return TimeSheetUtils.TimeSheet(item);
        })
        onSuccess({ data: timeSheets, meta: result.meta })
    }, (error) => {
        onFailure(error)
    });
}