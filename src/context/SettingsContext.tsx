import React, { createContext, useState, FC, useEffect } from "react";

type ContextState = {
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const contextDefaultValues: ContextState = {
  modalOpen: false,
  openModal: () => {},
  closeModal: () => {},
};

export const GlobalContext = createContext<ContextState>(contextDefaultValues);

const SettingsContext: FC = ({ children }: any) => {
  const [modalOpen, setModalOpen] = useState<boolean>(
    contextDefaultValues.modalOpen
  );

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  console.log("context");

  return (
    <GlobalContext.Provider
      value={{
        modalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default SettingsContext;
