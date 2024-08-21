import React, { useState } from 'react';
import CarouselComponent from "../signupCarousel";
import PrivateHeader from '../PrivateHeader';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Import Google OAuth components
import './index.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showReenterPassword, setShowReenterPassword] = useState(false);
    const [isPasswordEntered, setIsPasswordEntered] = useState(false);

    const handleSignup = (event) => {
        event.preventDefault();
        if (password === reenterPassword) {
            console.log('Sign-up successful!');
            // Further sign-up logic like API calls
        } else {
            console.log('Passwords do not match');
        }
    };

    const handleGoogleSignup = (response) => {
        console.log('Google sign-up successful:', response);
        // Add your Google sign-up logic here
    };

    const handleGoogleError = (error) => {
        console.error('Google sign-up error:', error);
        // Handle Google sign-up error here
    };

    return (
        <>
            <PrivateHeader/>
            <div className='signup-container'>
                <div className="signup-customer-container">
                    <div className="signup-image-container">
                        <CarouselComponent/>
                    </div>

                    <form onSubmit={handleSignup} className="signup-customer-form">
                        <div className="signup-customer-group">
                            <h1 className='Signup-header'>Welcome to Evobuz</h1>
                            <p className='Signup-Par'>Your gateway to ordering top event services and products with ease</p>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="signup-customer-input"
                                placeholder='Email'
                            />
                        </div>
                        <div className="signup-customer-group">
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setIsPasswordEntered(e.target.value.length > 0);
                                    }}
                                    required
                                    className="signup-customer-input"
                                    placeholder='Password'
                                />
                                <span 
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        {isPasswordEntered && (
                            <div className="signup-customer-group">
                                <div className="password-container">
                                    <input
                                        type={showReenterPassword ? "text" : "password"}
                                        value={reenterPassword}
                                        onChange={(e) => setReenterPassword(e.target.value)}
                                        required
                                        className="signup-customer-input"
                                        placeholder='Re-Password'
                                    />
                                    <span 
                                        className="password-toggle"
                                        onClick={() => setShowReenterPassword(!showReenterPassword)}
                                    >
                                        {showReenterPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        )}
                        <button type="submit" className="signup-customer-button">Sign Up</button>
                        <GoogleOAuthProvider >
                            <div>
                                <GoogleLogin
                                    onSuccess={handleGoogleSignup}
                                    onError={handleGoogleError}
                                    text="continue_with"
                                />
                            </div>
                        </GoogleOAuthProvider>
                        <Link to="/login" className="Login-link">
                            Already a Member? <span className='Login-text'>Login Here</span>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
