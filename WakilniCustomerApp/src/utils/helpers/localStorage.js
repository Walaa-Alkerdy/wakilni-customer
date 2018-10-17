import { AsyncStorage } from "react-native";
import * as generalHelpers from './generalHelpers';
/**
 * Gets cached user if found
 */
export function getUser(onSuccess, onFailure) {

    AsyncStorage.getItem('CachedUser').then((result) => {

        if (result) {

            onSuccess(JSON.parse(result));
        } else {

            onFailure(JSON.stringify(error));
        }
    }).catch((error) => {

        onFailure(JSON.stringify(error));
    })
}

/**
 * Saves user in cache
 */
export function saveUser(userData) {

    try {
        AsyncStorage.setItem('CachedUser', JSON.stringify(userData));
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Gets cached language if any
 */
export async function getSavedLanguage(onSuccess, onFailure) {

    await AsyncStorage.getItem('SavedLanguage').then((result) => {

        onSuccess(JSON.stringify(result));
    }).catch((error) => {

        onFailure(JSON.stringify(error));
    })
}

/**
 * Saves selected language in cache
 */
export async function saveLanguage(selectedLanguage) {
    try {
        await AsyncStorage.setItem('SavedLanguage', selectedLanguage);

        return true;

    } catch (error) {

        return false;
    }
}

/**
 * Gets cached status for checkedIn Or checkOut User 
 */
export async function getCheckInOutStatus(onSuccess, onFailure) {

    await AsyncStorage.getItem('CheckInOutStatus').then((result) => {

        if (result) {

            onSuccess(JSON.stringify(result));
        } else {

            onSuccess(JSON.stringify(false));
        }
    }).catch((error) => {

        onFailure(JSON.stringify(error));
    })
}

/**
 * Saves status for checkedIn Or checkOut User 
 */
export async function saveCheckInOutStatus(status) {
    try {
        await AsyncStorage.setItem('CheckInOutStatus', status);

        return true;

    } catch (error) {

        return false;
    }
}

/**
 * Save status of cash Account to make life easier
 */
export async function saveCashAccountStatus() {
    try {
        await AsyncStorage.setItem('CashAccountStatus', 'Saved');

        return true;

    } catch (error) {

        return false;
    }
}

/**
 * Gets the cash account status from local storage
 */
export async function getCashAccountStatus(onSuccess, onFailure) {

    await AsyncStorage.getItem('CashAccountStatus').then((result) => {

        if (result) {

            onSuccess(JSON.stringify(result));
        } else {

            onSuccess(JSON.stringify(false));
        }
    }).catch((error) => {

        onFailure(JSON.stringify(error));
    })
}

/**
 * remove the cash account status from local storage
 */
export async function removeCashAccountStatus() {
    try {
        await AsyncStorage.removeItem('CashAccountStatus');

        return true;

    } catch (error) {

        return false;
    }
}

/**
 * Saves the tracking info of the user in local storage
 */
export async function saveTrackingInfoFromStorage(trackingInfo) {
    try {
        await AsyncStorage.setItem('TrackingInfo', JSON.stringify(trackingInfo));

        return true;

    } catch (error) {

        return false;
    }
}

/**
 * Gets the tracking info of the user from local storage
 */
export async function getTrackingInfoFromStorage(onSuccess, onFailure) {

    await AsyncStorage.getItem('TrackingInfo').then((result) => {

        if (result) {

            onSuccess(JSON.parse(result));
        } else {

            onSuccess(JSON.stringify(false));
        }
    }).catch((error) => {

        onFailure(JSON.stringify(error));
    })
}

/**
 * remove the tracking info of the user from local storage
 */
export async function removeTrackingInfoFromStorage() {
    try {
        await AsyncStorage.removeItem('TrackingInfo');

        return true;

    } catch (error) {

        return false;
    }
}

/**
 * Gets cached auth status if found
 */
export function getAuthStatus(onSuccess, onFailure) {

    AsyncStorage.getItem('UnAuthenticated').then((result) => {

        if (result) {

            onSuccess(JSON.parse(result));
        } else {

            onFailure(JSON.stringify('false'));
        }
    }).catch((error) => {

        onFailure(JSON.stringify(error));
    })
}

/**
 * Saves auth status in cache
 */
export function saveAuthStatus(value) {

    try {
        AsyncStorage.setItem('UnAuthenticated', value);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Removed auth status in cache
 */
export function removeAuthStatus() {

    try {
        generalHelpers.clearCache()
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Gets cached notif id if found
 */
export function getNotifId(onSuccess, onFailure) {

    AsyncStorage.getItem('NotifId').then((result) => {

        if (result) {

            onSuccess(JSON.stringify(result));
        } else {

            onFailure(JSON.stringify('false'));
        }
    }).catch((error) => {

        onFailure(JSON.stringify(error));
    })
}

/**
 * Saves notif id in cache
 */
export function saveNotifId(value) {

    try {
        AsyncStorage.setItem('NotifId', value);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Removed notif id from cache
 */
export function removeNotifId() {

    try {  
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Gets cached now driving id if found
 */
export function getNowDrivingId(onSuccess, onFailure) {

    AsyncStorage.getItem('NowDrivingId').then((result) => {

        if (result) {

            onSuccess(JSON.parse(result));
        } else {

            onFailure(JSON.stringify('false'));
        }
    }).catch((error) => {

        onFailure(JSON.stringify(error));
    })
}

/**
 * Saves now driving id in cache
 */
export function saveNowDrivingId(value) {

    try {
        AsyncStorage.setItem('NowDrivingId', JSON.stringify(value));
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Removed now driving id from cache
 */
export function removeNowDrivingId() {

    try {  
        AsyncStorage.removeItem('NowDrivingId')
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Gets cached navigation Helper Status
 */
export function getNavigationHelper(onSuccess, onFailure) {

    AsyncStorage.getItem('NavHelperStatus').then((result) => {

        if (result) {

            onSuccess(JSON.parse(result));
        } else {

            onFailure(JSON.stringify('false'));
        }
    }).catch((error) => {

        onFailure(JSON.stringify(error));
    })
}

/**
 * Saves navigation Helper Status in cache
 */
export function saveNavigationHelperStatus(value) {

    try {
        AsyncStorage.setItem('NavHelperStatus', JSON.stringify(value));
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Removed navigation Helper Status from cache
 */
export function removeNavigationHelperStatus() {

    try {  
        AsyncStorage.removeItem('NavHelperStatus')
        return true;
    } catch (error) {
        return false;
    }
}