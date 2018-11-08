import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './CustomNavbar.css'
//import Searchbar from './Searchbar.js'
//import FilterTable from './FilterTable'

export default class CustomNavbar extends Component {
  render() {
    return (
        <Navbar default collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">ChemMoA</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey = {1} componentClass={Link} href="/" to="/">
              Home
            </NavItem>
            <NavItem eventKey = {2} componentClass={Link} href="/assay" to="/assay">
              Assay
            </NavItem>
            <NavItem eventKey = {3} componentClass={Link} href="/toxitiy" to="/toxicity">
              Toxicity
            </NavItem>
            <NavItem eventKey = {4} componentClass={Link} href="/searchAssay" to="/searchAssay">
              Search
            </NavItem>
            <NavItem eventKey = {5} componentClass={Link} href="/enter" to="/enter">
              Login
            </NavItem>
            <NavItem eventKey = {6} componentClass={Link} href="/enter2" to="/enter2">
              Register
            </NavItem>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
  }
}
/*
<NavItem eventKey = {1} componentClass={Searchbar} href="#">
</NavItem>
*/