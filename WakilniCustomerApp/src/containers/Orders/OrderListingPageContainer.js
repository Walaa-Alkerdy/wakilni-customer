import { connect } from "react-redux";
import OrderListingPage from '../../screens/Orders/OrderListingPage';
import { resetState } from '../../actions/common';
import { getOrders } from '../../actions/order';

const mapStateToProps = state => ({
    appState: state
});

const mapDispatchToProps = dispatch => ({

    getOrders: (values) => {
        dispatch(getOrders(values))
    },
    resetState: () => {
        dispatch(resetState())
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(OrderListingPage)