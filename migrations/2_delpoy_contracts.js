const Factory = artifacts.require("UniswapV2Factory");
const Token1 = artifacts.require("Token1");
const Token2 = artifacts.require("Token2");
const MyContract=artifacts.require("MyContract")
module.exports = async function (deployer,network,addresses) {
    let token1Address,token2Address;
    await deployer.deploy(MyContract);
    await deployer.deploy(Token1);
    const token1 = await Token1.deployed();
    await deployer.deploy(Token2);
    const token2 = await Token2.deployed();
    token1Address = token1.address;
    token2Address = token2.address;
    if (network=='mainnet'){}else {
        await deployer.deploy(Factory, addresses[0]);
        const factory = await Factory.deployed();
        factory.createPair(token1Address,token2Address);}
};