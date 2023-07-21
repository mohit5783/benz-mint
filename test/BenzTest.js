const { expect } = require("chai");
const { ethers } = require("hardhat");
const { it } = require("node:test");

describe("Benz", function () {
  it("Should mint and transfer NFT to anyone", async function () {
    const BenzContract = await ethers.getContractFactory("BenzContract");
    const benzContract = await BenzContract.deploy();
    await benzContract.deployed();

    const receipient = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const metadataURI = "/logo.png";
    let balance = await benzContract.balanceOf(receipient);
    expect(balance).to.equal(0);
    const newlyMintedToken = await benzContract.payToMint(
      receipient,
      metadataURI,
      { value: ethers.utils.parseEther("0.1") }
    );
    await newlyMintedToken.wait();

    balance = await benzContract.balanceOf(receipient);
    expect(balance).to.equal(1);
    expect(await benzContract.isContentOwned(metadataURI)).to.equal(true);

  });
});
