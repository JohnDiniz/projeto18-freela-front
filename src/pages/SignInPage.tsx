import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/icon.svg";
import axios from "axios";
export default function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signin`,
        {
          email,
          password,
        }
      );

      const { id, token } = response.data;
      localStorage.setItem("userId", id);
      console.log(id, token);
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <SignInContainer>
      <form onSubmit={handleLogin}>
        <LogoLink to="/">
          <LogoImage src={Logo} alt="Logo" />
          <h1>RetroTunes</h1>
        </LogoLink>
        <input
          placeholder="E-mail"
          data-test="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          data-test="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton data-test="sign-in-submit" type="submit">
          Login
        </StyledButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>

      <LoginLink to="/signup">Não tem uma conta? Cadastre-se aqui!</LoginLink>
    </SignInContainer>
  );
}
const SignInContainer = styled.section`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const StyledButton = styled.button`
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const LogoLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const LoginLink = styled(Link)`
  margin-top: 20px;
  font-size: 14px;
  text-decoration: none;
  color: #333;

  &:hover {
    text-decoration: underline;
  }
`;
