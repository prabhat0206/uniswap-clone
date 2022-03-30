import moment from "moment";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import { CryptContext } from "../context";

interface Transcation {
  _id: string;
  txHash: string;
  amount: string;
  to: string;
  date: string;
}

export const History = () => {
  const { transactions } = React.useContext(CryptContext);
  return (
    <div className="flex flex-col justify-end p-2 h-20 items-end">
      <div className="flex flex-col absolute">
        {transactions
          ? transactions.map((transaction: Transcation) => (
              <div
                key={transaction._id}
                className="p-2 bg-white bg-opacity-20 mt-2 w-[28rem] rounded-lg flex items-center justify-between"
              >
                <a
                  href={`https://rinkeby.etherscan.io/tx/${transaction.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center"
                >
                  <FaEthereum /> {transaction.amount} ETH to{" "}
                  {transaction.to.slice(0, 7)}.....{transaction.to.slice(35)}{" "}
                </a>
                {moment(transaction.date).fromNow()}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
