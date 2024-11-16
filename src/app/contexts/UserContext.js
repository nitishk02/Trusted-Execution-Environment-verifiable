"use client"
import React, { createContext, useState, useEffect } from 'react';
import { web3auth } from '../login/page';
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        await web3auth.initModal();
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);

        const userInfo = await web3auth.getUserInfo();
        const address = await web3authProvider.request({ method: 'eth_accounts' });

        await checkAndAddUser(userInfo, address[0]);
        setUser({ ...userInfo, address: address[0] });
      } catch (error) {
        console.error('Error during user initialization:', error);
      }
    };

    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, provider }}>
      {children}
    </UserContext.Provider>
  );
};
