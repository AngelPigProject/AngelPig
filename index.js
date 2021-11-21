const Web3=require('web3');
const MyContract=require('./build/contracts/Mycontract.json');

const init=async ()=> {
    const web3 = new Web3('http://localhost:8545');
    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];
    const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
    );
    const addresses = await web3.eth.getAccounts();
    const receipt = await contract.methods.emitEvent('heymyfriend').send({
        from: addresses[0]
    });

    contract.events.MyEvent({}).on('data', event => console.log(event))
    await new Promise(resolve => setTimeout(() => resolve(), 2000));

    const receipt2 = await contract.methods.emitEvent('heymyfriend').send({
        from: addresses[0]
    });
}
init();