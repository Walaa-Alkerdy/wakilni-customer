import { connect } from "react-redux";
import Recipients from '../../screens/Recipients/Recipients';
import { getCustomerRecipients } from '../../actions/customer';
import { resetState } from '../../actions/common';

const mapStateToProps = state => ({
    appState: state
});

const mapDispatchToProps = dispatch => ({
    getCustomerRecipients: (values) => {
        dispatch(getCustomerRecipients(values))
    },
    resetState: () => {
        dispatch(resetState())
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Recipients)