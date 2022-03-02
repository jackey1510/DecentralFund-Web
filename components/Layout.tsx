import React from "react";
import { Container } from "semantic-ui-react";
import Header from "./Header";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header></Header>
      {children}
    </Container>
  );
};
export default Layout;
