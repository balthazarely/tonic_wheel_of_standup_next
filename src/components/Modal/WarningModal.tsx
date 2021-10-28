import React, { useState, useEffect } from "react";
import { GlobalContext } from "../../context/SettingsContext";

export const WarningModal = () => {
  const { modalOpen, openModal, closeModal } = React.useContext(GlobalContext);

  return (
    <div className="modal-box">
      <p>You must have at least 2 names selected!</p>
      <div className="modal-action">
        <label htmlFor="my-modal-2" className="btn" onClick={closeModal}>
          Close
        </label>
      </div>
    </div>
  );
};
