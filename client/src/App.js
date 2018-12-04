import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import NewTox from './components/Tables/NewTox';
import Navbar from './components/CustomNavbar';
import Home from './components/Home';
import AdvancedSearch from './components/Search/AdvancedSearch';
import NewAssay from './components/Tables/NewAssay';
import Callback from './components/Authorization/Callback';
import NewChem from './components/Tables/NewChem';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Navbar />
            <div>
              <Route exact path="/" component={Home} />
              <Route exact path="/assay" component={NewAssay} />
              <Route exact path="/toxicity" component={NewTox} />
              <Route exact path="/advanced" component={AdvancedSearch} />
              <Route exact path="/callback" component={Callback} />
              <Route exact path="/chemical" component={NewChem} />
            </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
