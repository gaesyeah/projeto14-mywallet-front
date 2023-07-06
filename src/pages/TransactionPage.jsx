import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context";

export default function TransactionsPage() {

  const { tipo } = useParams();
  const { config } = useContext(UserContext);

  const navigate = useNavigate();

  const [transactionInputs, setTransactionInputs] = useState({
    description: "", value: ""
  });

  const createTransaction = async (e) => {
    e.preventDefault();

    if (Number.isInteger(transactionInputs.value)) return alert('"value" must be a float');

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/transactions/${tipo}`, transactionInputs, config);
      navigate('/home');
    } catch ({response: {status, statusText, data}}){
      console.log(`${status} ${statusText}\n${data}`);
    }
  };

  return (
    <TransactionsContainer>
      <h1>Nova {tipo === 'entry' ? 'entrada': 'saída'}</h1>
      <form onSubmit={createTransaction}> 
        <input 
          placeholder="Valor" 
          type="number" 
          step="0.01" 
          min="0.01" 
          required
          onChange={e => setTransactionInputs(previous => ({...previous, ['value']: Number(e.target.value)}))}
          value={transactionInputs.value}
        />
        <input 
          placeholder="Descrição" 
          type="text" 
          required
          onChange={e => setTransactionInputs(previous => ({...previous, ['description']: e.target.value}))}
          value={transactionInputs.description}
        />
        <button>Salvar {tipo === 'entry' ? 'entrada': 'saída'}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
