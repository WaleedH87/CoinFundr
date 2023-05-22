import React from 'react'

import { loader } from '../assets'

const TransactionLoader = () => {
  return (
    <div className='fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center flex-col'>
         <img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain hue-rotate-55 dark:hue-rotate-0 animate-spin-slow' />
         <p className='mt-[20px] font-epilogue font-bold text-center text-white'>Transaction in process...<br/> Please Wait</p>
    </div>
  )
}

export default TransactionLoader