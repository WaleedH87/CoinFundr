import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CustomButton, CountBox, TransactionLoader } from '../components';
import { calculateBarPercentage, percentRaised, daysLeft } from '../utils';
import { thirdweb, down } from '../assets';

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donors, setDonors] = useState([]);

  const remainingDays = daysLeft(state.deadline);
  const percentage = percentRaised(state.amountCollected, state.target); 


// Fetches all donors to the campaign and returns names/addresses as a list.

  const fetchDonors = async () => {
    const data = await getDonations(state.pId);

    setDonors(data);
  }

  useEffect(() => {
    if(contract) fetchDonors();
  }, [contract, address])

// Handle function for donation button's handleClick().

  const handleDonate = async () => {
    setIsLoading(true);
    
    await donate(state.pId, amount);

    navigate('/');

    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && (
                  <TransactionLoader />
                )}  
      <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='flex-1 flex-col'>
          <img src={state.image} alt='campaign-thumbnail' className='w-full h-[410px] object-cover rounded-xl' />
          <div className='relative w-full h-[5px] bg-[#c5c5bc] dark:bg-[#3a3a43] mt-2'>
            <div 
              className='absolute h-full gradient-bar-light dark:gradient-bar hue-rotate-55 dark:hue-rotate-0'
              style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%` , maxWidth: '100%' }}
            />
          </div>
        </div>

        <div className='flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]'>
          <CountBox title={`${state.amountCollected} of ${state.target} ETH`} value={percentage} />
          <CountBox title='Days Left' value={remainingDays} />
          <CountBox title='Total Backers' value={donors.length} />
        </div>
      </div>

      <div className='mt-[60px] flex lg:flex-row flex-col gap-5'>
        <div className='flex flex-[2] flex-col gap-[40px]'>
          <div className='flex justify-center items-center'>
            <h1 className='font-epilogue font-bold text-[30px] text-[#13131a] dark:text-white'>{state.title}</h1>
          </div>
          <div>
            <h4 className='font-epilogue font-semibold text-[18px] text-[#13131a] dark:text-white uppercase'>Creator</h4>
            <div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
              <div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#d3d0cd] dark:bg-[#2c2f32] cursor-pointer'>
                <img src={thirdweb} alt='user' className='w-[60%] h-[60%] object-contain'/>
              </div>
              <div>
                <h4 className='font-epilogue font-semibold text-[14px] text-[#13131a] dark:text-white break-all'>{state.owner}</h4>
                <p className='mt-[4px] font-epilogue font-normal text-[12px] text-[#7f7e6e] dark:text-[#808191]'>2 Campaigns</p>
              </div>
          </div>

          <div className='mt-[40px]'>
            <h4 className='font-epilogue font-semibold text-[18px] text-[#13131a] dark:text-white uppercase'>Story</h4>

            <div className='mt-[20px]'>
            <p className='font-epilogue font-normal text-[16px] leading-[26px] text-[#7f7e6e] dark:text-[#808191] text-justify'>{state.description}</p>
            </div>
          </div>

          <div className='mt-[40px]'>
            <h4 className='font-epilogue font-semibold text-[18px] text-[#13131a] dark:text-white uppercase'>Donors</h4>

            <div className='mt-[20px] flex flex-col gap-4'>
              {donors.length > 0 ? donors.map((donor, index) => (
                <div
                  key={`${donor.donator}-${index}`}
                  className='flex justify-between items-center gap-4'
                >
                  <p className='font-epilogue font-normal text-[16px] text-[#4d4c42] dark:text-[#b2b3bd] leading-[26px] break-all'>{index + 1}. {donor.donator}</p>
                  <p className='font-epilogue font-normal text-[16px] text-[#4d4c42] dark:text-[#b2b3bd] leading-[26px] break-all'>{donor.donation} ETH</p>
                </div>
              )) : (
                <div className='flex flex-col justify-center items-center'>
                  <p className='font-epilogue font-normal text-[16px] leading-[26px] text-[#7f7e6e] dark:text-[#808191] text-justify'>Nobody has donated to this campaign yet 😞. Be the first by donating below!</p>
                    <div className='w-[50px] h-[50px] mt-6'>
                    <img src={down} alt='down' className='w-full h-full object-contain animate-bounce-slow' />
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='flex-1' id='donate'>
          <h4 className='font-epilogue font-semibold text-[18px] text-[#13131a] dark:text-white uppercase'>Donate</h4>
          
          <div className='mt-[20px] flex flex-col p-4 bg-[#e3e3db] dark:bg-[#1c1c24] rounded-[10px]'>
            <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#7f7e6e] dark:text-[#808191]'>Fund This Campaign</p>
            <div className='mt-[30px]'>
                <input
                  type='number'
                  placeholder='0.1 ETH'
                  step='0.01'
                  className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#c5c5bc] dark:border-[#3a3a43] bg-transparent rounded-[10px] font-epilogue text-[#13131a] dark:text-white text-[18px] leading-[30px] placeholder:text-[#b4ad9b] placeholder:dark:text-[#4b5264]'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <div className='my-[20px] p-4 bg-[#ecece5] dark:bg-[#13131a] rounded-[10px]'>
                  <h4 className='font-epilogue font-semibold text-[14px] leading-[22px] text-[#13131a] dark:text-white text-center'>Be a Changemaker 🙏</h4>
                  <p className='mt-[20px] font-epilogue font-normal leading-[22px] text-[#7f7e6e] dark:text-[#808191] text-center'>Pledge without reward. Pledge beacause it speaks to you.</p>
                </div>  

                <div className='flex flex-center justify-center items-center'>             
                  <CustomButton
                    btnType="button"
                    title='Fund'
                    styles="w-[100px] h-[50px] bg-[#8c6dfd] hue-rotate-310 dark:hue-rotate-0"
                    handleClick={handleDonate}
                  />
                </div> 

            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails