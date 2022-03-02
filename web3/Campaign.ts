import CompiledCampaignContract from "./build/Campaign.json";
import { CampaignContract } from "./CampaignContract";
import web3 from "./web3";

export default (address: string): CampaignContract => {
  return new web3.eth.Contract(CompiledCampaignContract.abi as any, address);
};
