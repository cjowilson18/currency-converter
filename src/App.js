import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Home';
import ExactExchanges from './ExactExchanges';



const Contact = () => {
  return (
    <Router>
      <h2>Contact Me</h2>
      <p>Email: cjowilson18@gmail.com</p>
      <h3>More Information:</h3>
      <a href='https://www.linkedin.com/in/claire-cj-wilson-3a4600190/'>Linked In</a>
    </Router>
    
  )
}
const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Currency Exchange</a>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <Link className="nav-item nav-link active" to="/"> Home </Link>
      <Link className="nav-item nav-link" to="/exactExchanges/"> Exact Exchanges </Link>
      <Link className="nav-item nav-link" to="/contact/"> My Information </Link>
    </div>
  </div>
</nav>
<div className='footer'>
  <a href='https://www.linkedin.com/in/claire-cj-wilson-3a4600190/'>Linked In</a>&nbsp;
  <a href='https://github.com/cjowilson18'>GitHub</a>&nbsp;
  <a href='https://www.altcademy.com/'>Guidance from Altcademy</a>&nbsp;
</div>

        <Route path="/" exact component={Home} />
        <Route path="/exactExchanges/" component={ExactExchanges} />
        <Route path="/contact/" component={Contact} />
    </Router>
  );
}
export default App;
