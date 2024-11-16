import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Iron Vault",
  projectId: "dac39de2bbbfffa8c234e9dc30154173",
  chains: [
    sepolia,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
    //   ? [sepolia]
    //   : [mainnet]),
  ],
  ssr: true,
});

