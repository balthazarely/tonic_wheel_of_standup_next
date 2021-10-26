import { useState } from "react";
import type { AppProps } from "next/app";
import "../../styles/globals.scss";
import SettingsContext from "../context/SettingsContext";
import { Layout } from "../components/Layout/Layout";
import { Navbar } from "../components/Navigation/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsContext>
      <Layout>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </SettingsContext>
  );
}
export default MyApp;
