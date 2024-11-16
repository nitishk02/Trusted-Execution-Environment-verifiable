// src/app/page.tsx
"use client";
import "@rainbow-me/rainbowkit/styles.css";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from 'react';
import 'dotenv/config';
import FormData from 'form-data';
import axios from 'axios';
import hashes from  "./hashes.json";
import { flare } from "viem/chains";

function hexToUint8Array(hex: string) {
  hex = hex.trim();
  if (!hex) {
    throw new Error("Invalid hex string");
  }
  if (hex.startsWith("0x")) {
    hex = hex.substring(2);
  }
  if (hex.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }

  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    const byte = parseInt(hex.slice(i, i + 2), 16);
    if (isNaN(byte)) {
      throw new Error("Invalid hex string");
    }
    array[i / 2] = byte;
  }
  return array;
}

async function uploadUint8Array(data: Uint8Array) {

  const blob = new Blob([data], { type: "application/octet-stream" });
  console.log(blob);
  const file = new File([blob], "quote.bin", {
    type: "application/octet-stream",
  });
  console.log(file);
  const formData = new FormData();
  formData.append("file", file);

  const result = await fetch("https://dstack-sim-explorer.vercel.app/api/upload", {
    method: "POST",
    // @ts-ignore
    body: formData,
    mode: 'no-cors',
  });
  console.log(result);
  return result;
}

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<boolean | null>(true);
  const [certifacte, setCertifacte] = useState<any>()
  const [res, setRes] = useState<any>()


  // Define the function to be called on button click
  const handleClick = async (path: string) => {
    try {
      let response, data;
      if (path === '/api/signMessage') {
        const messageData = { message: "t/acc" };
        response = await fetch(path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        });
        data = await response.json();
        console.log(JSON.stringify(data));
        setResult(JSON.stringify(data, null, 2)); // Pretty print JSON
      } else {
        response = await fetch(path);
        data = await response.json();
        console.log(JSON.stringify(data));
        if (path === '/api/remoteAttestation') {
          const remoteAttestionQuoteHex = data.quote;
          console.log(remoteAttestionQuoteHex);
          const remoteAttestationQuoteU8Array = hexToUint8Array(remoteAttestionQuoteHex);
          console.log(remoteAttestationQuoteU8Array);
          console.log('Uploading Attestation...');
          const uploadResult = await uploadUint8Array(remoteAttestationQuoteU8Array);
          console.log(uploadResult);
          console.log('Upload Complete...');
        }
        setResult(JSON.stringify(data, null, 2)); // Pretty print JSON
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: ' + error);
    }
  };


  useEffect(() => {
    async function verifyFrontend() {
        try {
          const frontendHash = JSON.stringify(hashes?.BUILD_ID);
            const response = await axios.post('/api/verify', { frontendHash });
            console.log(response);
            setRes(response.data);
            setCertifacte(response.data.certificateChain);
            const r = response?.data?.verificationResult;
            setVerificationStatus(r);
        } catch (error) {
            setVerificationStatus(false);
        }
    }

    const timeoutId = setTimeout(() => {
        verifyFrontend();
    }, 5000);

    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
}, []);

console.log(verificationStatus);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        TEE Verifiable Frontend
      </h1>

      <p className="text-center text-lg font-medium">
        Verification Status:{" "}
        <span className={`font-semibold ${verificationStatus ? "text-green-600" : "text-red-600"}`}>
          {verificationStatus ? "Success" : "Failed"}
        </span>
      </p>

      <ol className="list-decimal list-inside text-gray-600 mt-4">
        <li>Generate a Remote Attestation.</li>
        <li>Get TEE Account.</li>
        <li>Test Signing Capabilities.</li>
      </ol>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <button
          onClick={() => handleClick("/api/remoteAttestation")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Remote Attestation
        </button>
        <button
          onClick={() => handleClick("/api/account/address")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          TEE Account
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <button
          onClick={() => handleClick("/api/signMessage")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Sign Message
        </button>
        <button
          onClick={() => handleClick("/api/signTypedData")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Sign Typed Data
        </button>
        <button
          onClick={() => handleClick("/api/signTransaction")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Sign Transaction
        </button>
      </div>

      <div className="bg-gray-50 border-t border-gray-200 mt-8 p-4 rounded">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Result:</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm text-gray-700">{result}</pre>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm text-gray-700">{certifacte}</pre>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm text-gray-700">{res?.quote}</pre>
      </div>
    </main>
  </div>
  );
}
