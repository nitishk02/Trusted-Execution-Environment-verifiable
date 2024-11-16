import React, { useState } from "react";

const SignTransaction = () => {
  const [walletId, setWalletId] = useState("");
  const [transactionData, setTransactionData] = useState("");
  const [userSignature, setUserSignature] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSign = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/sign-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletId, transactionData, userSignature }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error signing transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Sign and Broadcast Transaction</h2>

        <div>
          <label className="block text-sm font-medium text-gray-400">Wallet ID</label>
          <input
            type="text"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            className="w-full mb-2 p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
            placeholder="Enter Wallet ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Transaction Data</label>
          <textarea
            value={transactionData}
            onChange={(e) => setTransactionData(e.target.value)}
            className="w-full mb-2 p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
            placeholder="Enter Transaction Data"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">User Signature</label>
          <textarea
            value={userSignature}
            onChange={(e) => setUserSignature(e.target.value)}
            className="w-full mb-2 p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
            placeholder="Enter User Signature"
          />
        </div>

        <button
          onClick={handleSign}
          className={`w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Signing..." : "Sign and Broadcast"}
        </button>

        {result && (
          <div className="mt-4 p-3 bg-green-700 rounded-lg text-sm text-green-100">
            Transaction Broadcasted Successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default SignTransaction;
