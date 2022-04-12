import axios from "axios";
import { useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Context } from "../../context";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { Button } from "antd";
import UserRoute from "../components/routes/UserRoute";

const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = () => {
    // console.log("BecomeInstructor");
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast("Stripe onboarding Failed. Try Again");
        setLoading(false);
      });
  };
  return (
    <>
      <Container fluid>
        <h1 className="jumbotron text-center py-5">Become Instructor </h1>
      </Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          <div className="pt-4">
            <UserSwitchOutlined className="display-1 pb-3" />
            <br />
            <h2> Setup payout to publish courses on Udemy</h2>
            <p className="lead text-warning">
              Udemy partners with stripe to transfer
            </p>
            <Button
              className="mb-3"
              type="primary"
              block
              shape="round"
              icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
              size="large"
              onClick={becomeInstructor}
              disable={
                (user && user.role && user.role.includes("Instructor")) ||
                loading
              }
            >
              {loading ? "Processing..." : "Payout Setup"}
            </Button>
            <p className="lead">
              You will be redirected to stripe to complete onboarding process
            </p>
          </div>
        </Col>
      </Row>
      <Container></Container>
    </>
  );
};

export default BecomeInstructor;
