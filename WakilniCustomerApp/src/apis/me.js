import * as helpers from '../utils/helpers/localStorage';
import * as routes from './core/routes';
import * as network from './core/network';
import * as generalHelpers from '../utils/helpers/generalHelpers';
import Locals from '../localization/local';
import * as ServerStatus from '../constants/server_states';

/**
 * Check Token Validity
 * @param {string} accessToken
 */
export function isTokenValid(values, onSuccess, onFailure) {

    network.fetchJSONDataWithAuthentication(routes.Me.isTokenValid, values.accessToken, (result) => {
        onSuccess(result)
    }, (error) => {
        onFailure(error)
    }, true)
}

/**
 * Logs user into the service
 * @param {string} language_type LANGUAGE_TYPE_ENGLISH = 4, LANGUAGE_TYPE_ARABIC = 5
 * @param {object} values JSON object containing all values for this request
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function loginAPI(values, onSuccess, onFailure) {

    let body = {
        // language_type: values.language_type,
        device_token: values.fcmToken,
        device_type: values.deviceType
    };

    if (values.email) {
        body = {
            ...body,
            email: values.email,
        }
    } else {
        body = {
            ...body,
            phone_number: values.phoneNumber,
        }
    }

    if (values.password) {
        body = {
            ...body,
            password: values.password,
        }
    } else {
        body = {
            ...body,
            pattern: values.pattern,
        }
    }

    network.postJSONData(routes.Me.Login, body, (result) => {

        let canEnter = false

        let roleData = { id: -1, name: '' }
        if (result.info.roles.length > 0) {

            result.info.roles.forEach((role) => {

                if (role.id == ServerStatus.UserRoles.Customer.id) {
                    canEnter = true
                }

                roleData = { id: role.id, name: role.name }
            })
        }

        if (!canEnter) {
            return onFailure(Locals.error_role_can_not_login)
        } else {

            let userCheckInStatus = false;
            //must check in 
            if (result.info.time_sheet_status) {
                if (result.info.time_sheet_status === 2 || result.info.time_sheet_status === 4) {
                    userCheckInStatus = false
                } else {//is already checked in must check out
                    userCheckInStatus = true
                }
            } else {
                userCheckInStatus = false
            }

            if (result.info.driver) {

                if (result.info.driver.now_driving) {

                    helpers.saveNowDrivingId(result.info.driver.now_driving.id)
                }
            }

            let user = {
                tokenData: {
                    accessToken: result.access_token,
                    fcmToken: values.fcmToken,
                    // tokenType: result.token_type,
                    // expiresIn: result.expires_in
                },
                userInfo: {
                    id: result.info.id,
                    customerId: result.info.customer.id,
                    contactId: result.info.contact.id,
                    email: result.info.email,
                    firstName: result.info.contact.first_name,
                    lastName: result.info.contact.last_name,
                    phoneNumber: result.info.contact.phone_number,
                    dateOfBirth: result.info.contact.date_of_birth,
                    languageType: roleData.id == ServerStatus.UserRoles.Driver.id ? result.info.driver.language_type == '4' ? ServerStatus.LanguageType.ARABIC : ServerStatus.LanguageType.ENGLISH : ServerStatus.LanguageType.ENGLISH,
                    // userType: result.user_info.role_name,
                    isUserCheckIn: userCheckInStatus,
                    roleId: roleData.id,
                    isLastLogin: true,
                }
            }

            if (helpers.saveUser(user)) {
                let temp = userCheckInStatus ? "true" : "false";
                // if (helpers.saveCheckInOutStatus(temp)) {

                    let lang = values.language_type == '4' ? 'ar' : 'en'
                    if (helpers.saveLanguage(lang)) {
                        Locals.setLanguage(lang);
                        return onSuccess({ data: user, lang: lang });
                    } else {

                        return onFailure('failed to selected language');
                    }
                // } else {
                //     return onFailure('failed to save user status');
                // }
            } else {
                return onFailure('failed to save user');
            }
        }

    }, (error) => {
        onFailure(error)
    })
}

/**
 * Gets User's information
 * @param {object} values JSON object containing all values for this request
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function getUserInfo(values, onSuccess, onFailure) {

    network.fetchJSONDataWithAuthentication(routes.Me.userInfo, values.accessToken, (result) => {

        console.log(result)

        let roleData = { id: -1, name: '' }
        if (result.data.roles.length > 0) {

            result.data.roles.forEach((role) => {

                if (role.id == ServerStatus.UserRoles.Customer.id) {
                    canEnter = true
                }

                roleData = { id: role.id, name: role.name }
            })
        }

        let userCheckInStatus = false;
        //must check in 
        if (result.data.time_sheet_status) {
            if (result.data.time_sheet_status === 2 || result.data.time_sheet_status === 4) {
                userCheckInStatus = false
            } else {//is already checked in must check out
                userCheckInStatus = true
            }
        } else {
            userCheckInStatus = false
        }

        let user = {
            tokenData: {
                accessToken: values.accessToken,
                fcmToken: values.fcmToken,
                // tokenType: tokenType,
                // expiresIn: expiresIn
            },
            userInfo: {
                id: result.data.id,
                customerId: result.data.customer.id,
                contactId: result.data.contact.id,
                email: result.data.email,
                firstName: result.data.contact.first_name,
                lastName: result.data.contact.last_name,
                phoneNumber: result.data.contact.phone_number,
                dateOfBirth: result.data.contact.date_of_birth,
                roleId: roleData.id,
                // languageType: result.data.language_type,
                // userType: result.user_info.role_name,
                isUserCheckIn: true
            }
        }

        if (helpers.saveUser(user)) {
            return onSuccess({ data: user, meta: result.meta });
        } else {
            return onFailure('failed to save user');
        }

    }, (error) => {
        onFailure(error)
    });
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
export function updateUserInfo(accessToken, driverId, email, password, pattern, firstName, lastName, dob, phoneNumber, languageType, fcmToken, onSuccess, onFailure) {

    // var user = {
    //     // email: email,
    //     updated: true,
    //     contact: {
    //         first_name: firstName,
    //         last_name: lastName,
    //         date_of_birth: dob,
    //         phone_number: phoneNumber,
    //         updated: true
    //     }
    // }

    // if (password) {
    //     user = {
    //         ...user,
    //         password: password
    //     }
    // }

    // if (pattern) {
    //     user = {
    //         ...user,
    //         pattern: pattern
    //     }
    // }

    var body = {
        action: 'update',
        updated: true,
        contact: {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dob,
            phone_number: phoneNumber,
            updated: true
        }
        // language_type: languageType
    }

    network.putJSONDataWithAuthentication(routes.Me.userInfo, accessToken, body, (result) => {

        console.log(result)

        helpers.getUser((user) => {

            let userCheckInStatus = false;
            //must check in 
            if (result.data.time_sheet_status) {
                if (result.data.time_sheet_status === 2 || result.data.time_sheet_status === 4) {
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
                    fcmToken: fcmToken,
                },
                userInfo: {
                    id: user.userInfo.id,
                    customerId: user.userInfo.customerId,
                    contactId: user.userInfo.contactId,
                    email: result.data.email,
                    firstName: result.data.contact.first_name,
                    lastName: result.data.contact.last_name,
                    phoneNumber: result.data.contact.phone_number,
                    dateOfBirth: result.data.contact.date_of_birth,
                    roleId: user.userInfo.roleId,
                    // languageType: result.data.language_type,
                    // userType: result.user_info.role_name,
                    isUserCheckIn: userCheckInStatus
                }
            }

            if (helpers.saveUser(newUser)) {
                let temp = userCheckInStatus ? "true" : "false";
                // if (helpers.saveCheckInOutStatus(temp)) {
                    onSuccess({ data: newUser, meta: result.meta });
                // } else {
                //     return onFailure({ data: 'failed to save user status' });
                // }
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
 * Logs User outside the app
 * @param {object} values JSON object containing all values for this request
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function logOut(values, onSuccess, onFailure) {

    let body = {
        token: values.fcmToken
    }

    network.postJSONDataWithAuthentication(routes.Me.logout, values.accessToken, body, (result) => {

        generalHelpers.clearCache()
        onSuccess(result);
    }, (error) => {

        onFailure(error)
    });
}

/**
 * Request update password
 * @param {String} accessToken user's access token
 * @param {String} currentPassword user's original password
 * @param {String} password user's new password
 * @param {String} pattern user's new pattern
 */
