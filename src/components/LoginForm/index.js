import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import CarouselComponent from '../signupCarousel';
import PrivateHeader from "../PrivateHeader";
import './index.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Import Google OAuth components
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const LoginForm = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const onSubmitSuccess = (jwtToken) => {
    console.log('Login successful. JWT Token:', jwtToken);
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    });
    history.replace('/');
  };

  const onSubmitFailure = (errorMsg) => {
    console.log('Login failed. Error message:', errorMsg);
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    console.log('Form submitted with email:', email, 'and password:', password);
    // Simulate success or failure
    const simulatedSuccess = true;
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU"
    if (simulatedSuccess) {
      onSubmitSuccess(token);
    } else {
      onSubmitFailure('Simulated error message');
    }
  };

  

  // if (jwtToken !== undefined) {
  //   return <Redirect to="/" />;
  // }

  const handleGoogleSignup = (response) => {
    // Handle Google login success here
    console.log('Google login successful. Response:', response);
    // For example:
    // Cookies.set('jwt_token', response.credential, { expires: 30 });
    // history.replace('/');
  };

  const handleGoogleError = (error) => {
    // Handle Google login error here
    console.error('Google login error:', error);
    setShowSubmitError(true);
    setErrorMsg('Google login failed.');
  };

  return (
    <>
      <PrivateHeader />
      <div className="login-form-container">
        <div className='login-carousel'>
          <CarouselComponent />
        </div>
        <form className="form-container" onSubmit={submitForm}>
          <h1 className='Signup-header'>Welcome Back🖐️</h1>
          <p className='Signup-Par'>Your gateway to ordering top event services and products with ease</p>
          <div className="input-container">
            <input
              type="email"
              id="email"
              className="email-input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="input-container password-container">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              id="password"
              className="password-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <GoogleOAuthProvider>
            <div>
              <GoogleLogin
                onSuccess={handleGoogleSignup}
                onError={handleGoogleError}
                text="Sign_with"
              />
            </div>
          </GoogleOAuthProvider>
          <Link to="/signup" className="Login-link">
            Don't have an account? <span className='Login-text'>signup</span>
          </Link>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
