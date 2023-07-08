import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { UserContext } from "../context";

export default function SignInPage() {

  const navigate = useNavigate();

  const {setLoginData} = useContext(UserContext);

  const [signInInputs, setSignInputs] = useState({
    email: '', password: ''
  });
  const [loading, setLoading] = useState(false);

  const signIn = async (e) => {
      e.preventDefault();

      setLoading(true);

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, signInInputs);
        setLoginData(data);
        navigate('/home');
      } catch ({response: {status, statusText, data}}){
        setLoading(false);
        alert(`${status} ${statusText}\n${data}`);
      }
  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input
          disabled={loading}
          data-test="email" 
          placeholder="E-mail" 
          type="email"
          required
          onChange={e => setSignInputs(previous => ({...previous, ['email']: e.target.value}))}
          value={signInInputs.email}
        />
        <input
          disabled={loading}
          data-test="password" 
          placeholder="Senha" 
          type="password"
          required
          autoComplete="new-password"
          onChange={e => setSignInputs(previous => ({...previous, ['password']: e.target.value}))}
          value={signInInputs.password}
        />
        <button data-test="sign-in-submit" 
          disabled={loading}
        >{loading ? 'Carregando...' : 'Entrar'}</button>
      </form>

      <Link to='/cadastro' >
        <a>Primeira vez? Cadastre-se!</a>
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
