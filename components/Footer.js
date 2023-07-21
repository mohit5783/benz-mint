import Link from "next/link";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <img src="/logo.svg" alt="logo" height={64} width={64} />
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <p
            className="text-white text-base text-center mx-2 cursor-pointer"
            key={index}
          >
            {item}
          </p>
        ))}
      </div>
    </div>

    <div className="w-full flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">
        Join the prestigious Mercedes-Benz family and experience the thrill of
        driving success!
      </p>
      <p className="text-white text-sm text-center font-medium mt-2">
        mohit5783@gmail.com
      </p>
    </div>

    <div className="w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className=" w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">
        <Link href="https://iamohit.com">@iAMohit</Link>
      </p>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;
