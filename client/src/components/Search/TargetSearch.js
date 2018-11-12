import React, { Component } from 'react';
import axios from 'axios';
import { Pagination, Table, FormControl, FormGroup, ControlLabel, Grid } from 'react-bootstrap';

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

        const {currentPage, rowsPerPage} = this.state;

        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRows = this.state.target.slice(indexOfFirstRow, indexOfLastRow);


        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.target.length / rowsPerPage); i++) {
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

          return (
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
          );
          }
      }
      render() {
        return (
          <div className="App">
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