"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import CreateMultisig from "./CreateMultisig";
import Transactions from "./Transactions";
import Verification from "./Verification";
import StatusIndicator from "../components/StatusIndicator";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeComponent, setActiveComponent] = useState("create-multisig"); // Default active component
  const router = useRouter();

  useEffect(() => {
    // Simulate authentication check (replace with real logic)
    const checkAuth = async () => {
      const userLoggedIn = !!localStorage.getItem("auth_store"); // Replace with actual logic
      if (!userLoggedIn) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setIsLoggedIn(true);
      }
    };

    checkAuth();
  }, [router]);

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Render the active component dynamically
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "create-multisig":
        return <CreateMultisig />;
      case "transactions":
        return <Transactions />;
        case "verification":
          router.push("/verify");
          case "CIRCLECCTP":
            router.push("/cctp");
      default:
        return <CreateMultisig />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar setActiveComponent={setActiveComponent} />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Top Section: Status and Greeting */}
        <div className="bg-gray-900  p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">👋 Hello, User!</h1>
            <p className="text-gray-300 mt-1">Here’s what’s happening in your account</p>
          </div>
          <div className="w-64 flex">
          <ConnectButton  accountStatus="avatar"  />
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-500 transition">
              Receive
            </div>
            <div className="bg-green-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-500 transition">
              Send
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <main className="flex-grow p-6 bg-gray-900 rounded-lg mx-6 my-4">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
}
