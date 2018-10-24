import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Login1 from './components/Login1';
import Assay from './components/Assay';
import Toxicity from './components/Toxicity';
import AssaySearch from './components/AssaySearch';
import Signup from './components/Signup';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Link to="/assay">Assay</Link>
      <br />
      <Link to="/enter">SignUp</Link>
      <br />
      <Link to="/searchAssay">Search Assay</Link>
      <br />
      <Link to="/toxicity">Toxicity</Link>
      <br />
      <Link to="/enter2">Login</Link>
            <div>
              <Route exact path="/enter" component={Login1} />
              <Route exact path="/assay" component={Assay} />
              <Route exact path="/toxicity" component={Toxicity} />
              <Route exact path="/searchAssay" component={AssaySearch} />
              <Route exact path="/enter2" component={Signup} />
            </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
