import { connect } from 'react-redux'
import { login} from '../../actions'


import Login from "../ui/Login";

const mapStateToProps = (state,props) =>
    ({

    });

const mapDispatchToProps = dispatch =>
    ({
        onLogin(body){
            dispatch(
                login(body)
            )
        }

    });

export default connect(mapStateToProps,mapDispatchToProps)(Login)
