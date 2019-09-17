import { connect } from "react-redux";
import OrderListingPage from '../../screens/Orders/OrderListingPage';
import { resetState } from '../../actions/common';
import { getOrders, getOrdersOrHistoryAPI } from '../../actions/order';
import { getCustomerRecipients } from '../../actions/customer';

const mapStateToProps = state => ({
    appState: state
});

const mapDispatchToProps = dispatch => ({
    getCustomerRecipients: (values) => {
        dispatch(getCustomerRecipients(values))
    },
    getOrders: (values) => {
        dispatch(getOrders(values))
    },
    getOrdersOrHistory: (values) => {
        dispatch(getOrdersOrHistoryAPI(values))
    },
    resetState: () => {
        dispatch(resetState())
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(OrderListingPage)