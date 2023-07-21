function ConnectWallet() {
  return (
    <div className="flex items-center flex-col">
      <h2 className="text-3xl sm:text-5xl text-white text-gradient">
        Connecting your wallet
      </h2>
      <div className="mt-2 items-start justify-between">
        <p className="text-left mt-5 text-white font-light text-base">
          In order to mint your NFT you must connect your wallet using the{" "}
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
      </div>
    </div>
  );
}

export default ConnectWallet;
