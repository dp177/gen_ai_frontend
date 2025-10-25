import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../Axios/axios';
import useAuthStore from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const setToken = useAuthStore((s) => s.setToken);
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(null); // 'helpseeker' | 'lawyer'

  const submit = async () => {
    try {
      let res;
      if (mode === 'signup') {
        res = await api.post('/auth/signup', { email, password, name, role });
      } else {
        res = await api.post('/auth/login', { email, password });
      }
      const token = res.data?.token;
      if (token) {
        setToken(token);
        window.location.href = '/home';
      }
    } catch (e) {
      console.error(e);
      alert('Authentication failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="text-secondary mt-2">
            {mode === 'login'
              ? 'Sign in to continue to Legal SahAI.'
              : 'Join us and get started in seconds.'}
          </p>
        </div>

        {mode === 'signup' && !role && (
          <div className="space-y-4">
            <motion.div
              onClick={() => setRole('helpseeker')}
              className="p-4 border border-border rounded-md cursor-pointer hover:bg-gray-50 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="font-semibold text-primary">I need legal help</h2>
              <p className="text-sm text-secondary">Sign up as a Helpseeker</p>
            </motion.div>
            <motion.div
              onClick={() => setRole('lawyer')}
              className="p-4 border border-border rounded-md cursor-pointer hover:bg-gray-50 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="font-semibold text-primary">I am a lawyer</h2>
              <p className="text-sm text-secondary">Sign up to offer your services</p>
            </motion.div>
          </div>
        )}

        {(mode === 'login' || role) && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="space-y-4"
          >
            {mode === 'signup' && (
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" className="w-full py-3">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
        )}

        <div className="text-center mt-6">
          <a
            href={`${backendUrl}/auth/google${mode === 'signup' && role ? `?role=${role}` : ''}`}
            className="text-accent hover:underline"
          >
            Or continue with Google
          </a>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setRole(null);
            }}
            className="text-secondary hover:text-primary"
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Login;