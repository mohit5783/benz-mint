"use client";

import Link from "next/link";
import { useState } from "react";
import { ethers } from "ethers";

import { AiFillPlayCircle } from "react-icons/ai";

import ConnectWallet from "./ConnectWallet";
import Install from "./Install";
import TexttoImageGenerator from "./TexttoImageGenerator";

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

export default function Welcome() {
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(_balance));
  };

  if (typeof window !== undefined && typeof window === "object") {
    if (window.ethereum) {
      return (
        <div className="flex flex-[0.4] w-full justify-center items-center">
          <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
            <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
              <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                Mint NFTs <br /> across the world
              </h1>
              <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                Explore the NFTs world. mint easily on BenzMint.
              </p>
              <button
                type="button"
                onClick={() => connectWallet()}
                className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] pl-5 pr-5"
              >
                <AiFillPlayCircle className="text-white mr-2" />
                <p className="text-white text-base font-semibold">
                  {balance ? balance : "Connect Wallet"}
                </p>
              </button>
              <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                  Innovative
                </div>
                <div className={companyCommonStyles}>Trustworthy</div>
                <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                  Ethereum
                </div>
                <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                  Web 3.0
                </div>
                <div className={companyCommonStyles}>Immersive</div>
                <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                  Blockchain
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[0.1] flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            &nbsp;
          </div>
          <div className="flex-[0.5] flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            {balance ? <TexttoImageGenerator /> : <ConnectWallet />}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-[0.4] w-full justify-center items-center">
          <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
            <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
              <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                Mint NFTs <br /> across the world
              </h1>
              <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                Explore the NFTs world. mint easily on BenzMint.
              </p>
              <Link
                href="https://metamask.io/download/"
                className="flex flex-row justify-center items-center my-5 bg-[#763D16] p-3 rounded-full cursor-pointer hover:bg-[#F6851B] pl-5 pr-5"
              >
                <AiFillPlayCircle className="text-white mr-2" />
                <p className="text-white text-base font-semibold">
                  Install Metamask
                </p>
              </Link>
              <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                  Innovative
                </div>
                <div className={companyCommonStyles}>Trustworthy</div>
                <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                  Ethereum
                </div>
                <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                  Web 3.0
                </div>
                <div className={companyCommonStyles}>Immersive</div>
                <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                  Blockchain
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[0.1] flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            &nbsp;
          </div>
          <div className="flex-[0.5] flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            <Install />
          </div>
        </div>
      );
    }
  }
}
