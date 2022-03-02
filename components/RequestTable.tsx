import React from "react";
import { Table } from "semantic-ui-react";

interface RequestTableProps {
  rows: JSX.Element[];
}

export const RequestTable: React.FC<RequestTableProps> = ({ rows }) => {
  const { Header, HeaderCell, Row, Body } = Table;

  return (
    <Table>
      <Header>
        <Row key="header">
          <HeaderCell>ID</HeaderCell>
          <HeaderCell>Description</HeaderCell>
          <HeaderCell>Amount</HeaderCell>
          <HeaderCell>Recipient</HeaderCell>
          <HeaderCell>Approval Count</HeaderCell>
          <HeaderCell>Approve</HeaderCell>
          <HeaderCell>Finalize</HeaderCell>
        </Row>
      </Header>
      <Body>
        {rows.map((row, i) => {
          return { ...row, key: i };
        })}
      </Body>
    </Table>
  );
};
export default RequestTable;
