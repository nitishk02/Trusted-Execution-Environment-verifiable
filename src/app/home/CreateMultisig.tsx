import React from "react";
import { FaEthereum, FaGasPump } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const WalletsPage: React.FC = () => {
  // Example wallet data
  const wallets = [
    {
      id: 26746,
      wallet: "eth ms8786",
      asset: "Ethereum",
      balance: "$321.97",
      status: "Cold",
      type: "Multisig",
      members: ["NI", "MA"],
      pending: "-",
    },
    {
      id: 21906,
      wallet: "eth",
      asset: "Ethereum",
      balance: "$315.13",
      status: "Cold",
      type: "Multisig",
      members: ["NI", "MA"],
      pending: "2",
    },
    {
      id: 30098,
      wallet: "eth ms test 178",
      asset: "Ethereum",
      balance: "$315.13",
      status: "Cold",
      type: "Multisig",
      members: ["NI", "MA"],
      pending: "-",
    },
    {
      id: 31257,
      wallet: "Nitish dev admin deposit ETH",
      asset: "Ethereum",
      balance: "$257.53",
      status: "Hot",
      type: "Deposit",
      members: ["NI", "MA", "KE"],
      pending: "-",
    },
    {
      id: 21912,
      wallet: "ethmpc2n",
      asset: "Ethereum",
      balance: "$31.12",
      status: "Cold",
      type: "Mobile",
      members: ["NI", "NI", "NI"],
      pending: "-",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Wallets</h1>
        <button
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 flex items-center space-x-2"
          onClick={() => window.location.href = '/wallet'}
        >
          <FaGasPump />
          <span>New Wallet</span>
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full sm:w-64 p-3 bg-gray-900 border  rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-700">
            All | 16
          </button>
          <button className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-700">
            Hot | 2
          </button>
          <button className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-700">
            Cold | 14
          </button>
          
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-700 text-gray-400 uppercase text-sm">
            <tr>
              <th className="py-4 px-6">ID</th>
              <th className="py-4 px-6">Wallet</th>
              <th className="py-4 px-6">Asset</th>
              <th className="py-4 px-6">Balance</th>
              <th className="py-4 px-6">Type</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Members</th>
              <th className="py-4 px-6">Pending</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet) => (
              <tr
                key={wallet.id}
                className="hover:bg-gray-700 transition-colors text-sm"
              >
                <td className="py-4 px-6">{wallet.id}</td>
                <td className="py-4 px-6">
                  <div>
                    <div className="font-bold text-white">{wallet.wallet}</div>
                    <div className="text-gray-400 text-xs">{wallet.asset}</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <FaEthereum className="text-xl" />
                </td>
                <td className="py-4 px-6">
                  <div>
                    <div>{wallet.balance}</div>
                    <div className="text-gray-400 text-xs">
                      {wallet.asset === "Ethereum" ? "0.10000 ETH" : "-"}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">{wallet.type}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-2 py-1 rounded-md text-sm ${
                      wallet.status === "Hot"
                        ? "bg-red-500"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {wallet.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    {wallet.members.map((member, index) => (
                      <div
                        key={index}
                        className="bg-purple-700 text-white w-8 h-8 flex items-center justify-center rounded-full text-xs"
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {wallet.pending !== "-" && (
                    <span className="bg-yellow-500 text-black px-2 py-1 rounded-md">
                      {wallet.pending}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <BsThreeDots className="text-xl text-gray-400 cursor-pointer hover:text-white" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalletsPage;
