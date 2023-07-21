require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/C-mHa2YwPA26AL7OhZvqIza4ekc3FHw5",
      accounts: [
        "ef66b8b441878e72decf1c4158b0598cdd382fd00444abf5969dd04d7e4e012f",
      ],
    },
  },
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
    tests: "./tests",
  },
};
