import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class ChemicalSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          originalChem: [],
          response: [],
          chem: [],
          showTable: 0,
          name: '',
          formula: '',
          smiles: '',
          weight: '',
          currentPage: 1,
          rowsPerPage: 25
        }
        this.handleClick = this.handleClick.bind(this);
      }
    
      async results() {
        await axios.get('http://localhost:5000/chem')
        .then(res => {
          this.setState({ response: res.data })
        })
        .catch((err) => { console.log(err); });
      }

      handleClick(event) {
        let listid = Number(event.target.id);
        this.setState({
            currentPage: listid
        });
    }

    handleUserInput(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value });
    }

    async handleSubmit(e){
        e.preventDefault()
        await this.results();
        const chem = await this.renderContent();
        this.setState({
            chem, 
            originalChemical: chem,
            showTable: 1
        });
        let filterArray = this.state.chem.filter(current=>{
            return current.name.toString().includes(this.state.name);
        })
        filterArray = filterArray.filter(current=>{
            return current.formula.toString().includes(this.state.formula);
        })
        filterArray = filterArray.filter(current=>{
          return current.SMILES.toString().includes(this.state.smiles);
        })
        filterArray = filterArray.filter(current=>{
          return current.MolWt.toString().includes(this.state.weight);
        })
        this.setState({
            chem: filterArray
        })
    }
    
      renderContent() {
        let temp = this.state.response;
        temp.map(data => {
          return Object.values(data);
        })
        return temp;
      }

      renderTable() {
        if(this.state.showTable) {
            let first = this.state.response[0];
        let keys = [];
        for(let key in first){
          keys.push(key);
        }
        const options = {
          clearSearch: true
        };
        return (
            <div>
              <BootstrapTable keyField='tablefields'
                  data={ this.state.chem }
                  striped 
                  pagination 
                  search={true} 
                  exportCSV={ true } 
                  options={options}
                  trClassName="customClass"
                  >
                      {keys.map(data => {
                        return (
                        <TableHeaderColumn width={200} height={200} dataField={data}>{data}</TableHeaderColumn>
                        )
                      })}
              </BootstrapTable>
          </div>
          );
          }
      }
      render() {
        return (
          <div className="App">
          <h2>Chemical Advanced Search</h2>
              <br/>
          <form>
            <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="name"
                />
                <ControlLabel>Formula</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="formula"
                />
                <ControlLabel>SMILES</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="smiles"
                />
                <ControlLabel>Mole Weight</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="weight"
                />
                <button onClick={e=>this.handleSubmit(e)}>Submit</button>
                <button onClick={()=>this.setState({chem:this.state.originalChemical})}>Refresh</button>
            </FormGroup>
          </form>
          {this.renderTable()}
          </div>
        );
      }
}

export default ChemicalSearch;