import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { RingLoader } from "react-spinners";
import { required } from "../hooks/validation";
import CustomMessage from "../components/Message/CustomMessage";
import AuthService from "../services/Auth.service";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage();
    
    await AuthService.register(username, password, setMessage, setIsError);
    setLoading(false);
  }

  return (
    <Wrapper>
        <Form className="login-form" onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            validations={[required]}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            validations={[required]}
          />
          <Input
            type="password"
            placeholder="Confirmed password"
            value={confirmedPassword}
            onChange={(event) => setConfirmedPassword(event.target.value)}
            required
            validations={[required]} 
          />
          {message && (
            <CustomMessage message={message} className={isError ? 'error' : 'info'}/>
          )}
          <button type="submit" disabled={loading}>
            {loading ? (
              <RingLoader color={"#000000"} loading={loading} size={15} />
            ): "Register"}
          </button>
          <LoginWrap>
            Have an account?
            <NavButton to="/login">Login</NavButton>
          </LoginWrap>
        </Form>

    </Wrapper>
    
  );
}

export default Register;

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
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 300;
    border: none;
  }
  
  input::placeholder {
    color: #e5e5e5;
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
`
const LoginWrap = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 15px;
  font-size: 11px;
`
const NavButton = styled(Link)`
  color: #3399FF;
  margin-left: 3px;
`