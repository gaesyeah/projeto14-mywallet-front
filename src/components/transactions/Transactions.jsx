import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { ListItemContainer, Value } from "../../pages/HomePage";

const Transactions = ({ transaction , setTransactions}) => {
  const {_id, description, value, type, timeStamp} = transaction;

  const navigate = useNavigate();

  const { config } = useContext(UserContext);

  const deleteTransaction = async () => {
    if(confirm('Você realmente deseja deletar essa transação?')){
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/transactions/${_id}`, config);

        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/transactions`, config);
        setTransactions(data);
        
      } catch ({response: {status, statusText, data}}){
        alert(`${status} ${statusText}\n${data}`);
      }
    }
  };

  return (
    <ListItemContainer type={type}>
      <div>
        <span>{dayjs(timeStamp).format('DD/MM')}</span>
        <strong onClick={() => navigate(`/editar-registro/${type}`, { state: { _id, description, value } })}>{description}</strong>
      </div>
      <div>
        <Value type={type}>{value.toFixed(2).replace('.', ',')}</Value>
        <p onClick={deleteTransaction}>x</p>
      </div>
    </ListItemContainer>
  );
}

export default Transactions;