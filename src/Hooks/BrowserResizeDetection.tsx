import React, { useEffect } from "react";
import { useResizeDetector } from "react-resize-detector";
import { GlobalContext } from "../context/SettingsContext";

const BrowserResizeDetection = () => {
  const { width, ref } = useResizeDetector();
  const { closeDrawer } = React.useContext(GlobalContext);

  useEffect(() => {
    closeDrawer();
  }, [width]);

  return <div ref={ref}></div>;
};

export default BrowserResizeDetection;
