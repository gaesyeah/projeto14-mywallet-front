import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context";
import { TransactionsContainer } from "./TransactionPage";

export default function EditPage() {

  const { tipo, id } = useParams();
  const { config } = useContext(UserContext);

  const { description, value } = useLocation().state;

  const navigate = useNavigate();

  const [editInputs, setEditInputs] = useState({ description, value });

  const editRegister = async (e) => {
    e.preventDefault();

    if (Number.isInteger(editInputs.value)) return alert('"value" must be a float');

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/transactions/${id}`, editInputs, config);
      navigate('/home');
    } catch ({response: {status, statusText, data}}){
      alert(`${status} ${statusText}\n${data}`);
    }
  };

  useEffect(() => {
    if(config.headers.Authorization.replace('Bearer ', '') === 'undefined') navigate('/');
  }, []);

  return (
    <TransactionsContainer>
      <h1>Editar {tipo === 'entry' ? 'entrada': 'saída'}</h1>
      <form onSubmit={editRegister}> 
        <input 
          placeholder="Valor" 
          type="number" 
          step="0.01" 
          min="0.01" 
          required
          onChange={e => setEditInputs(previous => ({...previous, ['value']: Number(e.target.value)}))}
          value={editInputs.value}
        />
        <input 
          placeholder="Descrição" 
          type="text" 
          required
          onChange={e => setEditInputs(previous => ({...previous, ['description']: e.target.value}))}
          value={editInputs.description}
        />
        <button>Atualizar {tipo === 'entry' ? 'entrada': 'saída'}</button>
      </form>
    </TransactionsContainer>
  )
}
