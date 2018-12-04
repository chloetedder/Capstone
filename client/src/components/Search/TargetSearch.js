import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class TargetSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          originalTarget: [],
          response: [],
          target: [],
          showTable: 0,
          name: '',
          symbol: '',
          id: '',
          track: '',
          geneid: '',
          currentPage: 1,
          rowsPerPage: 25
        }
        this.handleClick = this.handleClick.bind(this);
      }
    
      async results() {
        await axios.get('/target')
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
        const target = await this.renderContent();
        this.setState({
            target, 
            originalTarget: target,
            showTable: 1
        });
        let filterArray = this.state.target.filter(current=>{
            return current.intended_target_gene_name.toString().includes(this.state.name);
        })
        filterArray = filterArray.filter(current=>{
            return current.intended_target_gene_symbol.toString().includes(this.state.symbol);
        })
        filterArray = filterArray.filter(current=>{
            return current.intended_target_gene_id.toString().includes(this.state.id);
        })
        filterArray = filterArray.filter(current=>{
          return current.intended_target_track_status.toString().includes(this.state.track);
        })
        filterArray = filterArray.filter(current=>{
          return current.technological_target_gene_id.toString().includes(this.state.geneid);
        })
        
        this.setState({
            target: filterArray
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
                  data={ this.state.target }
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
          <h2>Target Advanced Search</h2>
          <br/>
          <form>
            <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="name"
                />
                <ControlLabel>Symbol</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="symbol"
                />
                <ControlLabel>ID</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="id"
                />
                <ControlLabel>Track Status</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="track"
                />
                <ControlLabel>Technological Gene ID</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="geneid"
                />
                <button onClick={e=>this.handleSubmit(e)}>Submit</button>
                <button onClick={()=>this.setState({target:this.state.originalTarget})}>Refresh</button>
            </FormGroup>
          </form>
          {this.renderTable()}
          </div>
        );
      }
}

export default TargetSearch;