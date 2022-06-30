import axios from "axios";
import { Container } from "react-bootstrap";
import InstructorRoute from "../../components/routes/InstructorRoute";

const CourseCreate = () => {
  return (
    <>
      <InstructorRoute>
        <Container fluid>
          <h1 className="jumbotron text-center p-5"> Create Course </h1>
        </Container>
      </InstructorRoute>
    </>
  );
};

export default CourseCreate;
