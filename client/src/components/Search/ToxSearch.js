import React, { Component } from 'react';
import axios from 'axios';
import { Pagination, Table, FormControl, FormGroup, ControlLabel, Grid } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class ToxSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          originalTox: [],
          response: [],
          tox: [],
          showTable: 0,
          chmn: '',
          casn: '',
          spid: '',
          currentPage: 1,
          rowsPerPage: 25
        }
        this.handleClick = this.handleClick.bind(this);
      }
    
      async results() {
        await axios.get('http://localhost:5000/tox')
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
        const tox = await this.renderContent();
        this.setState({
            tox, 
            originalTox: tox,
            showTable: 1
        });
        let filterArray = this.state.tox.filter(current=>{
            return current.chnm.toString().includes(this.state.chmn);
        })
        filterArray = filterArray.filter(current=>{
          return current.casn.toString().includes(this.state.casn);
        })
        filterArray = filterArray.filter(current=>{
          return current.spid.toString().includes(this.state.spid);
        })
        this.setState({
            tox: filterArray
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
                  data={ this.state.tox }
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
          <h2>Toxicity Advanced Search</h2>
              <br/>
          <form>
            <FormGroup>
                <ControlLabel>CHMN</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="chmn"
                />
                <ControlLabel>CASN</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="casn"
                />
                <ControlLabel>SPID</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="spid"
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

export default ToxSearch;
/*
const {currentPage, rowsPerPage} = this.state;

        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRows = this.state.chem.slice(indexOfFirstRow, indexOfLastRow);


        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.chem.length / rowsPerPage); i++) {
            pageNumbers.push(i);
          }
        
          const renderPageNumbers = pageNumbers.map(number => {
            return (
              <Pagination.Item
                key={number}
                id={number}
                onClick={this.handleClick}
              >
                {number}
              </Pagination.Item>
            );
          });
          
          let count = 0;

          <Grid>
            <Table width="10%" height="50%" striped>
            <thead>
              <tr>
                {keys.map(data => {
                  return (
                  <th key={data}>{data}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody height="10%">
                 { 
                  currentRows.map(data => {
                    return (
                      <tr key={count}>
                        {
                          Object.values(data).map(each => {
                            return (
                            <td key={count++}>{each}</td>
                          )
                          })
                       }
                      </tr>
                    )
                   
                  })
                } 
            </tbody>
          </Table>
                    <Pagination bsSize="medium">{renderPageNumbers}</Pagination>
            </Grid>
          */