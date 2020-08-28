const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'age floor hobby what diesel find hurt program flight soup behind upper',
    'https://rinkeby.infura.io/v3/1fc22cc3347440b4ad2c6b14ed9917cd'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data : bytecode })
    .send({ gas : '1000000', from : accounts[0]});

    console.log(interface); //console log out the ABI
    console.log('Contract deployed to ', result.options.address);   //console log out the address that it has been deployed to
};
deploy();