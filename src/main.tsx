import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from "./login"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)

function Main() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = (status:any) => {
    setLoggedIn(status);
  }

  return (
    <React.StrictMode>
      {isLoggedIn ? <App /> : <Login onLogin={handleLogin} />}
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Main />);
