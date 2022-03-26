import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined, syncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(Context);

  console.log("env", process.env.NEXT_PUBLIC_API);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      console.log("REG RESP", data);
      toast.success("Registration Successful. Please Login");
      setLoading(false);
      setEmail("");
      setName("");
      setPassword("");
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="jumbotron bg-primary square text-center"> Register</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            placeholder="Input Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            disabled={!name || !password || !email || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        <p className="text-center p-3">
          Already Registered?
          <Link href="/login">
            <a> Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
