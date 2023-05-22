import React from 'react'

const CountBox = ({ title, value }) => {
  return (
    <div className='flex flex-col items-center w-[150px]'>
        <div className='bg-[#e3e3db] dark:bg-[#1c1c24] rounded-t-[10px] w-full text-center'>
            <h4 className='font-epilogue font-bold text-[30px] gradient-text-light dark:gradient-text truncate'>{value}</h4>
        </div>
        <div className='bg-[#d7d7d1] dark:bg-[#28282e] rounded-b-[10px] w-full text-center'>
        <p className='font-epilogue font-normal text-[16px] text-[#7f7e6e] dark:text-[#808191] px-3 py-2 truncate'>{title}</p>
        </div>
    </div>
  )
}

export default CountBox