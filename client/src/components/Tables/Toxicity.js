import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

class Toxicity extends Component {
    constructor(props) {
        super(props);
        this.state = {
          response: [],
          posts: [],
          currentPage: 1,
          rowsPerPage: 25
        };
        this.handleClick = this.handleClick.bind(this);
      }
      
      async componentDidMount() {
        await this.results();
        const posts = await this.renderContent();
        console.log("these are the posts:", posts);
        this.setState({ posts });
        console.log(this.state.posts);
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
        let countRow = 0, countData = 0;

        const {currentPage, rowsPerPage} = this.state;

        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRows = this.state.posts.slice(indexOfFirstRow, indexOfLastRow);
        console.log("current rows", currentRows);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.posts.length / rowsPerPage); i++) {
            pageNumbers.push(i);
          }
          const renderPageNumbers = pageNumbers.map(number => {
            return (
              <td
                key={number}
                id={number}
                onClick={this.handleClick}
              >
                {number}
              </td>
            );
          });

        return (
          <div className="App">
          <h4>Toxicity</h4>
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
                  this.state.posts.map(data => {
                    return (
                      <tr key={countRow++}>
                        {
                          Object.values(data).map(each => {
                            return (
                            <td key={countData++}>{each}</td>
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

export default Toxicity;