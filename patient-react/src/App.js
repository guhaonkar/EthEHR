import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './App.css';
import web3 from  './web3';
import ehr from './patient';
import ipfs from './ipfs';

class App extends Component {
  state = { 
    message : 'QmYbM12ZeZLbL8XSJ723W2Z7ywTeEfFdEdyXXx45hekfg2',
    display : ''
  };

  onEHR = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ display : 'Waiting for EHR retrieval ...'});

    const ehrmess = await ehr.methods.viewEHR().call({
      from : accounts[0]
    });
    this.setState({ display : 'EHR retrieved'});
    this.setState({ message : ehrmess});
  }


  render() {
    return (
      <div>
      <div class ="search_container">
        <h2 class ="search_title">Patient</h2>

        <table align="center">
            <tr>
                <td><button class = "bt" onClick = {this.onEHR}>Retrieve your EHR</button></td>
            </tr>
            <tr>
                <td><p class ="search_title">EHR retrieval status: </p></td>
            </tr>
            <tr>
              <td>
                {this.state.display}
              </td>
            </tr>
        </table>
       </div>
       <div class ="search_container_2">

        <table align="center" border="0" >
            <tr>
                <td><p class ="search_title">EHR : </p></td>
            </tr>
            <tr>
                <td rowspan="0" colspan="1">
                  <div class="box">
                    <img src = {"https://ipfs.infura.io/ipfs/" + this.state.message} />
                  </div>
                </td>
            </tr>
        </table>
    </div>
    </div>
    );
  }
}

export default App;
