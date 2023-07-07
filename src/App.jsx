import { useEffect, useRef, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "./context"
import EditPage from "./pages/EditPage"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"

export default function App() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({});
  const { token, name } = loginData;
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    //navega direto para a rota /home caso tenha uma config previa no localStorage
    if (localStorage.getItem('config')){
        navigate('/home');
    };
    /*redefine novamente as keys no localStorage caso o loginData já tenha sido "setado" na rota /
    para não permitir que os valores no localStorage sejam redefinidos para undefined*/
    if (Object.keys(loginData).length > 0) {
        localStorage.setItem('config', JSON.stringify(config));
        localStorage.setItem('name', name);
    };
  }, [loginData]);

const storedConfig = useRef(JSON.parse(localStorage.getItem('config')));
const storedName = useRef(localStorage.getItem('name'));

  return (
    <UserContext.Provider value={{ 
      loginData, setLoginData,
      config: !storedConfig.current ? config : storedConfig.current,
      name: !storedName.current ? name : storedName.current
    }}>
      <PagesContainer>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
          <Route path="/editar-registro/:tipo" element={<EditPage />} />
        </Routes>
      </PagesContainer>
    </UserContext.Provider>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
