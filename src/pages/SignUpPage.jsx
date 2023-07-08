import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";

export default function SignUpPage() {

  const navigate = useNavigate();

  const [signUpInputs, setSignUpInputs] = useState({
    name: '', email: '', password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = async (e) => {
    e.preventDefault();

    if (signUpInputs.password !== confirmPassword) return alert('The passwords must be the same');

    try{
      await axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, signUpInputs);
      navigate('/');
      
    } catch ({response: {status, statusText, data}}){
      alert(`${status} ${statusText}\n${data}`);
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input
          data-test="name" 
          placeholder="Nome"
          required 
          onChange={e => setSignUpInputs(previous => ({...previous, ['name']: e.target.value}))}
          value={signUpInputs.name}
        />
        <input
          data-test="email" 
          placeholder="E-mail"
          type="email"
          required
          onChange={e => setSignUpInputs(previous => ({...previous, ['email']: e.target.value}))}
          value={signUpInputs.email}
        />
        <input
          data-test="password" 
          placeholder="Senha" 
          autoComplete="new-password"
          type="password"
          required
          minLength="3"
          onChange={e => setSignUpInputs(previous => ({...previous, ['password']: e.target.value}))}
          value={signUpInputs.password}
        />
        <input
          data-test="conf-password" 
          placeholder="Confirme a senha" 
          autoComplete="new-password"
          type="password"
          required
          minLength="3"
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <button data-test="sign-up-submit">Cadastrar</button>
      </form>

      <Link to='/' >
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
