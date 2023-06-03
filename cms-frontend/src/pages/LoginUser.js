import { useContext, useState } from "react";
import { toast } from "react-toastify";
import network from "../utils";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import * as routes from "../constants/routePaths";
import { AppContext } from "../contexts/AppContext";

const LoginUser = () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");

  const { data, setUserData } = useContext(AppContext);

  const navigate = useNavigate();
  const cookies = new Cookies();

  const loginUser = async (event) => {
    try {
      event.preventDefault();

      if (!email || !password) {
        toast.error("Fill all fields");
        return;
      }

      const res = await network.post({
        path: "users/login",
        options: {
          email,
          password,
        },
      });

      cookies.set("authorization", res.data.token);
      setUserData(res?.data?.user);

      setEmail("");
      setPassword("");
      // toast.info("🦄 User logged in successfully!");

      navigate(routes.homePage);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "🦄 Something went Wrong!!!");
    }
  };
  return (
    <div className="auth-form-wrapper">
      <div className="auth-form">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <h2>Login Here</h2>
          </div>
        </div>

        <Form onSubmit={loginUser}>
          <Form.Group className="m-3 mt-1 w-50" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="m-3 w-50" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="m-3 w-50" controlId="formBasicSubmit">
            <Button variant="primary" type="submit">
              Login
            </Button>
            <span style={{ marginLeft: "10px" }}>OR</span>
          <Link style={{ marginLeft: "10px" }} to={routes.registerUserPage}>register here</Link>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default LoginUser;
