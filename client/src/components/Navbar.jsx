import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CustomButton } from "./";
import { sun, logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";
import useColorMode from '../hooks/useColorMode';

import { useStateContext } from "../context";


const SunIcon = ({ styles, imgUrl, colorMode, disabled, handleClick }) => (
  <div className={`w-[40px] h-[40px] rounded-[10px] ${colorMode === 'dark' ? 'bg-[#d3d0cd] dark:bg-[#2c2f32]' : ''} flex justify-center items-center ${!disabled ? 'cursor-pointer' : ''} ${styles}`} onClick={handleClick}>
    <img src={imgUrl} alt='fund_logo' className='w-1/2 h-1/2 grayscale dark:grayscale-0' />
  </div>
);

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [colorMode, setColorMode] = useColorMode();
  const { connect, address } = useStateContext();

return (
  <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
    <div className="flex lg:flex-1 flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#e3e3db] dark:bg-[#1c1c24] rounded-[100px]">
      <input type="text" placeholder="Search..." className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-black dark:text-white bg-transparent outline-none"/>
      
      <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] hue-rotate-55 dark:hue-rotate-0 flex justify-center items-center cursor-pointer">
        <img src={search} alt='search' className="w-[15px] h-[15px] object-contain"/>
      </div>
    </div>

    <div className="sm:flex hidden flex-row justify-end gap-8 ">
      <CustomButton 
        btnType='button'
        title={address ? 'Create Campaign' : 'Connect Wallet'}
        styles={address? 'bg-[#25C071] hue-rotate-55 dark:hue-rotate-0' : 'bg-[#8c6dfd] hue-rotate-310 dark:hue-rotate-0'}
        handleClick={() => {
          if(address) {
            setIsActive('create-campaign')
            navigate('create-campaign') 
            setToggleDrawer(false)
            }
            else connect()
        }}
      />

      <Link to='/profile'>
        <div className="w-[52px] h-[52px] rounded-full bg-[#d3d0cd] dark:bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
        </div>
      </Link>
    </div>

    {/* Small device navigation */}

      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#d3d0cd] dark:bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain"/>
        </div>
        <div className="flex flex-row items-center gap-10">
          <SunIcon styles="shadow-secondary" 
            imgUrl={sun} 
            handleClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}/>
          <img
            src={menu}
            alt='menu'
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
          />
        </div>
        <div className={`absolute top-[60px] right-0 left-0 bg-[#e3e3db] dark:bg-[#1c1c24] z-10 shadow-secondary py-4 rounded-[40px] ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 rounded-[20px] ${isActive === link.name && 'bg-[#c5c5bc] dark:bg-[#3a3a43]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={` w-[24px] h-[24px] object-contain hue-rotate-55 dark:hue-rotate-0 ${isActive === link.name ? "grayscale-0" : "grayscale"}`}
                />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] capitalize ${isActive === link.name ? 'text-[#1dc071] hue-rotate-55 dark:hue-rotate-0' : 'text-[#808191]'}`}>{link.name}</p>
              </li>
            ))}
          </ul>

          <div className="flex ml-4 justify-center items-center">
          <CustomButton 
            btnType='button'
            title={address ? 'Create Campaign' : 'Connect Wallet'}
            styles={address? 'bg-[#25C071] hue-rotate-55 dark:hue-rotate-0' : 'bg-[#8c6dfd] hue-rotate-310 dark:hue-rotate-0'}
            handleClick={() => {
              if(address) {
              setIsActive('create-campaign')
              navigate('create-campaign') 
              setToggleDrawer(false)
              }
              else connect();
            }}
          />
          </div>
        </div>

      </div>

  </div>
  );
};

export default Navbar;
