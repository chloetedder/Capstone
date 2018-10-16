import React, { Component } from 'react';
import axios from 'axios';

class Assay extends Component {
    constructor(props) {
        super(props);
        this.state = {
          response: [],
          posts: []
        };
      }
      
      async componentDidMount() {
        await this.results();
        const posts = await this.renderContent();
        console.log("these are the posts:", posts);
        this.setState({ posts });
        console.log(this.state.posts);
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
                  this.state.posts.map(data => {
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