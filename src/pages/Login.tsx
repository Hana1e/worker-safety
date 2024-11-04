import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import pour redirection
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // État pour le message d'erreur
  const navigate = useNavigate(); // Hook de navigation pour redirection

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification des champs
    if (!email || !password) {
      setErrorMessage("Veuillez entrer l'email et le mot de passe.");
      return;
    }

    // Si tout est bon, réinitialiser le message d'erreur et rediriger
    setErrorMessage('');
    console.log('Login successful', { email, rememberMe });

   
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="header-info">
        <div className="flex items-center">
          <AiOutlineMail className="mr-2 text-white" />
          <p>info@companyname.com</p>
        </div>
        <div className="flex items-center">
          <AiOutlinePhone className="mr-2 text-white" />
          <p>+123456789</p>
        </div>
      </div>
      <div className="login-box">
        <div className="flex items-center mb-4">
          <hr className="flex-grow border-gray-400" />
          <h1 className="text-xl text-gray-600 mx-4">Login</h1>
          <hr className="flex-grow border-gray-400" />
        </div>
        
       
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        <form onSubmit={handleLogin} className="flex flex-col">
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
          <div className="form-group relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          <div className="form-actions">
            <label className="flex items-center text-gray-600 text-xs">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              Remember me
            </label>
            <a href="/forgot-password" className="text-red-500 text-xs">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 mt-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
