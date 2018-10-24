import React, { Component } from 'react';
import axios from 'axios';

class Assay extends Component {
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
        return (
          <div className="App">
          <table>
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
                  this.state.assay.map(data => {
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
          </table>
          </div>
        );
      }
}

export default Assay;