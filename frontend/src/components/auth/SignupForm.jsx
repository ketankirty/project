import React, { useState } from 'react';
import { User, Mail, Lock, Loader, PhoneCall } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SignupForm = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { signup } = useAuth();

  const validateInputs = () => {
    if (!name || !email || !password || !mobilenumber) {
      return 'All fields are required.';
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return 'Please enter a valid email address.';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/^\d{10}$/.test(mobilenumber)) {
      return 'Please enter a valid 10-digit mobile number.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const isSuccess = await signup(name, email, password, mobilenumber);

      if (isSuccess) {
        setSuccess('Account created successfully! Please login.');
        setName('');
        setEmail('');
        setPassword('');
        setMobilenumber('');

        setTimeout(() => {
          setLoading(false);
          if (onSwitchToLogin) {
            onSwitchToLogin();
          }
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Something went wrong.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-600 p-3 rounded-md mb-4">
          {success}
        </div>
      )}

      {/* Full Name */}
      <div className="mb-4">
        <label htmlFor="name" className="label">Full Name</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User size={18} className="text-gray-500" />
          </div>
          <input
            id="name"
            type="text"
            className="input pl-10 capitalize"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="label">Email Address</label>
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


      {/* Mobile Number */}
      <div className="mb-4">
        <label htmlFor="mobilenumber" className="label">Mobile Number</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PhoneCall size={18} className="text-gray-500" />
          </div>
          <input
            id="mobilenumber"
            type="tel"
            className="input pl-10"
            placeholder="+91 XXXXXXXX"
            maxLength='10'
            value={mobilenumber}
            onChange={(e) => setMobilenumber(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="mb-6">
        <label htmlFor="password" className="label">Password</label>
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
            minLength={8}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Password must be at least 8 characters long.
        </p>
      </div>



      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full py-3"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Loader size={20} className="animate-spin mr-2" />
            Creating account...
          </span>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};

export default SignupForm;
