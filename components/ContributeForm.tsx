import Router from "next/router";
import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import { CampaignContract } from "@web3/CampaignContract";
import { utils, eth } from "@web3/web3";

interface ContributeFormProps {
  address: string;
  campaignConstructor: (address: string) => CampaignContract;
}
interface ContributeFormState {
  value: string;
  loading: boolean;
  errorMessage?: string;
}

export default class ContributeForm extends Component<
  ContributeFormProps,
  ContributeFormState
> {
  state: ContributeFormState = {
    value: "",
    loading: false,
  };

  private refresh = () => {
    Router.replace(Router.asPath);
  };

  private onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let { campaignConstructor, address } = this.props;
    const campaign = campaignConstructor(address);
    this.setState({ loading: true, errorMessage: "" });
    try {
      const [account] = await eth.getAccounts();
      await campaign.methods
        .contribute()
        .send({ from: account, value: utils.toWei(this.state.value) });
      this.refresh();
    } catch (error) {
      this.setState({ errorMessage: error.message });
    } finally {
      this.setState({ loading: false, value: "" });
    }
  };

  renderForm = () => {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            onChange={(event) => {
              this.setState({ value: event.target.value });
            }}
          ></Input>
        </Form.Field>
        <Button color="teal" type="submit" loading={this.state.loading}>
          Contribute
        </Button>
        <Message
          error
          header="Oops!"
          content={this.state.errorMessage}
        ></Message>
      </Form>
    );
  };

  render() {
    return this.renderForm();
  }
}
