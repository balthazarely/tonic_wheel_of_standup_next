import React, { createContext, useState, FC, useEffect } from "react";

type ContextState = {
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

const contextDefaultValues: ContextState = {
  modalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  drawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleDrawer: () => {},
};

export const GlobalContext = createContext<ContextState>(contextDefaultValues);

const SettingsContext: FC = ({ children }: any) => {
  const [modalOpen, setModalOpen] = useState<boolean>(
    contextDefaultValues.modalOpen
  );
  const [drawerOpen, setDrawerOpen] = useState<boolean>(
    contextDefaultValues.drawerOpen
  );
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <GlobalContext.Provider
      value={{
        modalOpen,
        openModal,
        closeModal,
        drawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default SettingsContext;
