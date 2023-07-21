"use client";

import { useState } from "react";
import Loader from "./Loader";
import styles from "../styles/TexttoImageGenerator.module.css";
import { ethers } from "ethers";
import { NFTStorage, File } from "nft.storage";

import BenzContract from "../artifacts/contracts/BenzContract.sol/BenzContract.json";
const contractAddress = "0x4711BDd4e6560A9602180c5bFaD6DcCdF4e5993E";

function TexttoImageGenerator() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    BenzContract.abi,
    signer
  );
  const [prompt, setPrompt] = useState("");
  const [NRIC, setNRIC] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [totalMinted, setTotalMinted] = useState(0);

  const uploadImage = async (fileContent) => {
    const res = await fetch(fileContent);
    const blob = await res.blob();
    let fileName = NRIC + totalMinted + ".png";
    const image = new File([blob], NRIC + totalMinted, { type: "image/png" });
    const nftstorage = new NFTStorage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzM2VmOURBMDJDNDAwMTc5RGU5Qzg3Y2Y1MDEzM2VlQzM5QjlBZDEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4OTg5NTA3MzI2NCwibmFtZSI6IkJlbnpJUEZTIn0.h_pMK9FTd2wDPSZTsIf5S5ClxY1jFJKhiRf6mo5fp6k",
    });
    return nftstorage.store({
      image,
      name: fileName,
      description: prompt,
    });
  };
  const handleMintNFT = async () => {
    if (NRIC.trim() === "") {
      alert("Please enter NRIC");
      return;
    } else if (image === null) {
      alert("Please generate image from the prompt");
      return;
    }
    try {
      let nric_wallet = {
        nric: NRIC,
        walletAddress: await signer.getAddress(),
      };
      const response = await fetch("/nric-wallet", {
        method: "POST",
        body: JSON.stringify(nric_wallet),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let res = await response.json().then((res) => {
        return res.message;
      });
    } catch (error) {
      console.error("Error while using API nric-wallet SQL", error);
    }
    let imgUri = await uploadImage(image);

    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, imgUri, {
      value: ethers.utils.parseEther("0.0001"),
    });

    await result.wait();
    console.log("Minted NFT", result);
    setTotalMinted(totalMinted + 1);
  };
  const generateImage = async () => {
    if (prompt.trim() === "") {
      return;
    }
    setIsLoading(true);
    try {
      let img_text = {
        text: prompt,
      };
      const response = await fetch("/text-to-image", {
        method: "POST",
        body: JSON.stringify(img_text),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let res = await response.json().then((res) => {
        return res.message;
      });
      setImage(`data:image/png;base64,${res}`);
      setIsGenerated(true);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetImage = () => {
    setImage(null);
    setPrompt("");
    setIsGenerated(false);
  };
  return (
    <div className={styles.container}>
      <div className="flex items-center flex-col">
        <h2 className="text-3xl sm:text-5xl text-white text-gradient">
          Generate an Image
        </h2>
        <div className="mt-2 items-start justify-between">
          <p className="text-left mt-5 text-white font-light text-base mb-10">
            Unleash your creativity and mint your unique NFT Image with the
            prompt of your dreams!
          </p>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className={styles.input}
          placeholder="Enter prompt"
        />
        {!isGenerated ? (
          <button
            onClick={generateImage}
            className={styles.generateButton}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Generate"}
          </button>
        ) : (
          <>
            <button onClick={handleMintNFT} className={styles.button}>
              Mint NFT
            </button>
            <button onClick={resetImage} className={styles.removeButton}>
              X
            </button>
          </>
        )}
      </div>
      {isLoading ? <Loader /> : ""}
      {image && (
        <>
          <div className={styles.imageContainer}>
            <img src={image} alt="Generated" />
          </div>
          <input
            required
            type="text"
            value={NRIC}
            onChange={(e) => setNRIC(e.target.value)}
            className={styles.input}
            placeholder="Enter NRIC"
          />
        </>
      )}
    </div>
  );
}

export default TexttoImageGenerator;
