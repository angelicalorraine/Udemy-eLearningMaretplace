import { useEffect, useState, useContext } from "react";
import { Context } from "../../../context";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import InstructorNav from "../nav/InstructorNav";
import { Container, Col, Row } from "react-bootstrap";

const InstructorRoute = ({ children }) => {
  const [ok, setOk] = useState(false);

  const router = useRouter();

  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/current-instructor");
      console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/");
    }
  };
  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primart p-5"
        />
      ) : (
        <Container fluid>
          <Row>
            <Col md={2}>
              <InstructorNav />
            </Col>
            <Col md={10}> {children} </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default InstructorRoute;
