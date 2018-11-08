import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import {Jumbotron, Grid } from 'react-bootstrap'
import './Home.css'

export default class Home extends Component {
  render() {
    return (
      <Grid>
        <Jumbotron>
          <h3>Welcome to ChemMoA Database</h3>
          <p>This database allows you to search for your desired chemical for your needs.</p>
        </Jumbotron>
      </Grid>
    )
  }
}

/*
<Link to="/enter">
  <Button bsStyle="primary">Login</Button>
</Link>
*/