import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast("Check email for code");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log(email, code, newPassword);

    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setLoading(false);
      toast("Great! Please login with new password");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square p-3">
        Forgot Password
      </h1>

      <div className="containter col-md-4 offset-md-4 pb-5">
        <form onSubmit={success ? handleResetPassword : handleSubmit}>
          <input
            type="email"
            className="form-control mb-2 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          ></input>
          {success && (
            <>
              <input
                type="text"
                className="form-control mb-2 p-2"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter secret code"
                required
              />

              <input
                type="password"
                className="form-control mb-2 p-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New"
                required
              />
            </>
          )}
          <br />
          <button
            type="submit"
            className="btn btn-block btn-primary p-2"
            disabled={!email || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
