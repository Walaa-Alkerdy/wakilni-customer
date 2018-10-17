import thunk from 'redux-thunk';
import { Alert } from 'react-native';
import appReducer from '../reducers/index';
import { AsyncStorage } from 'react-native';
import { STATE, ACTION_DATABASE } from '../constants/states';
import { defaultState } from '../constants/default_state';
import { applyMiddleware, createStore, compose } from 'redux';

// Initial state for our application
var appState = defaultState;
// Apply thunk middleware 
var middleWare = applyMiddleware(thunk);
// Create Store
var store = createStore(appReducer, appState, middleWare);

/**
 * Gets default state for the application
 * If there is a previous state (persistant) inside localStorage, we 
 * return persistant state
 * else default state is returned
 */
async function loadPersistedState() {
    /**
    * Contains code for fetching state from database 
    * in-case app requires storing app state
    */
    try {

        const user = await AsyncStorage.getItem('CachedUser');
        let lang = await AsyncStorage.getItem('SavedLanguage');
        let checkInStatus = await AsyncStorage.getItem('CheckInOutStatus');

        if (!lang) {
            lang = defaultState.lang;
        }
        if (checkInStatus == null) {
            checkInStatus = defaultState.isUserCheckIn;
        } else {
            checkInStatus = checkInStatus == "true" ? true : false;
        }

        if (user) {
            appState = {
                ...appState,
                user: JSON.parse(user),
                lang: lang,
                isUserCheckIn: checkInStatus,
                state: STATE.SUCCESS
            }
            // appState.state = ACTION_DATABASE.FAILED;
            store.dispatch({
                type: ACTION_DATABASE.SUCCESS,
                newState: appState
            });
        }
    } catch (e) {
        alert(e);
    }
}

(async () => { await loadPersistedState() }).call();

/**
 * Export store
 */
export default store;