import React, { Component } from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './NewAssay.css';

class NewAssay extends Component {
    constructor(props) {
        super(props);
        this.state = {
          response: [],
          assay: []
        };
      }
      
      async componentDidMount() {
        await this.results();
        const assay = await this.renderContent();
        this.setState({ assay });
        console.log(this.state.assay)
      }
    
      async results() {
        await axios.get('http://localhost:5000/posts')
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
                  <TableHeaderColumn width='300px' dataField={data}>{data}</TableHeaderColumn>
                  )
                })}
          </BootstrapTable>
        );
      }
}

export default NewAssay;