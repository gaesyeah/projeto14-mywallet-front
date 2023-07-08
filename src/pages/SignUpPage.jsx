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
  const [loading, setLoading] = useState(false);

  const signUp = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (signUpInputs.password !== confirmPassword) return alert('The passwords must be the same');

    try{
      await axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, signUpInputs);
      navigate('/');
      
    } catch ({response: {status, statusText, data}}){
      setLoading(false);
      alert(`${status} ${statusText}\n${data}`);
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input
          disabled={loading}
          data-test="name" 
          placeholder="Nome"
          required 
          onChange={e => setSignUpInputs(previous => ({...previous, ['name']: e.target.value}))}
          value={signUpInputs.name}
        />
        <input
          disabled={loading}
          data-test="email" 
          placeholder="E-mail"
          type="email"
          required
          onChange={e => setSignUpInputs(previous => ({...previous, ['email']: e.target.value}))}
          value={signUpInputs.email}
        />
        <input
          disabled={loading}
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
          disabled={loading}
          data-test="conf-password" 
          placeholder="Confirme a senha" 
          autoComplete="new-password"
          type="password"
          required
          minLength="3"
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <button data-test="sign-up-submit" 
          disabled={loading}
        >{loading ? 'Carregando...' : 'Cadastrar'}</button>
      </form>

      <Link to='/' >
        <a>Já tem uma conta? Entre agora!</a>
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
