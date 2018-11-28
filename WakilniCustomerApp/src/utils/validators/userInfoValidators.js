/**
 * Validate if email is in valid format
 * @param {string} email Email to validate
 */
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
/**
 * Validate username 
 * @param {string} email User's email
 */
export function isEmailValid(email) {
    if (!validateEmail(email)) {
        return false;
    }
    return true;
}

/**
 * Validate password
 * @param {string} password User password
 */
export function isPasswordValid(password) {
    // if (password.length <= 5) {
    //     return false;
    // }
    return true;
}

/**
 * Validate empty fields
 * @param {string} field Field to validate
 */
export function isEmpty(field) {
    if (!field || field.length == 0) {
        return true
    }
    return false
}

/**
 * Validate phone fields
 * @param {string} field Field to validate
 */
export function isPhoneValid(field) {
    var re = /^\+961([0-9]{7,8})$/
    return re.test(String(field).toLowerCase());
}