export function changePassword(accessToken, values, onSuccess, onFailure) {

    let body = {
        action: 'change_password',
        current_password: values.currentPassword,
    }

    if (values.password) {
        body = {
            ...body,
            password: values.password,
            password_confirmation: values.password,
        }
    } else {
        body = {
            ...body,
            pattern: values.pattern
        }
    }

    network.putJSONDataWithAuthentication(routes.Me.userInfo, accessToken, body, (result) => {

        onSuccess({ data: result.data, meta: result.meta })
    }, (error) => {
        console.log(error)
        if (onFailure) {
            onFailure(error);
        }
    })
}

/**
 * Request reset password token
 * @param {object} values JSON object containing email value
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function getPasswordToken(values, onSuccess, onFailure) {
    var form = new FormData();
    form.append("email", values.email);
    network.postFormData(routes.Me.passwordToken, form, (result) => {
        onSuccess({ token: result.token });
    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    });
}

/**
 * Reset user password
 * @param {string} email User email
 * @param {string} token Reset Password Token
 * @param {string} password New Password
 * @param {string} passwordConfirmation New Password Confirmation
 * @param {function} onSuccess Success callback
 * @param {function} onFailure Failure callback
 */
export function resetPassword(email, token, password, passwordConfirmation, onSuccess, onFailure) {
    var form = new FormData();
    form.append("email", email);
    form.append("token", token);
    form.append("password", password);
    form.append("password_confirmation", passwordConfirmation);
    network.postFormData(routes.Me.resetPassword, form, (result) => {
        onSuccess({ token: result.token });
    }, (error) => {
        if (onFailure) {
            onFailure(error);
        }
    });
}