import React from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect
} from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useToast } from './Toast';

const AuthModal = ({
  isLogin,
  setIsLogin,
  formData,
  setFormData,
  handleChange,
  onClose,
  setUser
}) => {
  const { showToast } = useToast();

  const isMobile = () =>
    /Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCred = isLogin
        ? await signInWithEmailAndPassword(auth, formData.email, formData.password)
        : await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      const user = userCred.user;
      setUser({
        name: user.displayName || formData.name || 'User',
        email: user.email,
        avatar: user.photoURL || `https://ui-avatars.com/api/?name=${formData.name || 'User'}&background=random`,
      });

      showToast(`${isLogin ? 'Logged in' : 'Account created'} successfully!`);
      setFormData({ name: '', email: '', password: '' });
      onClose();
    } catch (error) {
      console.error(error);
      showToast(error.message, 'error');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      provider.setCustomParameters({ prompt: 'select_account' });

      const result = isMobile()
        ? await signInWithRedirect(auth, provider)
        : await signInWithPopup(auth, provider);

      const user = result.user;
      setUser({
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      });

      showToast(`Welcome ${user.displayName}`);
      onClose();
    } catch (error) {
      console.error(error);
      showToast(error.message, 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] px-4 py-8">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-xl">✕</button>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
            )}
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg"
            />
            <button className="w-full bg-black text-white py-3 rounded-lg">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="my-4 text-center text-sm text-gray-500">or</div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg"
          >
            <img src="https://developers.google.com/identity/images/g-logo.png" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm">
            {isLogin ? 'No account?' : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
