import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

class Chemical extends Component {
    constructor(props) {
        super(props);
        this.state = {
          response: [],
          chemical: [],
          currentPage: 1,
          rowsPerPage: 25
        }
        this.handleClick = this.handleClick.bind(this);
      }
      
      async componentDidMount() {
        await this.results();
        const chemical = await this.renderContent();
        this.setState({ chemical });
        console.log(this.state.chemical)
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

        const {currentPage, rowsPerPage} = this.state;

        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRows = this.state.chemical.slice(indexOfFirstRow, indexOfLastRow);

        const pageNumbers = [];
          for (let i = 1; i <= Math.ceil(this.state.chemical.length / rowsPerPage); i++) {
            pageNumbers.push(i);
          }
        
          const renderPageNumbers = pageNumbers.map(number => {
            return (
              <td
                key={number}
                id={number}
                onClick={this.handleClick}
              >
                -  {number}  -
              </td>
            );
          });

        return (
          <div className="App">
          <h4>Chemical</h4>
          <Table striped>
            <thead>
              <tr>
                {keys.map(data => {
                  return (
                  <th key={data}>{data}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
                 { 
                  this.state.chemical.map(data => {
                    return (
                      <tr>
                        {
                          Object.values(data).map(each => {
                            return (
                            <td>{each}</td>
                          )
                          })
                       }
                      </tr>
                    )
                   
                  })
                } 
            </tbody>
          </Table>
          <div>
            <table id="page-numbers">
            {renderPageNumbers}
            </table>
          </div>
          </div>
        );
      }
}

export default Chemical;