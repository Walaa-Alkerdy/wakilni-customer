import { connect } from "react-redux";
import Support from "../../screens/support/support";

const mapStateToProps = state => ({
    appState: state
});

const mapDispatchToProps = dispatch => ({
   
});


export default connect(mapStateToProps, mapDispatchToProps)(Support)