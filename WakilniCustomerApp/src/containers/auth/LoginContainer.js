import { connect } from "react-redux";
import Login from '../../screens/auth/Login';
import { loginAPIAction } from '../../actions/me';
import { resetState } from '../../actions/common';
// import { hideAlert, showAlert } from '../../actions/common/ui';

const mapStateToProps = state => ({
    appState: state
});

const mapDispatchToProps = dispatch => ({
    loginAPI: (values) => {
        dispatch(loginAPIAction(values))
    },
    resetState: () => {
        dispatch(resetState())
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Login)