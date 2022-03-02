import Layout from "@components/Layout";
import RequestRow from "@components/RequestRow";
import RequestTable from "@components/RequestTable";
import Campaign from "@web3/Campaign";
import { CampaignContract, Request } from "@web3/CampaignContract";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";

interface RequestPageProps {
  requests: Request[];
  approversCount: number;
  campaign: CampaignContract;
}

export const RequestPage: NextPage<RequestPageProps> = ({
  requests,
  approversCount,
}) => {
  const router = useRouter();
  const address: string = router.query.address as string;
  const campaign = Campaign(address);

  const rows = requests.map((request, index) => {
    return (
      <RequestRow
        key={index}
        request={request}
        index={index}
        approversCount={approversCount}
        campaign={campaign}
      ></RequestRow>
    );
  });

  const renderTable = () => {
    return <RequestTable rows={rows}></RequestTable>;
  };

  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <Button color="teal" floated="right" style={{ marginBottom: 10 }}>
          Add Request
        </Button>
      </Link>
      {renderTable()}
    </Layout>
  );
};

RequestPage.getInitialProps = async (props) => {
  const { address } = props.query;
  const campaign = Campaign(address as string);

  const [requestCount, approversCount] = await Promise.all([
    campaign.methods.getRequestCount().call(),
    campaign.methods.approversCount().call(),
  ]);
  let promise: Promise<Request>[] = [];
  for (let i = 0; i < requestCount; i++) {
    promise.push(campaign.methods.requests(i).call());
  }
  const requests = await Promise.all(promise);

  return { requests, approversCount, campaign };
};

export default RequestPage;
