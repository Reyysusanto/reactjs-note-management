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
    <form onSubmit={onSubmitHandler} className="register-input">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

LoginInput.propTypes = {
    signIn: PropTypes.func.isRequired,
};

export default LoginInput;
