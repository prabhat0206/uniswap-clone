import React from "react";
import { CryptContext } from "../context";
import { FaCog } from "react-icons/fa";

export const Main = () => {
  const { handleChange, sendEther, formData, isLoading } =
    React.useContext(CryptContext);

  const handleSubmit = async () => {
    const { addressTo, amount } = formData;
    if (!addressTo || !amount) return;
    sendEther();
  };

  return (
    <div className="w-full flex justify-center items-center ">
      {isLoading ? (
        <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-40 flex flex-col justify-center items-center">
          <div className="flex items-center justify-center flex-col ">
            <div className="w-24 h-24 border-l-2 border-white rounded-full animate-spin"></div>
          </div>
        </div>
      ) : null}
      <div className="bg-white bg-opacity-20 p-5 rounded-3xl flex flex-col">
        <div className="pb-3 flex justify-between items-center">
          <span className="font-bold">Swap</span>
          <FaCog color="white" />
        </div>
        <div className=" bg-black bg-opacity-20 rounded-2xl">
          <input
            type="text"
            placeholder="0.0 eth"
            className="bg-transparent p-5 outline-none"
            onChange={(e) => handleChange(e, "amount")}
          />
        </div>
        <div className=" bg-black bg-opacity-20 mt-3 rounded-2xl">
          <input
            type="text"
            placeholder="0x..."
            className="bg-transparent p-5 outline-none"
            onChange={(e) => handleChange(e, "addressTo")}
          />
        </div>
        <button
          onClick={() => handleSubmit()}
          className=" bg-purple-600 mt-3 p-3 rounded-2xl"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
