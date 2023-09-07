import React, { useState, useEffect } from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();
  
  // for useEffect() Hook (cannot call async contract call immediately inside of useEffect)
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  // Campaigns can be printed once fetched. 
  
  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract])

  return (
    <DisplayCampaigns
      title='All Campaigns'
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home