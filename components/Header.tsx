import Link from "next/link";
import React from "react";
import { Icon, Menu } from "semantic-ui-react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Menu style={{ marginTop: "1rem" }}>
      <Link href="/">
        <Menu.Item name="DecentralFund">DecentralFund</Menu.Item>
      </Link>
      <Menu.Menu position="right">
        <Link href="/">
          <Menu.Item name="Campaigns">Campaigns</Menu.Item>
        </Link>
        <Link href="/campaigns/new">
          <Menu.Item>
            <Icon name="add circle" color="teal"></Icon>
          </Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
export default Header;
