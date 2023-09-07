import React, { useContext, createContext } from "react";

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x01166C3D30C04c4D8509b6E96B4a6EECD604923a');
    const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign",);

    const address = useAddress();
    const connect = useMetamask();

// Publishing Campaigns Function.

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign({ args: [
                address, // owner
                form.title, // title
                form.description, // description
                form.target,
                new Date(form.deadline).getTime(), // deadline,
                form.image
            ] })
            
            console.log("contract call success", data);
        } catch (error) {
            console.log("contract call failure", error);
        }
      }     

// Fetch Campaigns Function.

const getCampaigns = async () => {
  const campaigns = await contract.call('getCampaigns');

  const parsedCampaigns = campaigns.map((campaign, i) => {
    const {
      owner,
      title,
      description,
      target,
      deadline,
      amountCollected,
      image
    } = campaign;

    return {
      owner,
      title,
      description,
      target: ethers.utils.formatEther(target.toString()),
      deadline: ethers.BigNumber.from(deadline).toNumber(),
      amountCollected: ethers.utils.formatEther(amountCollected.toString()),
      image,
      pId: i
    };
  });
  
  return parsedCampaigns;
}

// Fetching all campaigns belonging to a specific user.

const getUserCampaigns = async () => {
  const allCampaigns = await getCampaigns();

  // Filtering campaigns by address.
  const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

  return filteredCampaigns;
}


// Donation Function.

const donate = async (pId, amount) => {

  const value = ethers.utils.parseEther(''+amount);

  const data = await contract.call('donateToCampaign', ''+pId, { value: ''+value._hex });

  return data;
}

// Fetch all donations function.

const getDonations = async (pId) => {
  const _id = '' + pId

  const donations = await contract.call('getDonors', _id);
  const numberOfDonations = donations[0].length;

  const parsedDonations = [];

  for(let i = 0; i < numberOfDonations; i++) {
    parsedDonations.push({
      donator: donations[0][i],
      donation: ethers.utils.formatEther(donations[1][i].toString())
    })
  }
  return parsedDonations;
}


    
    return (
        <StateContext.Provider
            value={{ 
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
             }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
