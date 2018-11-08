import React, { Component } from 'react';
import axios from 'axios';
import { ButtonToolbar, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Home from './Home';

class AdvancedSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventKey: 0
        }
        this.renderContent = this.renderContent.bind(this);
    }
    onSelect(e) {
        e.persist();
        this.setState({
            eventKey: e.target.value
        })       
    }

    renderContent() {
        //could return a component for each one
        console.log("inside of render content")
        
    }
        
    render() {
        let seeing;
        console.log(this.state.eventKey)
        if(this.state.eventKey == 1)
            seeing = <Home />
        if(this.state.eventKey == 2)
            seeing = <Home />
        if(this.state.eventKey == 3)
            seeing = <Home />
        
        return (
            <div>
            <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select</ControlLabel>
                <FormControl 
                    onChange={this.onSelect.bind(this)}
                    inputRef={ el => this.inputEl=el }
                    componentClass="select" placeholder="select">
                    <option value="">select</option>
                    <option value="1">Assay</option>
                    <option value="2">Chemical</option>
                    <option value="3">Target</option>
                </FormControl>
            </FormGroup>
            {seeing}
            
            </div>
        )
    }
}

export default AdvancedSearch;