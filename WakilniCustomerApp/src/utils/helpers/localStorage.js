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