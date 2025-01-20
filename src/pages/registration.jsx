import { Link, useNavigate } from "react-router-dom"
import { register } from "../utils/api"
import SignUpInput from "../components/registerInput"

const SignUpPage = () => {
    const navigate = useNavigate()

    const onRegisterHandler = async (user) => {
        const { error } = await register(user)
        if(!error) {
            navigate('/')
        }
    } 

    return(
        <div>
            <h2>Yuk, buat akun untuk menggunakan aplikasi</h2>
            <SignUpInput register={onRegisterHandler}/>
            <p>Kembali ke link <Link to="/login">Masuk</Link></p>
        </div>
    )
}

export default SignUpPage