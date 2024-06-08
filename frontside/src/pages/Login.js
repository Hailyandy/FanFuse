import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { login } from '../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const initialState = { email: '', password: '' };
  const navigate = useNavigate(); 
  const { auth } = useSelector(state => state);
  const [showpass, setShowpass] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      navigate('/'); 
    }
  }, [auth.token, navigate]); 
  const { email, password } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="login">
      <div className="login-container">
        <h3 className="login-header">FanFuse</h3>
        <h6 className="login-subheader">Login</h6>
        <form className="login-dataform" onSubmit={handleSubmit}>
          <input
            className="login-dataformemail"
            type="email"
            name='email'
            value={email}
            onChange={handleChange}
            placeholder="Type your email"
          />
          <input
            className="login-dataformpass"
            type={showpass ? "type" : "password"}
            placeholder="Type your password"
            value={password}
            name='password'
            onChange={handleChange}
          />
          <small className="login-showpass" onClick={() => setShowpass(!showpass)}> {showpass ? "Hide" : "show"} </small>
          <button
            className="login-dataformbtn"
            type="submit"> Log In
          </button>
          <p className="login-small">Do not have account <Link className="toRegister" to="/register">Create HERE</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
