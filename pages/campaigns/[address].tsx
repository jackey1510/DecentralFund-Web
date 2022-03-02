import ContributeForm from "@components/ContributeForm";
import Layout from "@components/Layout";
import Campaign from "@web3/Campaign";
import { utils } from "@web3/web3";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card, CardProps, Grid } from "semantic-ui-react";
interface CampaignSummary {
  minimumContribution: number;
  balance: string;
  requestCount: number;
  approversCount: number;
  manager: string;
}

interface CampaignDetailsProps {
  summary: CampaignSummary;
}

export const CampaignDetails: NextPage<CampaignDetailsProps> = (props) => {
  const router = useRouter();
  const { query } = router;
  const { address } = query;

  const renderCards = () => {
    const {
      manager,
      minimumContribution,
      requestCount,
      approversCount,
      balance,
    } = props.summary;
    const items: CardProps[] = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created the campaign and can create request to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (Wei)",
        description: "You must contribute at least this amount to be approver",
      },
      {
        header: requestCount,
        meta: "Number of Requests",
        description: "Number of requests to withdraw money from the campaign",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description: "Number of people who have contributed to this campaign",
      },
      {
        header: utils.fromWei(balance),
        meta: "Campaign Balance (Ether)",
        description:
          "This balance is how much Ether this campaign has left to spend",
      },
    ];

    return <Card.Group items={items} doubling itemsPerRow={2}></Card.Group>;
  };
  return (
    <Layout>
      <h3>Campaign Details</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={4}>
            <ContributeForm
              address={address as string}
              campaignConstructor={Campaign}
            ></ContributeForm>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
              <Button color="teal">View Requests</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

CampaignDetails.getInitialProps = async (props) => {
  const campaign = Campaign(props.query.address as string);
  const summary = await campaign.methods.getSummary().call();
  const transformed: CampaignSummary = {
    minimumContribution: summary[0],
    balance: summary[1].toString(),
    requestCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
  return {
    summary: transformed,
  };
};
export default CampaignDetails;
