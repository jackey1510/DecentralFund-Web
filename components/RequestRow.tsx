import { utils, eth } from "@web3/web3";
import Router from "next/router";
import React, { useState } from "react";
import { Button, Table } from "semantic-ui-react";
import { CampaignContract, Request } from "@web3/CampaignContract";

interface RequestRowProps {
  request: Request;
  index: number;
  approversCount: number;
  campaign: CampaignContract;
}

export const RequestRow: React.FC<RequestRowProps> = ({
  request,
  index,
  approversCount,
  campaign,
}) => {
  const { Row, Cell } = Table;

  const [state, setState] = useState({
    approving: false,
    errorMessage: "",
    finalizing: false,
  });

  const onApprove = async () => {
    setState({ ...state, approving: true, errorMessage: "" });
    try {
      const [account] = await eth.getAccounts();
      await campaign.methods.approveRequest(index).send({ from: account });
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      throw error;
    }
    setState({ ...state, approving: false });
    Router.replace(Router.asPath);
  };
  const onFinalize = async () => {
    setState({ ...state, finalizing: true, errorMessage: "" });
    try {
      const [account] = await eth.getAccounts();
      await campaign.methods.finalizeRequest(index).send({ from: account });
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      throw error;
    }
    setState({ ...state, finalizing: false });
    Router.replace(Router.asPath);
  };
  const {
    description,
    approvalCount,
    complete,
    recipient,
    valueInWei,
  } = request;

  const readyToFinalize =
    Number(approvalCount) >= Number(approversCount) / 2 && !complete;

  return (
    <Row key={index} disabled={complete} positive={readyToFinalize}>
      <Cell>{index}</Cell>
      <Cell>{description}</Cell>
      <Cell>{utils.fromWei(valueInWei)}</Cell>
      <Cell>{recipient}</Cell>
      <Cell> {`${approvalCount}/${approversCount}`}</Cell>
      <Cell>
        {complete ? null : (
          <Button
            color="green"
            basic
            onClick={onApprove}
            loading={state.approving}
          >
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {complete ? null : (
          <Button
            color="blue"
            basic
            onClick={onFinalize}
            loading={state.finalizing}
          >
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};
export default RequestRow;
