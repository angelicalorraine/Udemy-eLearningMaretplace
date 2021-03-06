import Link from "next/link";
import { Nav } from "react-bootstrap";
import { useState, useEffect } from "react";

const UserNav = () => {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    console.log(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <Nav
      fill
      variant="pills"
    >
      <Nav.Item key="/instructor"
        onClick={(e) => setCurrent(e.key)} >
        <Nav.Link className={`nav-link ${current === "/user" && "active"}`} href="/user">Dashboard</Nav.Link>
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
