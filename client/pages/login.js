import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined, syncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  // console.log("State", state);
  // const { user } = state;

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  console.log("env", process.env.NEXT_PUBLIC_API);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      console.log("REG RESP", data);
      toast.success("Login Response", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      window.localStorage.setItem("user", JSON.stringify(data));

      router.push("/user");
      // setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="jumbotron bg-primary square text-center"> Login</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            placeholder="Input Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            className="form-control mb-4 p-4"
            placeholder="Input Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <button
            type="submit"
            className="btn btn-block btn-primary p-2"
            disabled={!password || !email || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        <p className="text-center pt-3">
          Create Account?
          <Link href="/register">
            <a> Register</a>
          </Link>
        </p>

        <p className="text-center ">
          <Link href="/forgot-password">
            <a className="text-danger"> Forgot Password</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
