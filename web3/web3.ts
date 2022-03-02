import Web3 from "web3";

const providerUrl = process.env.NEXT_PUBLIC_WEB3_PROVIDER_URL!;

const setWeb3 = () => {
  if (typeof window != "undefined" && window?.ethereum) {
    // We are in the browser and metamask is running.
    window.ethereum.request({ method: "eth_requestAccounts" });
    return new Web3(window.ethereum);
  }
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(providerUrl);
  return new Web3(provider);
};

const web3 = setWeb3();

export const { utils, eth } = web3;

export default web3;
