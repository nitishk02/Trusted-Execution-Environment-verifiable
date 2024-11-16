"use client";
//@ts-ignore
import React, { useState } from "react";
import Safe, { PredictedSafeProps } from "@safe-global/protocol-kit";
import EthersAdapter from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEthersProvider } from "./ethers";
import SafeApiKit from '@safe-global/api-kit'
import { useEthersSigner } from "./signer";



const CreateSafe = () => {
  const [owners, setOwners] = useState<string[]>([""]);
  const [threshold, setThreshold] = useState<number>(1);
  const [safeAddress, setSafeAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addOwnerField = () => setOwners([...owners, ""]);

  const removeOwnerField = (index: number) => {
    const updatedOwners = [...owners];
    updatedOwners.splice(index, 1);
    setOwners(updatedOwners);
  };
  const safeAccountConfig={
    owners: owners,
    threshold: threshold,
  }
  const predictedSafe: PredictedSafeProps = {
    safeAccountConfig
  }
  



  const deploySafe = async () => {

    const protocolKit = await Safe.init({
      //@ts-ignore
      useEthersProvider,
      })
      console.log(protocolKit)
    if (threshold < 1 || threshold > owners.length) {
      alert("Threshold must be between 1 and the number of owners.");
      return;
    }

    try {
      setIsLoading(true);

      // Initialize Safe Core SDK with EthersAdapter
      const ethAdapter = new EthersAdapter();
      // Deploy the Safe wallet
      //@ts-ignore
      const safeInstance = await safeFactory.deploySafe({
        owners,
        threshold,
      });


      const deployedSafeAddress = safeInstance.getAddress();
      setSafeAddress(deployedSafeAddress);

      console.log("Safe deployed at:", deployedSafeAddress);
      alert(`Safe Multisig Wallet deployed at: ${deployedSafeAddress}`);
    } catch (error) {
      console.error("Error deploying Safe:", error);
      alert("Error deploying Safe. Check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Create Safe Multisig Wallet</h1>

      {/* Connect Wallet */}
      <ConnectButton />

      {/* Owners Input Fields */}
      <div className="mb-6 w-full max-w-md">
        <label className="block text-sm font-medium mb-2">Owners:</label>
        {owners.map((owner, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={owner}
              onChange={(e) => {
                const updatedOwners = [...owners];
                updatedOwners[index] = e.target.value;
                setOwners(updatedOwners);
              }}
              placeholder={`Owner ${index + 1} Address`}
              className="flex-1 p-2 bg-gray-800 rounded"
            />
            {index > 0 && (
              <button
                onClick={() => removeOwnerField(index)}
                className="bg-red-600 text-white px-2 rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addOwnerField}
          className="bg-blue-600 py-1 px-4 rounded hover:bg-blue-700"
        >
          Add Owner
        </button>
      </div>

      {/* Threshold Input */}
      <div className="mb-6 w-full max-w-md">
        <label className="block text-sm font-medium mb-2">Threshold:</label>
        <input
          type="number"
          min="1"
          max={owners.length}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full p-2 bg-gray-800 rounded"
        />
      </div>

      {/* Deploy Safe Button */}
      <button
        onClick={deploySafe}
        disabled={isLoading}
        className={`bg-green-600 py-2 px-6 rounded hover:bg-green-700 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Deploying..." : "Deploy Safe"}
      </button>

      {/* Deployed Safe Address */}
      {safeAddress && (
        <div className="mt-6 text-center">
          <h2 className="text-lg font-bold">Safe Deployed Successfully!</h2>
          <p className="text-green-400 break-all">{safeAddress}</p>
        </div>
      )}
    </div>
  );
};

export default CreateSafe;
