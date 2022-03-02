import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "@components/Layout";
import Link from "next/link";
import Campaign from "@web3/Campaign";
import { utils, eth } from "@web3/web3";

interface NewRequestProps {}

export const NewRequest: React.FC<NewRequestProps> = ({}) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const address: string = router.query.address as string;

  const onSubmit = async () => {
    const campaign = Campaign(address);
    setLoading(true);
    setErrorMessage("");
    try {
      const [account] = await eth.getAccounts();
      const weiValue = utils.toWei(value);
      await campaign.methods
        .createRequest(description, weiValue, recipient)
        .send({ from: account });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>{"Back"}</Link>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></Input>
        </Form.Field>
        <Form.Field>
          <label>Value(Ether)</label>
          <Input
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          ></Input>
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => {
              setRecipient(event.target.value);
            }}
          ></Input>
        </Form.Field>
        <Button color="teal" loading={loading}>
          Create
        </Button>
        <Message error header="Oops!" content={errorMessage}></Message>
      </Form>
    </Layout>
  );
};
export default NewRequest;
