import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Form from './components/Form';
import Assay from './components/Assay';
import Toxicity from './components/Toxicity';
import AssaySearch from './components/AssaySearch';
import Signup from './components/Signup';
import Navbar from './components/CustomNavbar';
import Home from './components/Home';
import AdvancedSearch from './components/Search/AdvancedSearch';
import NewAssay from './components/NewAssay';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div className="App">
      {/* <Link to="/assay">Assay</Link>
      <br />
      <Link to="/enter">SignUp</Link>
      <br />
      <Link to="/searchAssay">Search Assay</Link>
      <br />
      <Link to="/toxicity">Toxicity</Link>
      <br />
      <Link to="/enter2">Login</Link> */}
      <Navbar />
            <div>
              <Route exact path="/" component={Home} />
              <Route exact path="/enter" component={Form} />
              <Route exact path="/assay" component={Assay} />
              <Route exact path="/toxicity" component={Toxicity} />
              <Route exact path="/searchAssay" component={AssaySearch} />
              <Route exact path="/enter2" component={Signup} />
              <Route exact path="/advanced" component={AdvancedSearch} />
              <Route exact path="/newassay" component={NewAssay} />
            </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
