"use client";

import React, { useState } from "react";

const VerifyCert = () => {
  const [leafCertificate, setLeafCertificate] = useState("");
  const [intermediateCertificate, setIntermediateCertificate] = useState("");
  const [derivedKey, setDerivedKey] = useState("");
  const [quote, setQuote] = useState("");
  const [result, setResult] = useState<string | { error: string; details: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setResult(null);

    try {
      // Combine certificates into a chain
      const chain = [leafCertificate, intermediateCertificate].join("\n");

      // Mock verification command
      const rootCertPath = "/path/to/sgx_root_ca.pem";
      const verifyCommand = `echo "${leafCertificate}" | openssl verify -CAfile ${rootCertPath}`;
      console.log("Verification Command:", verifyCommand);

      // Simulating successful verification
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call delay
      setResult(`Verification Successful: Command - ${verifyCommand}`);
    } catch (error: any) {
      setResult({ error: "Verification failed", details: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 py-8">
      <div className="bg-gray-800 shadow-xl rounded-lg w-full max-w-3xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center animate-fade-in">
          Verify Certificate and Quote
        </h1>

        <div className="space-y-6">
          <div>
            <label htmlFor="leafCertificate" className="block text-sm font-medium text-gray-400">
              Leaf Certificate
            </label>
            <textarea
              id="leafCertificate"
              placeholder="Enter Leaf Certificate"
              value={leafCertificate}
              onChange={(e) => setLeafCertificate(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
            />
          </div>

          <div>
            <label htmlFor="intermediateCertificate" className="block text-sm font-medium text-gray-400">
              Intermediate Certificate
            </label>
            <textarea
              id="intermediateCertificate"
              placeholder="Enter Intermediate Certificate"
              value={intermediateCertificate}
              onChange={(e) => setIntermediateCertificate(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={5}
            />
          </div>

          <div>
            <label htmlFor="derivedKey" className="block text-sm font-medium text-gray-400">
              Derived Key
            </label>
            <textarea
              id="derivedKey"
              placeholder="Enter Derived Key"
              value={derivedKey}
              onChange={(e) => setDerivedKey(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="quote" className="block text-sm font-medium text-gray-400">
              Quote
            </label>
            <textarea
              id="quote"
              placeholder="Enter Quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className={`w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg font-medium transition-transform duration-200 ${
              loading
                ? "opacity-70 cursor-not-allowed scale-95"
                : "hover:bg-blue-700 hover:scale-105"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </button>
        </div>

        {result && (
          <div
            className={`mt-6 p-4 border rounded-lg ${
              typeof result === "string"
                ? "bg-green-800 text-green-200 border-green-500"
                : "bg-red-800 text-red-200 border-red-500"
            } animate-slide-in`}
          >
            {typeof result === "string" ? (
              <p className="text-sm">{result}</p>
            ) : (
              <p className="text-sm">
                <strong>Error:</strong> {result.error}
                <br />
                <strong>Details:</strong> {result.details}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyCert;
