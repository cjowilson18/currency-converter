import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Home';
import ExactExchanges from './ExactExchanges';
import './index.js';


const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Currency Exchange</a>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <Link className="nav-item nav-link active" to="/"> Home </Link>
      <Link className="nav-item nav-link" to="/exactExchanges/"> Exact Exchanges </Link>
    </div>
  </div>
</nav>
<div className='footer'>
  <a className='footerA' href='https://www.linkedin.com/in/claire-cj-wilson-3a4600190/'>Linked In</a>&nbsp;
  <a className='footerA' href='https://github.com/cjowilson18'>GitHub</a>&nbsp;
  <a className='footerA' href='https://www.altcademy.com/'>Guidance from Altcademy</a>&nbsp;
</div>


        <Route path="/" exact component={Home} />
        <Route path="/exactExchanges/" component={ExactExchanges} />
        
    </Router>
  );
}
export default App;
