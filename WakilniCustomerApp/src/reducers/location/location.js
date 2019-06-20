import { STATE, ACTION_LOCATION, ACTION_RESET } from '../../constants/states'
import defaultState from '../../constants/default_state';

export default (state, action) => {
    switch (action.type) {
        case ACTION_LOCATION.LIST_DRIVERS:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, state: action.state, drivers: action.data.filter((driver) => { return driver.driverId != state.user.userInfo.driverId }), action: action.type }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
        case ACTION_LOCATION.GET_LOCATIONS:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, 
                        // pickUpLocations: action.data.filter((location) => { return location.personable ? location.personable.viewer == null : false }), 
                        // receiverLocations: action.data.filter((location) => { return location.personable ? location.personable.viewer != null : false }), 
                        pickUpLocations: action.data, 
                        receiverLocations: action.data, 
                        state: action.state, 
                        action: action.type 
                    }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
        case ACTION_LOCATION.CREATE_LOCATION:
            switch (action.state) {
                case STATE.SUCCESS:
                    return { ...state, successMessage: '', state: action.state, action: action.type }
                case STATE.FAILED:
                    return { ...state, errorMessage: action.data, state: action.state, action: action.type }
                case STATE.LOADING:
                    return { ...state, errorMessage: '', state: action.state, action: action.type };
                case STATE.INTITAL:
                    return { ...state, state: action.state, action: action.type };
            }
        case ACTION_LOCATION.UPDATE_CURRENT_LAT_LONG:
            return { ...state, currentLat: action.data.lat, currentLong: action.data.long }
            break
        case ACTION_RESET.RESET:
            return { ...state, state: action.state, action: action.type }
            break;
    }
}