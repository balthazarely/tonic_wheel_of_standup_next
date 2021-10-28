import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { HiOutlineCog, HiOutlineShare, HiMenu } from "react-icons/hi";
import { Modal } from "../Modal/Modal";
import { GlobalContext } from "../../context/SettingsContext";

export const Navbar = () => {
  const { modalOpen, openModal, toggleDrawer } =
    React.useContext(GlobalContext);

  return (
    <div className="w-100 md:h-20 h-16  dark:bg-tonic-light bg-tonic-grey transition-all duration-200 ">
      <div className="container mx-auto flex justify-between px-4 ">
        <div className="logo text-black md:w-20 w-12 flex md:block items-center md:pt-5 pt-0 cursor-pointer">
          <Link href="/">
            <div>
              <img src="/tonic-logo.png" alt="tonic__logo" />
            </div>
          </Link>
        </div>
        <div className="flex md:hidden  h-16 items-center">
          <HiMenu
            onClick={toggleDrawer}
            className="text-tonic-base  hover:text-tonic-baseLight  text-3xl cursor-pointer"
          />
        </div>
        <div className="md:flex hidden gap-3 mb-1 items-center text-tonic-base ">
          <Link href="/">
            <div>
              <div className="text-tonic-base hover:text-tonic-baseLight text-lg font-bold cursor-pointer">
                Spinner
              </div>
            </div>
          </Link>
          <Link href="/lineup">
            <div>
              <div className="text-tonic-base hover:text-tonic-baseLight text-lg font-bold cursor-pointer">
                Lineup
              </div>
            </div>
          </Link>
          <HiOutlineShare className="text-tonic-base  hover:text-tonic-baseLight  text-3xl cursor-pointer " />
          <HiOutlineCog
            className="text-tonic-base  hover:text-tonic-baseLight  text-3xl cursor-pointer"
            onClick={openModal}
          />

          {/* <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
            {modalOpen && <Modal />}
          </div> */}
        </div>
      </div>
    </div>
  );
};
