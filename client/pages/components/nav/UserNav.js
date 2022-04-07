import Link from "next/link";
import { Nav } from "react-bootstrap";

const UserNav = () => {
  return (
    <Nav
      variant="pills"
      activeKey="/user"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link href="/user">Dashboard</Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item> */}
    </Nav>
  );
};

export default UserNav;
