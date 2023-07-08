import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { RingLoader } from "react-spinners";
import CustomMessage from "../components/Message/CustomMessage";
import AuthService from "../services/Auth.service";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call api process to login
    setLoading(true);
    setMessage();

    const { isLogin, error } = await AuthService.login(userName, password);
    if (isLogin) {
      navigate("/");
    } else {
      setMessage(error);
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <Form className="login-form" onSubmit={handleSubmit} ref={formRef}>
        <h1>Sign in</h1>
        <Input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {message && <CustomMessage message={message} className={"error"} />}
        <button type="submit" disabled={loading}>
          {loading ? (
            <RingLoader color={"#000000"} loading={loading} size={15} />
          ) : (
            "Login"
          )}
        </button>
        <SignUpWrap>
          Don't have account?
          <NavButton to="/signup">Sign up</NavButton>
        </SignUpWrap>
      </Form>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    height: 550px;
    width: 400px;
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
  }

  .login-form *{
    letter-spacing: 0.5px;
    outline: none;
  }

  h1 {
    color: white;
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
    margin-bottom: 20px;
  }

  input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 5px;
    padding: 0 10px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 300;
    border: none;
  }
  
  input::placeholder {
    color: #e5e5e5;
  }

  .alert {
    font-size: 12px;
    padding-top: 0.7em;
    color: red;
  }

  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 30px;
    border: 1px solid red;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }
  
  button {
    margin-top: 20px;
    width: 100%;
    color: #080710;
    background-color: #ffffff;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }
  button:hover {
    transform scale(1.03);
  }

  button:active {
    transform scale(.98);
  }

  button:disabled {
    pointer-events: none;
    opacity: 0.6;
  }

`;
const SignUpWrap = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 15px;
  font-size: 11px;
`;
const NavButton = styled(Link)`
  color: #3399ff;
  margin-left: 3px;
`;
