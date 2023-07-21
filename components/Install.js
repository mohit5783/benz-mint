"use client";

import Link from "next/link";

const Install = () => {
  return (
    <div className="flex items-center flex-col">
      <h2 className="text-3xl sm:text-5xl text-white text-gradient">
        Install Metamask
      </h2>
      <div className="mt-2 items-start justify-between">
        <p className="text-left mt-5 text-white font-light text-base">
          In order to mint your NFT you must install the{" "}
          <a
            className="underline"
            href="https://metamask.io/"
            target="_blank"
            rel="noreferrer"
          >
            Metamask extension.
          </a>
        </p>
        <p className="text-left mt-5 text-white font-light text-base">
          Metamask sometimes presents some UX issues where it will not open
          properly. It is good to guide users trough this process to keep
          accessibility in mind.
        </p>
        <div className="flex justify-center">
          <Link
            href="https://metamask.io/download.html"
            className="flex flex-row justify-center items-center my-5 bg-[#763D16] p-3 rounded-full cursor-pointer hover:bg-[#F6851B] pl-5 pr-5"
          >
            Meta Mask
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Install;
