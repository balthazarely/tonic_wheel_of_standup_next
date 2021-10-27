import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineCog, HiOutlineShare } from "react-icons/hi";
import { Modal } from "../Modal/Modal";
import { GlobalContext } from "../../context/SettingsContext";

export const Drawer = () => {
  const { drawerOpen, toggleDrawer } = React.useContext(GlobalContext);

  return (
    <div
      className={`drawer-side h-screen fixed top-0 left-0  transform transition duration-200 z-50 ${
        drawerOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <div
        className={`menu p-4 overflow-y-auto w-80  text-base-content h-screen bg-base-100`}
      >
        <Link href="/">
          <div className="w-20 mb-10">
            <img src="/tonic-logo.png" alt="tonic__logo" />
          </div>
        </Link>
        <Link href="/">
          <div
            onClick={toggleDrawer}
            className="text-xl  cursor-pointer py-3 px-2 rounded-xl hover:bg-tonic-base "
          >
            Spinner
          </div>
        </Link>

        <Link href="/lineup">
          <div
            onClick={toggleDrawer}
            className="text-xl  cursor-pointer py-3 px-2 rounded-xl hover:bg-tonic-base"
          >
            Lineup
          </div>
        </Link>
      </div>
    </div>
  );
};
