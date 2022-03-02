import React, { Component } from "react";
import { Button, Form, Header, Input, Message } from "semantic-ui-react";
import router from "next/router";
import Layout from "@components/Layout";
import factory from "@web3/factory";
import web3 from "@web3/web3";

interface NewCampaignProps {}

interface NewCampaignState {
  minimumContribution: string;
  error?: string;
  loading: boolean;
}

export default class NewCampaign extends Component<
  NewCampaignProps,
  NewCampaignState
> {
  state: NewCampaignState = {
    minimumContribution: "",
    loading: false,
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ minimumContribution: event.target.value });
  };

  onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    this.setState({ error: undefined, loading: true });
    try {
      const [account] = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(parseInt(this.state.minimumContribution))
        .send({ from: account });
      router.push("/");
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Layout>
        <Header as="h1">New Campaign</Header>
        <Form>
          <Form.Field>
            <label>Minimum Contributions</label>
            <Input
              label="Wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={this.onChange}
            ></Input>
          </Form.Field>
          <Message
            header="Oops!"
            content={this.state.error}
            hidden={!this.state.error}
            negative
          ></Message>
          <Button
            type="submit"
            color="teal"
            onClick={this.onSubmit}
            loading={this.state.loading}
          >
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}
