import React from 'react';

import { tagType, thirdweb } from '../assets';
import { daysLeft, percentRaised } from '../utils';


const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
    const remainingDays = daysLeft(deadline);
    const percentageRaised = percentRaised(amountCollected, target);
  
    return (
        <div className='sm:w-[288px] w-full rounded-[15px] bg-[#e3e3db] dark:bg-[#1c1c24] cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300' onClick={handleClick}>
            <img src={image} alt='campaign-thumbnail' className='w-full h-[158px] object-cover rounded-[15px]'/>

            <div className='flex flex-col p-4'>
                <div className='flex flex-row items-center mb-[18px]'>
                    <img src={tagType} alt='tag' className='w-[17px] h-[17px] object-contain' />
                    <p className='ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#7f7e6e] dark:text-[#808191]'>Fundraiser</p>
                </div>

                <div className='block'>
                    <h3 className='font-epilogue font-semibold text-[16px] text-[#13131a] dark:text-white text-left leading-[26px] truncate'>{title}</h3>
                    <p className='mt-[5px] font-epilogue font-normal text-[12px] text-[#7f7e6e] dark:text-[#808191] text-left leading-[18px] truncate'>{description}</p>
                </div>

                <div className='flex flex-wrap justify-between mt-[15px] gap-2'>
                    <div className='flex flex-col justify-center'>
                        <div className='flex flex-row justify-center'>
                            <h4 className='font-epilogue font-extrabold text-[22px] gradient-text-light dark:gradient-text leading-[22px] pr-2'>{percentageRaised}% </h4>
                            <h4 className='font-epilogue font-semibold text-[22px] text-[#4d4c42] dark:text-[#b2b3bd] leading-[22px]'> Funded</h4>
                        </div>
                        <p className='mt-[3px] font-epilogue font-normal text-[14px] leading-[18px] text-[#7f7e6e] dark:text-[#808191] sm:max-w-[120px] truncate'>{amountCollected} ETH of {target} ETH</p>
                    </div>
                    <div className='flex flex-col justify-center'>
                            <h4 className='font-epilogue font-extrabold text-[22px] gradient-text-light dark:gradient-text leading-[22px] pr-2 text-center'>{remainingDays}</h4>
                        <p className='mt-[3px] font-epilogue font-normal text-[14px] leading-[18px] text-[#7f7e6e] dark:text-[#808191] text-center sm:max-w-[120px] truncate'>Days Left</p>
                    </div>
                </div>

                <div className='flex items-center mt-[20px] gap-3'>
                   <div className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#ecece5] dark:bg-[#13131a]'>
                    <img src={thirdweb} alt='user' className='w-1/2 h-1/2 object-contain'/>
                   </div>
                   <p className='flex-1 font-epilogue text-[12px] text-[#7f7e6e] dark:text-[#808191] truncate'>by <span className='text-[#4d4c42] dark:text-[#b2b3bd]'>{owner}</span></p>
                </div>
            </div>
        </div>
  )
}

export default FundCard