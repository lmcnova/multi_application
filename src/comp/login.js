import React from 'react';
import './login.css'

function LoginForm() {
  return (
    <>
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
    </div>
    <form>
      <h3>Application Login</h3>

      <label htmlFor="username">Username</label>
      <input type="text" placeholder="Email or Phone" id="username" />

      <label htmlFor="password">Password</label>
      <input type="password" placeholder="Password" id="password" />

      <button>Log In</button>
    </form>
    </>
  );
};

export default LoginForm;
