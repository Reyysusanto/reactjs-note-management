import { Link } from "react-router-dom"
import { login } from "../utils/api"
import LoginInput from "../components/loginInput"
import PropTypes from "prop-types"

const LoginPage = ({ loginSuccess }) => {
    const onLoginHandler = async ({ email, password }) => {
        const { error, data } = await login(email, password)
        if(!error) {
            loginSuccess(data)
        }
    } 

    return(
        <div>
            <h2>Yuk, login untuk menggunakan aplikasi</h2>
            <LoginInput signIn={onLoginHandler}/>
            <p>Belum punya akun? <Link to="/register">Sign Up</Link></p>
        </div>
    )
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired,
}

export default LoginPage