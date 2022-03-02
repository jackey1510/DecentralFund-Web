import Link from "next/link";
import { Component } from "react";
import { Button, Card, Header } from "semantic-ui-react";
import Layout from "@components/Layout";
import factory from "@web3/factory";

interface IndexProps {
  campaigns: string[];
}

interface Item {
  fluid: boolean;
  header: string;
  description: JSX.Element;
}

export default class Index extends Component<IndexProps> {
  render() {
    return (
      <Layout>
        <Header as="h3">Open Campaigns</Header>

        <Link href="/campaigns/new">
          <Button
            content="Create Campaign"
            icon="add circle"
            color="teal"
            floated="right"
          ></Button>
        </Link>
        {this.renderCampaigns()}
      </Layout>
    );
  }

  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {
      campaigns,
    };
  }

  renderCampaigns() {
    const items: Item[] = this.props.campaigns.map((address) => {
      return {
        header: address,
        fluid: true,
        description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
      };
    });
    return <Card.Group items={items} centered></Card.Group>;
  }
}
