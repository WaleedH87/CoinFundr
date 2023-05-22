import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FundCard, Loader } from '../components';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
    const navigate = useNavigate();

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    }

    return (
        <div>
            <h1 className='font-epilogue font-semibold text-[24px] text-[#13131a] dark:text-white text-left'>{title} ({campaigns.length})</h1>

            <div className='flex flex-wrap mt-[20px] gap-[26px]'>
                {isLoading && (
                    <Loader />
                )}

                {!isLoading && campaigns.length === 0 && (
                    <p className='font-epilogue font-semibold text-[18px] leading-[30px] text-[#7e7e7c] dark:text-[#818183] animate-bounce-slow'>
                        Oops... No campaigns to be found 😞
                    </p>
                )}

                {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => 
                <FundCard
                    key={campaign.id}
                    {...campaign}
                    handleClick={() => handleNavigate(campaign)}
                />)}
            </div>
        </div>
    )
    }

export default DisplayCampaigns