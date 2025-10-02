import React, { useState } from 'react';
import { Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

  const { login, forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        onClose();
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setForgotMessage('');
    setLoading(true);

    try {
      const response = await forgotPassword(forgotEmail);
      if (response.success) {
        setForgotMessage('Password reset instructions sent! Check your email.');
        setTimeout(() => {
          setShowForgotPassword(false);
          setForgotEmail('');
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <form onSubmit={handleForgotPassword}>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        {forgotMessage && (
          <div className="bg-green-100 text-green-600 p-3 rounded-md mb-4">
            {forgotMessage}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="forgot-email" className="label">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-500" />
            </div>
            <input
              id="forgot-email"
              type="email"
              className="input pl-10"
              placeholder="you@example.com"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-3 mb-3"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader size={20} className="animate-spin mr-2" />
              Sending...
            </span>
          ) : (
            'Send Reset Link'
          )}
        </button>

        <button
          type="button"
          onClick={() => setShowForgotPassword(false)}
          className="text-sm text-gray-600 hover:text-gray-800 w-full"
        >
          Back to Login
        </button>
      </form>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-error-500 bg-opacity-10 text-error-500 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="email" className="label">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail size={18} className="text-gray-500" />
          </div>
          <input
            id="email"
            type="email"
            className="input pl-10"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="password" className="label">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-gray-500" />
          </div>
          <input
            id="password"
            type="password"
            className="input pl-10"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end mt-1">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Forgot password?
          </button>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full py-3"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Loader size={20} className="animate-spin mr-2" />
            Logging in...
          </span>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
};

export default LoginForm;