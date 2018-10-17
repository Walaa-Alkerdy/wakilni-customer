import { connect } from "react-redux";
import Registration from '../../screens/auth/Registration';
import { createCustomerAction } from '../../actions/customer';
import { resetState, getAreasAPIActions, getConstantsListAPIAction } from '../../actions/common';

const mapStateToProps = state => ({
    appState: state
});

const mapDispatchToProps = dispatch => ({
    createCustomer: (values) => {
        dispatch(createCustomerAction(values))
    },
    getAreas: () => {
        dispatch(getAreasAPIActions())
    },
    getConstantsList: () => {
        dispatch(getConstantsListAPIAction())
    },
    resetState: () => {
        dispatch(resetState())
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Registration)