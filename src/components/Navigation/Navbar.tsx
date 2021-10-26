import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { HiOutlineCog, HiOutlineShare } from "react-icons/hi";
import { Modal } from "../Modal/Modal";
import { GlobalContext } from "../../context/SettingsContext";

export const Navbar = () => {
  const { modalOpen, openModal } = React.useContext(GlobalContext);

  return (
    <div className="w-100 h-20  dark:bg-tonic-light bg-tonic-grey transition-all duration-200 ">
      <div className="container mx-auto flex justify-between px-4 ">
        <div className="logo text-black w-24 pt-5 cursor-pointer">
          <Link href="/">
            <div>
              <img src="/tonic-logo.png" alt="tonic__logo" />
            </div>
          </Link>
        </div>
        <div className="flex gap-2 mb-1 items-center text-tonic-base">
          <Link href="/">
            <div>
              <div className="text-tonic-base hover:text-tonic-baseLight text-xl font-bold cursor-pointer">
                Spinner
              </div>
            </div>
          </Link>
          <Link href="/lineup">
            <div>
              <div className="text-tonic-base hover:text-tonic-baseLight text-xl font-bold cursor-pointer">
                Lineup
              </div>
            </div>
          </Link>
          <HiOutlineShare className="text-tonic-base  hover:text-tonic-baseLight  text-3xl cursor-pointer " />
          <HiOutlineCog
            className="text-tonic-base  hover:text-tonic-baseLight  text-3xl cursor-pointer"
            onClick={openModal}
          />
          <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
            {modalOpen && <Modal />}
          </div>
        </div>
      </div>
    </div>
  );
};
