import { connect } from 'react-redux'


import OrderHistory from "../ui/OrderHistory";

const mapStateToProps = (state,props) =>
    ({
        orderHistory:state.orderHistory,
    });

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps,mapDispatchToProps)(OrderHistory)
