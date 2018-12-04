import React, { Component } from 'react';
import axios from 'axios';
import { Pagination, Table, FormControl, FormGroup, ControlLabel, Grid } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class AssaySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          originalAssay: [],
          response: [],
          assay: [],
          showTable: 0,
          name: '',
          aid: '',
          tissue: '',
          reagent: '',
          currentPage: 1,
          rowsPerPage: 25
        }
        this.handleClick = this.handleClick.bind(this);
      }
    
      async results() {
        await axios.get('http://localhost:5000/posts')
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
        const assay = await this.renderContent();
        this.setState({
            assay, 
            originalAssay: assay,
            showTable: 1
        });
        let filterArray = this.state.assay.filter(current=>{
            return current.assay_source_name.toString().includes(this.state.name);
        })
        filterArray = filterArray.filter(current=>{
            return current.aid.toString().includes(this.state.aid);
        })
        filterArray = filterArray.filter(current=>{
            return current.tissue.toString().includes(this.state.tissue);
        })
        filterArray = filterArray.filter(current=>{
          return current.key_assay_reagent_type.toString().includes(this.state.reagent);
        })
        this.setState({
            assay: filterArray
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
                    data={ this.state.assay }
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
          <h2>Assay Advanced Search</h2>
                <br/>
          <form>
            <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="name"
                />
                <ControlLabel>AID</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="aid"
                />
                <ControlLabel>Tissue</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="tissue"
                />
                <ControlLabel>Reagent Type</ControlLabel>
                <FormControl type="text"
                    onChange={e=>this.handleUserInput(e)}
                    name="reagent"
                />
                <button onClick={e=>this.handleSubmit(e)}>Submit</button>
                <button onClick={()=>this.setState({assay:this.state.originalAssay})}>Refresh</button>
            </FormGroup>
          </form>
          {this.renderTable()}
          </div>
        );
      }
}

export default AssaySearch;

/*
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

            const {currentPage, rowsPerPage} = this.state;

        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRows = this.state.assay.slice(indexOfFirstRow, indexOfLastRow);


        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.assay.length / rowsPerPage); i++) {
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
            */