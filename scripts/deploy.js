const hre = require("hardhat");

const main = async () => {
  let [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const BenzContract = await hre.ethers.getContractFactory("BenzContract");
  const benzNFT = await BenzContract.deploy();
  console.log("BenzContract is deploying ...");
  await benzNFT.deployed();
  console.log("BenzContract is deployed to :-> ", benzNFT.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
