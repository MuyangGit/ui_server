import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => { // Mark this function as async
    event.preventDefault(); // Prevent default form submission behavior

    let isLoginSuccessful = false; // Initialize outside try-catch to be accessible later

    try {
      const loginUrl = "http://70.175.151.113:10000/v1/ai-cat/login";
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'same-origin' // Ensures cookies are sent with the request if needed
      });
      const data = await response.json();
      isLoginSuccessful = data["authenticated"];
      console.log('Login successful', data); // Log on successful login
    } catch (error) {
      console.error('Login failed', error); // Log on error
    }

    if (isLoginSuccessful) {
      onLogin(true);
    }
  };

  return (
    <div id="login-container">
      <form id="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
//             type="email" // Ensure correct type for email input
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
