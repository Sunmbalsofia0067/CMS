import { useState } from "react";
import { toast } from "react-toastify";
import network from "../utils";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as routes from "../constants/routePaths";

const RegisterUser = () => {
  const [name, setName] = useState("ABC");
  const [email, setEmail] = useState("test@test.com");
  const [age, setAge] = useState(12);
  const [password, setPassword] = useState("12345");
  const navigate = useNavigate();

  const registerUser = async (event) => {
    try {
      event.preventDefault();

      if (!name || !email || !password || password.length < 5) {
        toast.error("Fill all fields (password with 5 characters or more)");
        return;
      }

      await network.post({
        path: "users/register",
        options: {
          name,
          email,
          age,
          password,
        },
      });
      setAge("");
      setEmail("");
      setName("");
      setPassword("");
      toast.info("🦄 User Successfully added!");
      navigate(routes.loginUserPage)
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
          <h2>Register User </h2>
        </div>
      </div>

      <Form onSubmit={registerUser}>
        <Form.Group className="m-3 w-70" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="m-3 mt-1 w-70" controlId="formBasicEmail">
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
        <Form.Group className="m-3 w-70" controlId="formBasicEmail">
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

        <Form.Group className="m-3 w-70" controlId="formBasicEmail">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            value={age}
            placeholder="Enter Age"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="m-3 w-70" controlId="formBasicSubmit">
          <Button variant="primary" type="submit">
            Register
          </Button>
          <span style={{ marginLeft: "10px" }}>OR</span>
          <Link style={{ marginLeft: "10px" }} to={routes.loginUserPage}>login here</Link>
        </Form.Group>
      </Form>
    </div>
    </div>
  );
};

export default RegisterUser;
