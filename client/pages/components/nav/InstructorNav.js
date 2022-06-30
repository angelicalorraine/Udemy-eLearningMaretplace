import Link from "next/link";
import { Nav } from "react-bootstrap";
import { useState, useEffect } from "react";

const InstructorNav = () => {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    console.log(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  return (
    <Nav
      fill
      variant="pills"
      className="flex-column"
    // defaultActiveKey="/instructor"
    // selectedKeys={[current]}
    // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item key="/instructor"
        onClick={(e) => setCurrent(e.key)} >
        <Nav.Link className={`nav-link ${current === "/instructor" && "active"}`} href="/instructor">Dashboard</Nav.Link>
      </Nav.Item>
      <Nav.Item key="/instructor/course/create"
        onClick={(e) => setCurrent(e.key)}>
        <Nav.Link href="/instructor/course/create" className={`nav-link ${current === "/instructor/course/create" && "active"}`}>Course Create</Nav.Link>
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

export default InstructorNav;
