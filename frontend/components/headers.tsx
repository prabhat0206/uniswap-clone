import React from "react";
import { CryptContext } from "../context";
import brandLogo from "../assets/uniswap.png";
import Image from "next/image";
import { AiFillWallet } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";

export const Header = () => {
  const { connectWallet, currentAccount, currentBalance } =
    React.useContext(CryptContext);

  return (
    <div className="w-full p-2 flex justify-between items-center">
      <div>
        <Image src={brandLogo} alt="" width="50" height="50" />
      </div>
      <div className="flex justify-between items-center">
        {currentAccount ? (
          <div
            onClick={() => connectWallet()}
            className="p-2 bg-white bg-opacity-10 h-11 mr-2 px-5 flex items-center rounded-lg"
          >
            <FaEthereum color="white" className="mr-1" />
            {currentBalance} ETH
          </div>
        ) : null}

        <button
          onClick={() => connectWallet()}
          className="p-2 bg-white bg-opacity-10 h-11 px-5 flex items-center rounded-lg"
        >
          <AiFillWallet color="white" className="mr-1" />
          {currentAccount
            ? `${currentAccount.slice(0, 6)}.....${currentAccount.slice(38)}`
            : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};
