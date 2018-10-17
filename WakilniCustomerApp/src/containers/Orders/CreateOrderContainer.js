import { connect } from "react-redux";
import CreateOrderPage from '../../screens/Orders/CreateOrderPage';
import { resetState, getAreasAPIActions } from '../../actions/common';
import { createNewReceiver } from '../../actions/customer';
import { createOrder } from '../../actions/order';
import { getLocations, createCustomerLocation } from '../../actions/locations';

const mapStateToProps = state => ({
    appState: state
});

const mapDispatchToProps = dispatch => ({

    createNewReceiver: (values) => {
        dispatch(createNewReceiver(values))
    },
    createCustomerLocation: (values) => {
        dispatch(createCustomerLocation(values))
    },
    getLocations: (values) => {
        dispatch(getLocations(values))
    },
    getAreas: () => {
        dispatch(getAreasAPIActions())
    },
    createOrder: (values) => {
        dispatch(createOrder(values))
    },
    resetState: () => {
        dispatch(resetState())
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderPage)