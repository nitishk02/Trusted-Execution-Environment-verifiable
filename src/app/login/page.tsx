"use client";

import {
  CHAIN_NAMESPACES,
  IAdapter,
  IProvider,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from '../../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import RPC from "../ethersRPC";

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
};


function App() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const router = useRouter();
  const web3auth = new Web3Auth(web3AuthOptions);
  
  useEffect(() => {
    const init = async () => {
      try {
        const adapters = await getDefaultExternalAdapters({
          options: web3AuthOptions,
        });
        adapters.forEach((adapter: IAdapter<unknown>) => {
          web3auth.configureAdapter(adapter);
        });
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          router.push("/home");
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [router]);

  const checkAndAddUser = async (userInfo: any, address: string) => {
    const userRef = doc(db, 'users', address);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // User does not exist, add to Firestore
      await setDoc(userRef, {
        ...userInfo,
        address,
        createdAt: new Date(),
      });
      console.log('User added to Firestore.');
    } else {
      console.log('User already exists in Firestore.');
    }
  };

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      if (web3auth.connected && web3authProvider) {
        const userInfo = await web3auth.getUserInfo();
        const address = await RPC.getAccounts(web3authProvider!);
        checkAndAddUser(userInfo, address);

        await new Promise((resolve) => setTimeout(resolve, 8000));
        router.push("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-600 to-purple-800 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-tr from-blue-500  py-8 px-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to IronVaults
          </h1>
          <p className="text-white text-sm">
            Securely manage your wallet with seamless authentication.
          </p>
        </div>
        <div className="p-6 flex flex-col items-center">
          <button
            onClick={login}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md transform hover:scale-105 transition-transform"
          >
            Login with Web3Auth
          </button>
          <div className="mt-4 text-gray-600 text-sm text-center">
            By logging in, you agree to our{" "}
            <a href="/terms" className="text-blue-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
