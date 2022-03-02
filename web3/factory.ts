import web3 from "./web3";

import CompiledCampaignFactoryContract from "./build/CampaignFactory.json";
import { CampaignFactoryContract } from "./CampaignContract";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

const instance: CampaignFactoryContract = new web3.eth.Contract(
  CompiledCampaignFactoryContract.abi as any,
  contractAddress
);

export default instance;
