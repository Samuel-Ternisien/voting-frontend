'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { abi, contractAddress } from '@/constants';

import { useAccount } from 'wagmi';
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core';

import { useState } from 'react';

const Home = () => {
  const [voterAddress, setVoterAddress] = useState(''); // State to store the entered address
  const { address, isConnected } = useAccount();


  // Function to change the number on the smart contract
  const registerVoter = async () => {
    try {
      const tx = await prepareWriteContract({
        address: contractAddress,
        abi,
        functionName: 'registerVoter', // Replace with actual function name
        args: [voterAddress], // Provide the number from user input
      });

      await writeContract(tx);
      console.log('Voter added successfully!');
      // Update UI to reflect the change (optional)
    } catch (error) {
      console.error('Error changing number:', error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };

  return (
    <>
      <ConnectButton />
      {isConnected ? (
        <div>
          <p>
            <input
              type="text" // Adjust type if needed (e.g., "eth" for Ethereum addresses)
              placeholder="Enter Voter Address"
              value={voterAddress}
              onChange={(e) => setVoterAddress(e.target.value)}
            />
          </p>
          <p>
            <button onClick={registerVoter} disabled={!voterAddress}>
              Register Voter
            </button>
          </p>
        </div>
      ) : (
        <p>Please connect your Wallet to our DApp.</p>
      )}
    </>
  );
};

export default Home;
