import { connect } from "react-redux";
import ProfilePage from '../../screens/Profile/ProfilePage';
import { updateDriverInfo, fetchDriverInformationAction } from '../../actions/drivers';
import { logoutAPIAction, changePassword, getUserInfoAPIAction, updateUserInfoAPIAction } from '../../actions/me';
import { resetState } from '../../actions/common';
// import { hideAlert, showAlert } from '../../actions/common/ui';

const mapStateToProps = state => ({
    appState: state
});

const mapDispatchToProps = dispatch => ({

    logOut: (values) => {
        dispatch(logoutAPIAction(values))
    },
    changePassword: (accessToken, values) => {
        dispatch(changePassword(accessToken, values))
    },
    fetchDriverInformation: (driverId, accessToken) => {
        dispatch(fetchDriverInformationAction(driverId, accessToken))
    },
    updateDriverInformation: (accessToken, driverId, email, password, pattern, firstName, lastName, dob, phoneNumber, languageType) => {
        dispatch(updateDriverInfo(accessToken, driverId, email, password, pattern, firstName, lastName, dob, phoneNumber, languageType))
    },
    getUserInfo: (values) => {
        dispatch(getUserInfoAPIAction(values))
    },
    updateUserInfo: (accessToken, driverId, email, password, pattern, firstName, lastName, dob, phoneNumber, languageType, fcmToken) => {
        dispatch(updateUserInfoAPIAction(accessToken, driverId, email, password, pattern, firstName, lastName, dob, phoneNumber, languageType, fcmToken))
    },
    resetState: () => {
        dispatch(resetState())
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)