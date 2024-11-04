import React, { useState } from 'react';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import '../styles/ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <div className="forgot-password-container">
      <div className="header-info">
        <div className="flex items-center">
          <AiOutlineMail className="mr-2 text-white" />
          <p>example@example.com</p>
        </div>
        <div className="flex items-center">
          <AiOutlinePhone className="mr-2 text-white" />
          <p>+123456789</p>
        </div>
      </div>
      
      <div className="forgot-password-content">
        <div className="forgot-password-box">
          <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-400" />
            <h1 className="text-xl text-gray-600 mx-4">Forgot Password</h1>
            <hr className="flex-grow border-gray-400" />
          </div>
          <p className="text-black text-xs text-center mb-4">
            Enter your email and we will email instructions on how to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="form-actions flex justify-between mt-4">
              <button type="submit" className="bg-green-500 text-white p-2 w-full">
                Submit
              </button>
              <a href="/" className="bg-gray-500 text-white p-2 ml-2">
                Back
              </a>
            </div>
          </form>
        </div>


        <div className="footer-box">
          <p className="text-center text-black text-xs mb-1">
            @2024 all rights are reserved. Service name.
          </p>
          <p className="text-center text-black text-xs">
            Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
