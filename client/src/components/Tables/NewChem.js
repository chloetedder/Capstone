import React, { Component } from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './NewAssay.css';

class NewChem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          response: [],
          chem: []
        };
      }
      
      async componentDidMount() {
        await this.results();
        const chem = await this.renderContent();
        this.setState({ chem });
        console.log(this.state.chem)
      }
    
      async results() {
        await axios.get('http://localhost:5000/chem')
        .then(res => {
          this.setState({ response: res.data })
        })
        .catch((err) => { console.log(err); });
      }
    
      renderContent() {
        let temp = this.state.response;
        temp.map(data => {
          return Object.values(data);
        })
        return temp;
      }
      render() {
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
                <h2>Chemical</h2>
                <br/>
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
                        <TableHeaderColumn width='300px' dataField={data}>{data}</TableHeaderColumn>
                        )
                        })}
                </BootstrapTable>
            </div>
        );
      }
}

export default NewChem;