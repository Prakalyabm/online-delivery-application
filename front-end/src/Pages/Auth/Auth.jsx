import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../reducers/userSlice';
import './Auth.css';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState('CUSTOMER');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
      ...(isSignup && { role: role, name: e.target.name.value }), 
    };

    //console.log(formData);

    const url = isSignup
      ? 'http://localhost:8080/api/signup'
      : 'http://localhost:8080/api/login';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const userData = await response.json(); // Response returns user data
      
      const userRole = userData.user.role;

      dispatch(setUser(userData.user)); // Update Redux store and localStorage
      
      localStorage.setItem('user', JSON.stringify(userData.user));
      switch (userRole) {
        case 'CUSTOMER':
          navigate('/'); 
          break;
        case 'VENDOR':
          navigate('/Vendor'); 
          break;
        case 'DELIVERY_PERSONNEL':
          navigate('/deliver'); 
          break;
        case 'ADMIN':
          navigate('/admin'); 
          break;
        default:
          navigate('/'); // Default to home page if no specific role
      }
    } else {
      const errorData = await response.json(); // Get the error message from the backend
      alert(errorData.message); // Display the error message as an alert
    }
  };

  return (
    <section className='auth-section'>
      <div className='auth-container'>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <div className="field-wrapper">
                <h4>User Name</h4>
                <input type="name" name='name' id='name' required />
              </div>
            </label>
          )}
          <label htmlFor="email">
            <div className="field-wrapper">
              <h4>Email</h4>
              <input type="email" name='email' id='email' required />
            </div>
          </label>
          <label htmlFor="password">
            <div className="field-wrapper">
              <h4>Password</h4>
            </div>
            <input type="password" name='password' id='password' required />
            {isSignup && <p style={{ color: "#666767", fontSize: "13px", textAlign: "left" }}>Passwords must contain at least six characters</p>}
          </label>

          {isSignup && (
            <label htmlFor="role">
              <div className='role-lab'>
                <h4>Select Role</h4>
                <select
                  name="role"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="VENDOR">Vendor</option>
                  <option value="DELIVERY_PERSONNEL">Delivery Personnel</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </label>
          )}

          {isSignup && (
            <label htmlFor="check">
              <input type="checkbox" id="check" />
              <span>By clicking signup, you agree to the <span style={{ color: "#007ac6" }}>Terms and Conditions</span></span>
            </label>
          )}

          <button type="submit" className='auth-btn'>
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <div className='switch-account'>
          <p>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button
              type='button'
              className='handle-switch-btn'
              onClick={handleSwitch}
            >
              {isSignup ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Auth;