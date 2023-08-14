import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/icon.svg";
import axios from "axios";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // const [imageUrl, setImageUrl] = useState("");

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        {
          name,
          email,
          password,
          confirmPassword,
        }
      );

      if (response.status === 201) {
        console.log(response);
        navigate("/home");
      }
    } catch (error) {
      alert("Error in signup");
    }
  };

  return (
    <SignUpContainer>
      <LogoLink to="/">
        <LogoImage src={Logo} alt="Logo" />
        <LogoText>RetroTunes</LogoText>
      </LogoLink>

      <SignUpForm onSubmit={handleSignUpSubmit}>
        <Input
          placeholder="Nome"
          data-test="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          type="email"
          data-test="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          data-test="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="Confirme a senha"
          data-test="conf-password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* <Input
          placeholder="URL da imagem"
          data-test="image-url"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        /> */}
        <SignUpButton data-test="sign-up-submit" type="submit">
          Cadastrar
        </SignUpButton>
      </SignUpForm>

      <LoginLink to="/signin">Já tem uma conta? Entre agora!</LoginLink>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.section`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SignUpButton = styled.button`
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
  margin-bottom: 20px;
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

const LogoText = styled.h1`
  font-size: 24px;
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
