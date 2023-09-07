import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, TransactionLoader } from '../components';
import { checkIfImage } from '../utils';


// Create a Campaign Function.

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  // Dynamic Form field using React States.

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

// Handles submitting function. If image has not been submitted, alert thrown and form is not submitted.

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }


  return (
    <div>
      {isLoading && (
                  <TransactionLoader />
                )}  
      <div className='bg-[#e3e3db] dark:bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
        <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#c5c5bc] dark:bg-[#3a3a43] rounded-[10px]'>
          <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-[#13131a] dark:text-white'>Start a Campaign 🚀</h1>
        </div>

        <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
          <div className='flex flex-wrap gap-[40px]'>
            <FormField
              labelName="Your Name*"
              placeholder="John Doe"
              inputType="text"
              value={form.name}
              handleChange={(e) => handleFormFieldChange('name', e)}
            />
            <FormField
              labelName="Campaign Title*"
              placeholder="Enter a Title..."
              inputType="text"
              value={form.title}
              handleChange={(e) => handleFormFieldChange('title', e)}
            />
          </div>
          <FormField
              labelName="Story*"
              placeholder="What is Your Story?"
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange('description', e)}
            />
          
          <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] hue-rotate-310 dark:hue-rotate-0 h-[120px] rounded-[10px]'>
            <img
              src={money} alt='money' className='w-[40px] h-[40px] object-contain'
            />
            <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'>You will recieve 100% of the raised amount</h4>
          </div>
          
          <div className='flex flex-wrap gap-[40px]'>
            <FormField
              labelName="Goal*"
              placeholder="0.5 ETH"
              inputType="text"
              value={form.target}
              handleChange={(e) => handleFormFieldChange('target', e)}
            />
            <FormField
              labelName="End Date*"
              placeholder="Deadline"
              inputType="date"
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange('deadline', e)}
            />
          </div>
          <FormField
              labelName="Campaign Thumbnail*"
              placeholder="Paste image URL..."
              inputType="text"
              value={form.image}
              handleChange={(e) => handleFormFieldChange('image', e)}
            />
          <div className='flex justify-center items-center mt-[40px] '>
              <CustomButton
                btnType="submit"
                title="Submit Your Campaign!"
                styles="bg-[#25C071] hue-rotate-55 dark:hue-rotate-0 pr-2"
              />
            </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCampaign