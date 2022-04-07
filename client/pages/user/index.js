import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../components/routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <>
        <h1 className="jumbotron text-center square p-5">
          <pre> User Dashboard</pre>
          {/* {JSON.stringify(user.name, null, 4)} */}
        </h1>
      </>
    </UserRoute>
  );
};

export default UserIndex;
