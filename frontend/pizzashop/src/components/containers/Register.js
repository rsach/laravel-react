import { connect } from 'react-redux'
import { register} from '../../actions'


import Register from "../ui/Register";

const mapStateToProps = (state,props) =>
    ({

    });

const mapDispatchToProps = dispatch =>
    ({
        onSignUp(body){
            console.log(body)
            dispatch(
                register(body)
            )

            return body
        }

    });

export default connect(mapStateToProps,mapDispatchToProps)(Register)
