import { connect } from "react-redux";
import NotificationsPage from '../../screens/Notifications/NotificationsPage';
import { resetState } from '../../actions/common';
import { getMessagesAPIAction, getAlertsAPIAction, updateAlertsToReadAPIAction, replyToDriverRequest } from '../../actions/messages'

const mapStateToProps = state => ({
    appState: state
});

const mapDispatchToProps = dispatch => ({

    replyToDriverRequest: (accessToken, messageId, contentTypeId, message, action, values, requestFlag) => {
        dispatch(replyToDriverRequest(accessToken, messageId, contentTypeId, message, action, values, requestFlag))
    },
    getAlerts: (accessToken, showLoader, pageNumber) => {
        dispatch(getAlertsAPIAction(accessToken, showLoader, pageNumber))
    },
    updateAlertsToRead: (accessToken) => {
        dispatch(updateAlertsToReadAPIAction(accessToken))
    },
    getMessages: (values, showLoader, isMyRequests) => {
        dispatch(getMessagesAPIAction(values, showLoader, isMyRequests))
    },
    resetState: () => {
        dispatch(resetState())
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPage)