import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/api";
import SignUpInput from "../components/registerInput";

const SignUpPage = () => {
  const navigate = useNavigate();

  const onRegisterHandler = async (user) => {
    try {
      const { error } = await register(user);
      if (!error) {
        navigate('/');
      }
    } catch (error) {
      console.log('Terjadi kesalahan, silakan coba lagi.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Yuk, buat akun untuk menggunakan aplikasi
      </h2>
      <SignUpInput register={onRegisterHandler} />
      <p className="mt-4 text-center">
        Kembali ke <Link to="/login" className="text-blue-500 hover:underline">Masuk</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
