require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: "0.8.28",
  networks: {
    chiliz: {
      url: "https://spicy-rpc.chiliz.com",
      chainId: 88882,
      accounts: ['']
    }
  }
};
