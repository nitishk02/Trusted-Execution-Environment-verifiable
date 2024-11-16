// global.d.ts
import { ExternalProvider } from 'ethers';

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}
