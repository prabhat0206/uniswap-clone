import React from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../lib/index";
import { client } from "../lib/sanity";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const CryptContext = React.createContext({} as any);
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://eth-rinkeby.alchemyapi.io/v2/FUOLN2DrTAt1w1r2KK8EmnxFZjxbWdbd"
  )
);

let eth: any;

if (typeof window !== "undefined") {
  eth = window?.ethereum;
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(eth);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );
  return transactionContract;
};

interface FormDaTa {
  addressTo: string;
  amount: string;
}

export const CryptProvider = ({ children }: any) => {
  const [currentAccount, setCurrentAccount] = React.useState<any | null>(null);
  const [formData, setFormData] = React.useState<FormDaTa>({
    addressTo: "",
    amount: "",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currentBalance, setCurrentBalance] = React.useState<string>("");
  const [transactions, setTransactions] = React.useState<any[]>();

  const connectWallet = async (metamask: any = eth) => {
    try {
      if (!metamask) return alert("Wallet not found");
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfWalletIsConnected = async (metamask: any = eth) => {
    try {
      if (!metamask) return alert("Wallet is not connected");
      const accounts = await metamask.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    try {
      (async () => {
        try {
          const query = `*[_type=="users" && _id == "${currentAccount}" ]{
            "transactionList": transactions[]->{amount, to, date, txHash}|order(date desc)[0..2]
          }`;

          const clientres = await client.fetch(query);
          setTransactions(clientres[0].transactionList);
        } catch (err) {}
      })();
    } catch (err) {}
  }, [isLoading]);

  React.useEffect(() => {
    const checkCurrentBalance = () => {
      try {
        web3.utils.toChecksumAddress(currentAccount);
        web3.eth.getBalance(currentAccount, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            setCurrentBalance(web3.utils.fromWei(result, "ether").slice(0, 5));
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    checkCurrentBalance();
  }, [currentAccount]);

  React.useEffect(() => {
    if (!currentAccount) return;
    (async () => {
      const userDoc = {
        _type: "users",
        _id: currentAccount,
        username: "some user",
        address: currentAccount,
      };

      await client.createIfNotExists(userDoc);
    })();
  }, [currentAccount]);

  const saveTransaction = async (
    txHash: string,
    amount: string,
    from: string = currentAccount,
    to: string
  ) => {
    const txDoc = {
      _type: "transactions",
      _id: txHash,
      from: from,
      to: to,
      date: new Date(Date.now()).toISOString(),
      txHash: txHash,
      amount: parseFloat(amount),
    };

    await client.createIfNotExists(txDoc);

    await client
      .patch(currentAccount)
      .setIfMissing({ transactions: [] })
      .insert("after", "transactions[-1]", [
        {
          _key: txHash,
          _ref: txHash,
          _type: "reference",
        },
      ])
      .commit();

    return;
  };

  const sendEther = async (
    metamask: any = eth,
    account: any = currentAccount
  ) => {
    try {
      if (!metamask) return alert("Metamask not found");
      const { addressTo, amount } = formData;

      const cryptContract = getEthereumContract();

      const parsedAmount = ethers.utils.parseEther(amount);
      await metamask.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: addressTo,
            gas: "0x7EF40",
            value: parsedAmount._hex,
          },
        ],
      });
      const transactionHash = await cryptContract.sendMoney(
        addressTo,
        parsedAmount,
        `Transferring ETH ${parsedAmount} to ${addressTo}`,
        "TRANSFER"
      );

      setIsLoading(true);

      await transactionHash.wait();

      await saveTransaction(
        transactionHash.hash,
        amount,
        currentAccount,
        addressTo
      );

      setIsLoading(false);
    } catch (err) {}
  };

  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const handleChange = (e: any, name: string) => {
    setFormData((prevState: FormDaTa) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  return (
    <CryptContext.Provider
      value={{
        currentAccount,
        connectWallet,
        isLoading,
        sendEther,
        handleChange,
        formData,
        currentBalance,
        transactions,
      }}
    >
      {children}
    </CryptContext.Provider>
  );
};

// 0xB8e89D7d9191F4Fe78264f847789E5B84D7C3105
