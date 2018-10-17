import * as CurrencyUtils from './Currency';

/**
 * Create a new Room object
 * @param {int} userId User Id
 * @param {string} email User's Email
 * @param {string} password User's Password
 * @param {string} AccessToken User's AccessToken
 */
export function createUser(userId, email, password, AccessToken) {
    return {
        userId: userId, email: email, password: password, AccessToken: AccessToken
    }
}

/**
 * Create a new user object
 * @param {int} userId ID of user
 * @param {string} email User email
 * @param {string} phoneNumber User phone number
 */
export function User(userId, email, phoneNumber) {
    return {
        userId: userId, email: email, phoneNumber: phoneNumber
    }
}

/**
 * Create new type object
 * @param {int} typeId Type Id
 * @param {string} type Type Code
 * @param {string} label Type Label
 */
export function UserType(typeId, type, label) {
    return {
        typeId: typeId,
        type: type,
        label: label
    }
}

/**
 * Create a receiver object for Tasks response
 * @param {object} data JSON data returned from server
 */
export function ReceiverForTask(data) {
    if (data.user) {

        let currencies = []

        if (data.user.currencies && data.user.currencies.length > 0) {
            data.user.currencies.forEach((currency) => {

                currencies.push(CurrencyUtils.CustomerCurrency(currency))
            })
        }

        return {
            id: data.id ? data.id : null,
            goldenRule: data.golden_rule,
            name: data.user.name,
            // firstName: data.user.contact.first_name,
            // lastName: data.user.contact.last_name,
            phoneNumber: data.user.contact.phone_number,
            currencies: currencies
        }
    } else {

        let currencies = []

        if (data.currencies && data.currencies.length > 0) {
            data.currencies.forEach((currency) => {

                currencies.push(CurrencyUtils.CustomerCurrency(currency))
            })
        }

        return {
            id: data.id ? data.id : null,
            goldenRule: data.golden_rule,
            name: data.name,
            // firstName: data.first_name,
            // lastName: data.last_name,
            phoneNumber: data.phone_number,
            allowDriverContact: data.allow_driver_contact,
            currencies: currencies
        }
    }
}