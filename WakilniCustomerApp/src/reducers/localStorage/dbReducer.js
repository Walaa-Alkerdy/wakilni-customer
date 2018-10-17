import { STATE, ACTION_DATABASE } from '../../constants/states'

export default (state, action) => {
    switch (action.type) {
        case ACTION_DATABASE.SUCCESS:
            return { ...state, lang: action.newState.lang, user: action.newState.user, isUserCheckIn:action.newState.isUserCheckIn, state: action.newState.state, action: action.type}
    }
}