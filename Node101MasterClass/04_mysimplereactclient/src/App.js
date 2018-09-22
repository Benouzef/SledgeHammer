import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();
    this.state = {data:[]};
    this.getData = this.getData.bind(this);
  };

  componentDidMount() {
    this.getData(this);
  }

  getData(ev) {
    axios.get('http://localhost:3000/Customers/', { crossdomain: true }).then(
      function (response) {
        console.log(response);
        ev.setState({data: response.data})
      }
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(function(customer) {
                return <tr>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
