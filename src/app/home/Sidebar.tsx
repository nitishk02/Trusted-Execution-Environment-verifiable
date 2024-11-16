import React from "react";
import { FaWallet, FaExchangeAlt, FaShieldAlt, FaHome, FaCog, FaAccusoft } from "react-icons/fa";

interface SidebarProps {
  setActiveComponent: (componentId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
  const menuItems = [
    { id: "home", label: "Home", icon: <FaHome /> },
    { id: "create-multisig", label: "Wallets", icon: <FaWallet /> },
    { id: "transactions", label: "Transactions", icon: <FaExchangeAlt /> },
    { id: "verification", label: "Verification", icon: <FaShieldAlt /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
    { id: "CIRCLECCTP", label: "CIRCLE CCTP", icon: <FaAccusoft /> },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 min-h-screen flex flex-col p-4 shadow-lg">
      {/* Sidebar Header */}
      <div className="text-2xl font-bold mb-10 text-center border-b border-gray-700 pb-4">
        Iron Vault
      </div>
      
      {/* Sidebar Menu */}
      <ul className="space-y-6">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center space-x-4 cursor-pointer p-3 rounded-md transition-all duration-200 hover:bg-gray-700 hover:shadow-md"
            onClick={() => setActiveComponent(item.id)}
          >
            <span className="text-xl text-gray-300">{item.icon}</span>
            <span className="text-md font-medium">{item.label}</span>
          </li>
        ))}
      </ul>

      {/* Bottom Section (Optional) */}
      <div className="mt-auto text-center text-sm text-gray-500">
        © 2024 Iron Vault. All rights reserved.
      </div>
    </div>
  );
};

export default Sidebar;
