import { connect } from "react-redux";
import ChangePasswordPage from '../../screens/Profile/ChangePasswordPage';
import { changePassword } from '../../actions/me';
import { resetState } from '../../actions/common';
// import { hideAlert, showAlert } from '../../actions/common/ui';

const mapStateToProps = state => ({
    appState: state
});

const mapDispatchToProps = dispatch => ({

    changePassword: (accessToken, values) => {
        dispatch(changePassword(accessToken, values))
    },
    resetState: () => {
        dispatch(resetState())
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage)