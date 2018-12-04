import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import ChemicalSearch from './ChemicalSearch';
import TargetSearch from './TargetSearch';
import AssaySearch from './AssaySearch';
import ToxSearch from './ToxSearch';

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
        let seeing, key = this.state.eventKey;
        if(key == 1)
            seeing = <AssaySearch />;
        if(key == 2)
            seeing = <ChemicalSearch />;
        if(key == 3)
            seeing = <TargetSearch />;
        if(key == 4)
            seeing = <ToxSearch />;
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
                        <option value="4">Toxicity</option>
                    </FormControl>
                </FormGroup>
                {seeing}
            
            </div>
        )
    }
}

export default AdvancedSearch;