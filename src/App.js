import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import logo from './Zeendoc-EDM.png';

function App() {
 
  return (
    <div className="appPage bg-primary"  >
      <div className="logoContainer navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <div className="App navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      
        <nav>
        <h1>Formulaires</h1>
          <ul>
            <li className="link" ><Link to="/formEnterprise">Formulaire Entreprise</Link></li>
            <li className="link"><Link to="/formClient">Formulaire Client</Link></li>
          </ul>
        </nav>
    </div>
    </div>
  );
}

export default App;
