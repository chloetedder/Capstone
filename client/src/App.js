import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Login1 from './components/Login1';
import Assay from './components/Assay';
import Toxicity from './components/Toxicity';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Link to="/assay">Assay</Link>
      <br />
      <Link to="/enter">Login</Link>
      <br />
      <Link to="/toxicity">Toxicity</Link>
            <div>
              <Route exact path="/enter" component={Login1} />
              <Route exact path="/assay" component={Assay} />
              <Route exact path="/toxicity" component={Toxicity} />
            </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
