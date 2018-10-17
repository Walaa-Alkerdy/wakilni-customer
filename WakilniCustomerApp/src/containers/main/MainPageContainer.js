import { connect } from "react-redux";
import MainPage from '../../screens/main/MainPage';
import { resetState, getCurrenciesAction, updateCurrentLatAndLong, getConstantsListAPIAction } from '../../actions/common';
import { logoutAPIAction, isTokenValidAction } from '../../actions/me';
import { backToOfficeAPIAction, trackDriverLocationAPIAction } from '../../actions/drivers';
import { requestAnOrderAction, getMessagesAPIAction, getAlertsAPIAction } from '../../actions/messages';


const mapStateToProps = state => ({
    appState: state
});

const mapDispatchToProps = dispatch => ({

    getConstants: (accessToken) => {
        dispatch(getConstantsListAPIAction(accessToken))
    },
    isTokenValid: (values) => {
        dispatch(isTokenValidAction(values))
    },
    logOut: (values) => {
        dispatch(logoutAPIAction(values))
    },
    getCurrencies: (accessToken) => {
        dispatch(getCurrenciesAction(accessToken))
    },
    updateCurrentLatAndLong: (lat, long) => {
        dispatch(updateCurrentLatAndLong(lat, long))
    },
    trackDriverLocation: (accessToken, values) => {
        dispatch(trackDriverLocationAPIAction(accessToken, values))
    },
    backToOffice: (values) => {
        dispatch(backToOfficeAPIAction(values))
    },
    getAlerts: (accessToken, showLoader) => {
        dispatch(getAlertsAPIAction(accessToken, showLoader))
    },
    getMessages: (values, showLoader, isMyRequests) => {
        dispatch(getMessagesAPIAction(values, showLoader, isMyRequests))
    },
    requestAnOrder: (values) => {
        dispatch(requestAnOrderAction(values))
    },
    resetState: () => {
        dispatch(resetState())
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(MainPage)