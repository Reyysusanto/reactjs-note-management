import PropTypes from "prop-types";
import { useState } from "react";

const LoginInput = ({ signIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    signIn({
      email,
      password,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col space-y-4 max-w-sm mx-auto p-4 bg-white rounded-md shadow-md">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
        Login
      </button>
    </form>
  );
};

LoginInput.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default LoginInput;
