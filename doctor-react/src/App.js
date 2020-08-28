import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './App.css';
import web3 from  './web3';
import ehr from './doctor';
import ipfs from './ipfs';

class App extends Component {
  state = { 
    desc : '',
    addr : '',
    message : '',
    buffer : ''
  };

  captureFile =(event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)    
  };

  convertToBuffer = async(reader) => {
      const buffer = await Buffer.from(reader.result);
      this.setState({buffer});
  };

  handleClick = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err,ipfsHash);
      this.setState({ ipfsHash:ipfsHash[0].hash });
    });

    this.setState({ message : 'Updating EHR ...'});

    const message1 = await ehr.methods.updateEHR(this.state.addr, this.state.ipfsHash).send({
      from : accounts[0]
    });

    this.setState({ message : 'Updated'});
  };

  render() {
    return (
      <div class ="search_container">
            <p class ="search_title">
                Patient address
            </p>
            <input class="search_input" type="text" placeholder="Search" 
              addr = {this.state.addr}
              onChange = {event => this.setState({ addr : event.target.value })} /> 
            <p class ="search_title">
                    Patient details
                </p>
         
                
                <table align = "center">
                    <tr>
                        <td>
                           <input type = "file"  onChange = {this.captureFile}  />
                            </td>
                            </tr>

                    <tr>
                      <td>
                        <button class = "bt" onClick={this.handleClick}>
                        Submit
                        </button>
                        </td>
                    </tr>

                    <tr>
                      <td>
                        {this.state.message}
                      </td>
                    </tr>
                </table>
            </div>
    );
  }
}

export default App;
