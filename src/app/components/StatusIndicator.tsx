import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import RPC from "../ethersRPC";

import { ConnectButton } from '@rainbow-me/rainbowkit';

const StatusIndicator = ({ status }: { status: boolean }) => {
  //@ts-ignore
  const { provider } = useContext(UserContext);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      if (provider) {
        const accounts = await RPC.getAccounts(provider);
        console.log(accounts);
        setAddress(accounts);
      }
    };
    fetchAddress();
  }, [provider]);

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
      <div className="flex items-center">
        <span
          className={`h-3 w-3 rounded-full mr-2 ${
            status ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <p className="text-sm font-medium text-gray-700">
          {status ? "Frontend Verified" : "Verification Failed"}
        </p>
      </div>
      <p className="text-sm text-gray-500">
        {provider ? address : "No provider"}
      </p>
     
    </div>
  );
};

export default StatusIndicator;
