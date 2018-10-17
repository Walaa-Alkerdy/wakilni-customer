import * as routes from './core/routes';
import * as network from './core/network';
import * as DriverUtils from '../models/driver';
import * as TaskUtils from '../models/task';
import * as helpers from '../utils/helpers/localStorage';
import * as ServerStatus from '../constants/server_states';
import * as VehicleUtils from '../models/vehicles';
/**
 * Get Driver's Tasks list
 * @param {object} values JSON object containing all values for this request
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function getDriverTasks(values, onlyCompleted, isSubmitted, onSuccess, onFailure) {
    var url = ""
    if (onlyCompleted != null) {
        url = onlyCompleted ? routes.Driver.tasksCompleted + '&from='+values.fromDate+'&to='+values.toDate : routes.Driver.tasks;
        url = String.format(url, values.id, values)
    } else {
        url = String.format(routes.Driver.tasksSubmission, values.id, isSubmitted ? '0' : '1');
    }

    network.fetchJSONDataWithAuthentication(url, values.accessToken, (result) => {
        console.log(result)
        var tasks = result.data.map((item) => {
            return TaskUtils.Task(item);
        })
        onSuccess({ data: tasks, meta: result.meta })
    }, (error) => {
        onFailure(error)
    })
}

/**
 * Driver going back to office
 * @param {object} values JSON object containing all values for this request
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function backToOffice(values, onSuccess, onFailure) {

    let body = {
        action: values.action,
    };

    network.putJSONDataWithAuthentication(String.format(routes.Driver.driverInfo, values.id), values.accessToken, body, (result) => {
        onSuccess(result);
    }, (error) => {
        onFailure(error)
    });
}


/**
 * Fetch driver information
 * @param {int} driverId Driver Id
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function getDriverInformation(driverId, accessToken, onSuccess, onFailure) {
    network.fetchJSONDataWithAuthentication(String.format(routes.Driver.driverInfo, driverId), accessToken, (result) => {

        let userCheckInStatus = false;
        //must check in 
        if (result.data.user.time_sheet_status) {
            if (result.data.user.time_sheet_status === 2 || result.data.user.time_sheet_status === 4) {
                userCheckInStatus = false
            } else {//is already checked in must check out
                userCheckInStatus = true
            }
        } else {
            userCheckInStatus = false
        }

        let user = {
            tokenData: {
                accessToken: accessToken,
                // tokenType: tokenType,
                // expiresIn: expiresIn
            },
            userInfo: {
                id: result.data.user.id,
                driverId: result.data.id,
                contactId: result.data.user.contact.id,
                email: result.data.user.email,
                firstName: result.data.user.contact.first_name,
                lastName: result.data.user.contact.last_name,
                phoneNumber: result.data.user.contact.phone_number,
                dateOfBirth: result.data.user.contact.date_of_birth,
                languageType: result.data.language_type,
                // userType: result.user_info.role_name,
                roleId: ServerStatus.UserRoles.Driver.id,
                isUserCheckIn: userCheckInStatus
            }
        }

        if (helpers.saveUser(user)) {
            let temp = userCheckInStatus ? "true" : "false";
            if (helpers.saveCheckInOutStatus(temp)) {
                return onSuccess({ data: user, meta: result.meta });
            } else {
                return onFailure('failed to save user status');
            }
        } else {
            return onFailure('failed to save user');
        }

    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    })
}

/**
 * Fetch driver vehicle types
 * @param {string} accessToken User's access token
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function getVehicleTypes(accessToken, onSuccess, onFailure) {
    network.fetchJSONDataWithAuthentication(routes.Vehicles.vehicleTypes, accessToken, (result) => {
        var vehicles = result.data.map((item) => {
            return VehicleUtils.Vehicle(item);
        })
        onSuccess({ data: vehicles, meta: result.meta });
    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    })
}

/**
 * Track driver location
 * @param {string} accessToken User's access token
 * @param {id} driverId driver's id
 * @param {lat} lat driver's current lat
 * @param {long} long driver's current long
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function trackDriverLocation(accessToken, values, onSuccess, onFailure) {

    let body = values;

    console.log(body)

    network.postJSONDataWithAuthentication(routes.Driver.trackLocation, accessToken, body, (result) => {

        console.log(result)
        onSuccess(result);
    }, (error) => {
        console.log(error)
        if (onFailure) {
            onFailure(error);
        }
    })
}

/**
 * Update driver info
 * @param {string} action api's action which is in this case update
 * @param {string} updated must be sent as true
 * @param {int} driverId driver's id
 * @param {string} email driver's email
 * @param {string} password driver's password
 * @param {string} pattern driver's pattern
 * @param {string} firstName driver's first name
 * @param {string} lastName driver's last name
 * @param {string} dob driver's date of birth
 * @param {string} phoneNumber driver's phone number
 * @param {string} languageType 5 for english 4 for arabic
 */
export function updateDriverInfo(accessToken, driverId, email, password, pattern, firstName, lastName, dob, phoneNumber, languageType, onSuccess, onFailure) {

    var user = {
        // email: email,
        updated: true,
        contact: {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dob,
            phone_number: phoneNumber,
            updated: true
        }
    }

    if (password) {
        user = {
            ...user,
            password: password
        }
    }

    if (pattern) {
        user = {
            ...user,
            pattern: pattern
        }
    }

    var body = {
        action: 'update',
        user: user,
        // language_type: languageType
    }

    network.putJSONDataWithAuthentication(String.format(routes.Driver.driverInfo, driverId), accessToken, body, (result) => {

        helpers.getUser((user) => {

            let userCheckInStatus = false;
            //must check in 
            if (result.data.user.time_sheet_status) {
                if (result.data.user.time_sheet_status === 2 || result.data.user.time_sheet_status === 4) {
                    userCheckInStatus = false
                } else {//is already checked in must check out
                    userCheckInStatus = true
                }
            } else {
                userCheckInStatus = false
            }

            let newUser = {
                tokenData: {
                    accessToken: user.tokenData.accessToken,
                },
                userInfo: {
                    id: user.userInfo.id,
                    driverId: user.userInfo.driverId,
                    contactId: user.userInfo.contactId,
                    email: result.data.user.email,
                    firstName: result.data.user.contact.first_name,
                    lastName: result.data.user.contact.last_name,
                    phoneNumber: result.data.user.contact.phone_number,
                    dateOfBirth: result.data.user.contact.date_of_birth,
                    languageType: result.data.language_type,
                    roleId: ServerStatus.UserRoles.Driver.id,
                    // userType: result.user_info.role_name,
                    isUserCheckIn: userCheckInStatus
                }
            }

            if (helpers.saveUser(newUser)) {
                let temp = userCheckInStatus ? "true" : "false";
                if (helpers.saveCheckInOutStatus(temp)) {
                    onSuccess({ data: newUser, meta: result.meta });
                } else {
                    return onFailure({ data: 'failed to save user status' });
                }
            } else {
                return onFailure({ data: 'failed to save user' });
            }

        }, (error) => {

            onFailure({ data: error })
        })

    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    })
}

/**
 * Get Driver's Packages list
 * @param {string} accessToken user's access token
 * @param {string} driverId driver's id
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function getPackages(accessToken, driverId, onSuccess, onFailure) {

    network.fetchJSONDataWithAuthentication(String.format(routes.Driver.packages, driverId), accessToken, (result) => {
        var tasks = result.data.map((item) => {
            return TaskUtils.Task(item);
        })
        onSuccess({ data: tasks, meta: result.meta })
    }, (error) => {
        onFailure(error)
    })
}